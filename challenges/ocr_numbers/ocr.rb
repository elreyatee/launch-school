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
  }

  NEW_LINE = "\n"
  GARBLE = '?'

  attr_reader :text

  def initialize(text)
    @text = text
    @collection = []
  end

  def convert
    return split_up_lines.collect { |line| self.class.new(line).convert }.join(',') if multiple_lines?

    split_each_line_into_threes
    dump_new_lines
    transpose_collection
    format_collection_to_numbers
    convert_to_digits
  end

  private

  attr_accessor :collection

  def multiple_lines?
    !!text.match(/\n\n/)
  end

  # split up multiple lines and append with new_line character
  def split_up_lines
    text.split("\n\n").each { |string| string.concat(NEW_LINE) }
  end

  # collect each line and split into threes
  def split_each_line_into_threes
    self.collection = text.each_line.collect { |line| line.chars.each_slice(3).map(&:join) }
  end

  # dump sole new_line characters
  def dump_new_lines
    collection.each do |group_of_chars|
      group_of_chars.reject! { |string| string == NEW_LINE unless group_of_chars.size == 1 }
    end
  end

  def transpose_collection
    self.collection = collection.transpose
  end

  # scrub up formatting to get array of numbers
  def format_collection_to_numbers
    collection.map! do |group|
      group.each do |item|
        item.replace(NEW_LINE) if item == '   '
        item[-1] = NEW_LINE if item[-1].blank?
        item << NEW_LINE unless item[-1] == NEW_LINE
      end
           .join
    end
  end

  def convert_to_digits
    collection.collect { |digit_string| convert_to_digit(digit_string) }.join
  end

  def convert_to_digit(digit)
    DIGITS[digit] || GARBLE
  end
end
