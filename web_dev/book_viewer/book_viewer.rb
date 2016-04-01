require "sinatra"
require "sinatra/reloader" if development?
require "tilt/erubis"

before do 
  @contents = File.readlines("data/toc.txt")
end

helpers do 
  def in_paragraphs(content)
    content.split(/\n\n/).each_with_index.collect do |line, index|
      "<p id=paragraph#{index}>#{line}</p>"
    end
    .join
  end

  def highlight(term, paragraph)
    paragraph.gsub(/#{term}/, "<strong>#{term}</strong>")
  end
end

not_found do
  redirect "/"
end

get "/" do
  @title = "The Adventures of Sherlock Holmes"

  erb :home
end

get "/chapters/:number" do
  number = params[:number].to_i
  chapter_name = @contents[number - 1]
  @title = "Chapter #{number}"
  
  @chapter = File.read("data/chp#{number}.txt")

  erb :chapter
end

get "/search" do

  if params[:query]
    @results = @contents.each_with_index.each_with_object([]) do |(chapter, chapter_index), results|
      text = File.read("data/chp#{chapter_index + 1}.txt")
      paragraphs = text.split("\n\n")
      paragraphs.each_with_index do |paragraph, paragraph_index|
        if paragraph.include?(params[:query])
          results << [chapter, chapter_index, paragraph, paragraph_index]
        end
      end
    end
  end

  erb :search
end

