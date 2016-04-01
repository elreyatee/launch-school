require "sinatra"
require "sinatra/reloader"
require "tilt/erubis"
require "pry"
require "yaml"

before do 
  @users = YAML.load_file("users.yaml")
end

helpers do 
  def list(interests)
    interests.join(", ")
  end

  def count_interests(users)
    users.reduce(0) do |total, (_, data)|
      total += data[:interests].size
    end
  end
end

get "/" do
  redirect "/users"
end

get "/users" do
  erb :users
end

get "/:name" do
  @user = @users.each_with_object({}) do |(name, data), user|
    if name.to_s == params[:name]
      user[:name] = name.to_s.capitalize
      user[:email] = data[:email]
      user[:interests] = data[:interests]
    end
  end
  
  erb :user
end