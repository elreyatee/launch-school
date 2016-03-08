require "sinatra"
require "sinatra/reloader"
require "tilt/erubis"
require 'pry'

get '/' do 
  @heroes = Dir.glob("public/*").collect { |file| File.basename(file) }.sort
  @heroes.reverse! if params[:sort] == 'desc'
  erb :home
end