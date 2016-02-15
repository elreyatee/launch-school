class Series
  attr_accessor :string

  def initialize(string)
    @string = string.chars.map(&:to_i)
  end

  def slices(slice_length)
    raise ArgumentError if slice_length > string.length
    string.each_cons(slice_length).to_a
  end
end