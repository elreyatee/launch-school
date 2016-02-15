class Series
  attr_accessor :string

  def initialize(string)
    @string = string
  end

  def slices(number)
    raise ArgumentError if number > string.size
    arr = string.chars.map(&:to_i)
    arr.each_cons(number).to_a
  end
end