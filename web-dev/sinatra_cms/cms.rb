require 'sinatra'
require 'sinatra/reloader'
require 'sinatra/content_for'
require 'tilt/erubis'
require 'redcarpet'
require 'fileutils'
require 'yaml'
require 'bcrypt'

configure do
  enable :sessions
  set :sessions_secret, 'secret'
end

helpers do
  def logged_in?
    session.key?(:username)
  end

  def require_user
    unless logged_in?
      session[:message] = "You must be signed in to do that."
      redirect "/"
    end
  end
end

def data_path
  if ENV["RACK_ENV"] == "test"
    File.expand_path("../test/data", __FILE__)
  else
    File.expand_path("../data", __FILE__)
  end
end

def users_path
  if ENV["RACK_ENV"] == "test"
    File.expand_path("../test/users.yml", __FILE__)
  else
    File.expand_path("../users.yml", __FILE__)
  end
end

def users
  YAML.load_file(users_path)
end

def valid_credentials?(username, password)
  users.key?(username) && BCrypt::Password.new(users[username]) == password
end
alias user_exists? valid_credentials?

def render_markdown(text)
  Redcarpet::Markdown.new(Redcarpet::Render::HTML).render(text)
end

def data_files
  Dir.glob("#{data_path}/*").map { |path| File.basename(path) }
end

def get_file_path(file)
  File.join(data_path, file)
end

def append_copy_to_name(base, ext)
  last_copy = data_files.reverse.find { |f| f.include?(base[0..-2]) && File.extname(f) == ext }
  new_base = File.basename(last_copy, ext)
  new_filename = new_base[0..-2] + (new_base[-1].to_i + 1).to_s
  get_file_path(new_filename + ext)
end

def new_file_path(src_file)
  ext = File.extname(src_file)
  base = File.basename(src_file, ext).scan(/\A(.+_copy_[0-9]+)|\A(.+)/i).flatten.compact.first

  if base =~ /\A.+_copy/
    append_copy_to_name(base, ext)
  elsif data_files.count { |f| f.include?(base) && File.extname(f) == ext } == 1
    get_file_path(base + '_copy_1' + ext)
  else
    append_copy_to_name(base, ext)
  end
end

def copy_file(src_file)
  src_file_path = get_file_path(src_file)
  FileUtils.cp(src_file_path, new_file_path(src_file))
end

def load_content(path)
  content = File.read(path)
  case File.extname(path)
  when ".md"
    render_markdown(content)
  when ".txt"
    headers["Content-Type"] = "text/plain"
    content
  end
end

def blank?(document)
  document.empty? || !!document.match(/\s+/)
end

def input_empty?(username, password)
  !!username.match(/\s+/) || !!password.match(/\s+/)
end

def add_user(username, password)
  encrypted_password = BCrypt::Password.create(password).to_s
  new_user = { username => encrypted_password }.to_yaml[4..-1]

  File.open(users_path, "a") do |file|
    file.write(new_user)
  end
end

get "/" do
  pattern = File.join(data_path, "*")
  @files = Dir.glob(pattern).map { |path| File.basename(path) }
  erb :index
end

get "/new" do
  require_user
  erb :new
end

post "/create" do
  require_user
  filename = params[:filename]

  if blank?(filename)
    session[:error] = "A name is required."
    status 422
    erb :new
  else
    File.new(File.join(data_path, filename), "w+")
    session[:message] = "#{filename} has been created."
    redirect "/"
  end
end

get "/:filename" do
  file_path = File.join(data_path, File.basename(params[:filename]))

  if File.exist?(file_path)
    load_content(file_path)
  else
    session[:error] = "#{params[:filename]} does not exist."
    redirect "/"
  end
end

get "/:filename/edit" do
  require_user
  file_path = File.join(data_path, params[:filename])

  @filename = params[:filename]
  @content = File.read(file_path)

  erb :edit
end

post "/:filename" do
  require_user
  file_path = File.join(data_path, params[:filename])

  File.write(file_path, params[:content].strip)

  session[:message] = "#{params[:filename]} was updated."
  redirect "/"
end

post "/:filename/delete" do
  require_user
  file_path = File.join(data_path, params[:filename])

  File.delete(file_path)

  session[:message] = "#{params[:filename]} was deleted."
  redirect "/"
end

post "/:filename/duplicate" do
  require_user
  copy_file(params[:filename])
  session[:message] = "#{params[:filename]} was duplicated."
  redirect "/"
end

get "/users/signin" do
  erb :signin
end

post "/users/signin" do
  if valid_credentials?(params[:username], params[:password])
    session[:username] = params[:username]
    session[:message] = "Welcome!"
    redirect "/"
  else
    session[:message] = "Invalid Credentials."
    status 422
    erb :signin
  end
end

post "/users/signout" do
  session.delete(:username)
  session[:message] = "You have been signed out."
  redirect "/"
end

get "/users/signup" do
  erb :signup
end

post "/users/signup" do
  username = params[:username]
  password = params[:password]

  if user_exists?(username, password) || input_empty?(username, password)
    session[:message] = "Invalid Credentials."
    status 422
    erb :signup
  else
    add_user(username, password)
    session[:username] = username
    session[:message] = "Welcome!"
    redirect "/"
  end
end
