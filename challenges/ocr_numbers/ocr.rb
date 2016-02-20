require 'active_support/all'

class OCR
  DIGITS = {
    " _\n| |\n|_|\n" => '0',
    "\n  |\n  |\n" => '1',
    " _\n _|\n|_\n" => '2'
  }
  
  attr_reader :text

  def initialize(text)
    @text = text
  end

  def convert
    # collect each line
    collector = text.each_line.collect.to_a

    # split lines into threes
    collector.map! do |line|
      line.chars.each_slice(3).map(&:join)
    end

    # dump sole new_line characters
    collector.each do |group| 
      group.reject! { |string| string == "\n" }
    end

    # transpose
    collector = collector.transpose

    # scrub up formatting to get array of numbers
    collector.map! do |group|
      group.each do |item|
        item.replace("\n") if item.blank?
        item << "\n" unless item[-1] == "\n"
      end
      .join
    end 

    # map array to numbers
    collector.map { |text_string| DIGITS[text_string] }.join
  end
end
