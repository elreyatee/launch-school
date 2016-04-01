require "minitest/autorun"
require "rack/test"
require "fileutils"
require "pry"

require_relative "../cms.rb"

ENV["RACK_ENV"] = "test"

class CMSTest < Minitest::Test
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  def setup
    FileUtils.mkdir_p(data_path)
  end

  def teardown
    FileUtils.rm_rf(data_path)
  end

  def create_document(name, content = "")
    File.open(File.join(data_path, name), "w") do |file|
      file.write(content)
    end
  end

  def session
    last_request.env["rack.session"]
  end

  def admin_session
    { "rack.session" => { username: "admin" } }
  end

  def test_index
    create_document "about.md"
    create_document "changes.txt"

    get "/"

    assert_equal 200, last_response.status
    assert_equal "text/html;charset=utf-8", last_response["Content-Type"]
    assert_includes last_response.body, "about.md"
    assert_includes last_response.body, "changes.txt"
  end

  def test_filename
    create_document "history.txt", "1993 - Yukihiro Matsumoto dreams up Ruby."

    get "/history.txt"

    assert_equal 200, last_response.status
    assert last_response.body.include?("1993 - Yukihiro Matsumoto dreams up Ruby.")
  end

  def test_file_not_found
    get "/some_file.txt"

    assert_equal 302, last_response.status
    assert_equal "some_file.txt does not exist.", session[:error]
  end

  def test_markdown
    create_document "about.md", "# Ruby is..."

    get "/about.md"

    assert_equal 200, last_response.status
    assert_equal "text/html;charset=utf-8", last_response["Content-Type"]
    assert_includes last_response.body, "<h1>Ruby is...</h1>"
  end

  def test_editing_document
    create_document "changes.txt"

    get "/changes.txt/edit", {}, admin_session

    assert_equal 200, last_response.status
    assert_includes last_response.body, "<textarea"
  end

  def test_editing_document_signed_out
    create_document "changes.txt"

    get "/changes.txt/edit"

    assert_equal 302, last_response.status
    assert_equal "You must be signed in to do that.", session[:message]
  end

  def test_updating_document
    post "/changes.txt", { content: "This is a test" }, admin_session

    assert_equal 302, last_response.status
    assert_equal "changes.txt was updated.", session[:message]

    get "/changes.txt"
    assert_equal 200, last_response.status
    assert_includes last_response.body, "This is a test"
  end

  def test_updating_document_signed_out
    post "/changes.txt", { content: "This is a test" }

    assert_equal 302, last_response.status
    assert_equal "You must be signed in to do that.", session[:message]
  end

  def test_view_new_document_form
    get "/new", {}, admin_session

    assert_equal 200, last_response.status
    assert_includes last_response.body, "Add a new document:"
  end

  def test_new_document_form_signed_out
    get "/new"

    assert_equal 302, last_response.status
    assert_equal "You must be signed in to do that.", session[:message]
  end

  def test_create_document
    post "/create", { filename: "test.txt" }, admin_session
    assert_equal 302, last_response.status
    assert_equal "test.txt has been created.", session[:message]

    get "/"
    assert_includes last_response.body, "test.txt"
  end

  def test_create_document_signed_out
    post "/create", { filename: "test.txt" }

    assert_equal 302, last_response.status
    assert_equal "You must be signed in to do that.", session[:message]
  end

  def test_create_invalid_document
    post "/create", { filename: "" }, admin_session
    assert_equal 422, last_response.status
    assert_includes last_response.body, "A name is required."
  end

  def test_delete_document
    create_document "test.txt"

    post "/test.txt/delete", {}, admin_session
    assert_equal 302, last_response.status
    assert_equal "test.txt was deleted.", session[:message]

    get "/"
    refute_includes last_response.body, %q(href="/test.txt")
  end

  def test_delete_document_signed_out
    create_document "test.txt"

    post "/test.txt/delete"
    assert_equal 302, last_response.status
    assert_equal "You must be signed in to do that.", session[:message]
  end

  def test_signin_page
    get "/users/signin"

    assert_equal 200, last_response.status
    assert_includes last_response.body, "Username:"
    assert_includes last_response.body, "Password:"
  end

  def test_signin
    post "/users/signin", username: "admin", password: "secret"

    assert_equal 302, last_response.status
    assert_equal "Welcome!", session[:message]
    assert_equal "admin", session[:username]
  end

  def test_signin_bad_credentials
    post "/users/signin", username: "some", password: "guy"

    assert_equal 422, last_response.status
    assert_equal nil, session[:username]
    assert_includes last_response.body, "Invalid Credentials."
  end

  def test_signout
    get "/", {}, { "rack.session" => { username: "admin" } }
    assert_includes last_response.body, "Signed in as admin."

    post "/users/signout"

    assert_equal nil, session[:username]
    assert_equal "You have been signed out.", session[:message]
    assert_includes last_response.body, ""
  end

  def test_signup_page
    get "/users/signup"

    assert_equal 200, last_response.status
    assert_includes last_response.body, "Username:"
    assert_includes last_response.body, "Password:"
  end

  def test_signup
    post "/users/signup", { username: "matt", password: "murdock" }

    assert_equal 302, last_response.status
    assert_includes last_response.body, "Welcome!"
    assert_equal "matt", session[:username]
  end

  def test_signup_bad_credentials
    post "/users/signup", { username: "  ", password: "  " }

    assert_equal 422, last_response.status
    assert_equal nil, session[:username]
    assert_includes last_response.body, "Invalid Credentials"
  end

  def test_duplicate_file_bad_credentials
    create_document("original_file.txt", "copy this file")

    post "/original_file.txt/duplicate"

    assert_equal 422, last_response.status
    assert_equal nil, session[:username]
    assert_equal "You must be signed in to do that.", session[:message]
  end

  def test_duplicate_file
    create_document("original_file.txt", "copy this file")

    post "/original_file.txt/duplicate", { username: "admin", password: "secret" }, { filename: "original_file.txt" }

    assert_equal 302, last_session.status
    assert_equal "original_file.txt duplicated.", session[:message]
    assert_includes "original_file_1.txt", last_response.body
  end
end
