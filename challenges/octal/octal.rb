class Octal 
  BASE = 8

  attr_accessor :num_to_convert

  def initialize(num_to_convert)
    @num_to_convert = valid?(num_to_convert) ? num_to_convert.chars.reverse.map(&:to_i) : [0]
  end

  def to_decimal
    # num_to_convert.to_i(BASE) this works too!
    sum = 0
    num_to_convert.each_with_index do |n, i|
      sum += n * (BASE ** i) 
    end
    sum
  end

  private

  def valid?(number)
    !!number.match(/^[0-7]+$/)
  end
end