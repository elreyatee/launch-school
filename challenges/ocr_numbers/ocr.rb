require 'active_support/all'

class OCR
  DIGITS = {
    " _\n| |\n|_|\n" => '0',
    "\n  |\n  |\n" => '1',
    " _\n _|\n|_\n" => '2',
    " _\n _|\n _|\n" => '3',
    "\n|_|\n  |\n" => '4',
    " _\n|_\n _|\n" => '5',
    " _\n|_\n|_|\n" => '6',
    " _\n  |\n  |\n" => '7',
    " _\n|_|\n|_|\n" => '8',
    " _\n|_|\n _|\n" => '9'
  }.freeze

  attr_reader :text

  def initialize(text)
    @text = text
  end

  def convert
    # anyskipped lines?
    if text.include?("\n\n")
      arr = text.split("\n\n")
      arr.each { |string| string.concat("\n") }
      arr.map do |number_string|
        self.class.new(number_string).convert
      end
         .join(',')
    else

      # collect each line
      collector = text.each_line.collect.to_a

      # split lines into threes
      collector.map! do |line|
        line.chars.each_slice(3).map(&:join)
      end

      # dump sole new_line characters
      collector.each do |group|
        group.reject! { |string| string == "\n" unless group[0] == string && group[-1] == string }
      end

      # transpose
      collector = collector.transpose

      # scrub up formatting to get array of numbers
      collector.map! do |group|
        group.each do |item|
          item.replace("\n") if item == '   '
          item[-1] = "\n" if item[-1].blank?
          item << "\n" unless item[-1] == "\n"
        end
             .join
      end

      # map array to numbers
      collector.map! { |text_string| DIGITS[text_string] || '?' }.join
    end
  end
end
