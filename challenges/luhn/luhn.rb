class Integer
  def digits
    [].tap do |result|
      temp = self
      while temp > 0
        temp, digit = temp.divmod 10
        result.unshift digit
      end
    end
  end
end

class Luhn
  attr_reader :number

  def initialize(number)
    @number = number
  end

  def addends
    result = []

    # counting from right-most digit, double the value of every second digit
    number.digits.reverse_each.with_index(1) do |n, i|
      if i.even?
        result.unshift(n * 2 < 10 ? n * 2 : n * 2 - 9)
      else
        result.unshift(n)
      end
    end
    result
  end

  def checksum
    addends.reduce(&:+)
  end

  def valid?
    (checksum % 10).zero?
  end 

  def self.create(val)
    return val if new(val).valid?

    possible_number = nil
    arr = val.digits
    check_digits = [*0..9]

    check_digits.each do |check_digit|
      possible_number = (arr + [check_digit]).join.to_i
      break if new(possible_number).valid?
    end
    possible_number
  end
end
