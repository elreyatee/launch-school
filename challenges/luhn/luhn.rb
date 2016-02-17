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

  def self.create(number)
    candidate = number * 10
    possible_luhn = Luhn.new(candidate)

    if possible_luhn.valid?
      candidate
    else
      candidate + (10 - possible_luhn.checksum % 10)
    end
  end
end
