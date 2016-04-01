class Trinary
  def initialize(trinary_string)
    @trinary_string = check_for_letters(trinary_string)
  end
  
  def to_decimal
    sum = 0
    @trinary_string.chars.reverse_each.with_index do |num, index|
      sum += num.to_i * 3**index
    end
    sum
  end

  private

  def check_for_letters(string)
    string.match(/[^0-2]/) ? '0' : string
  end
end