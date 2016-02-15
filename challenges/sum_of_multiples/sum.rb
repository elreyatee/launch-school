# If we list all the natural numbers below 10 that are multiples of 3 or
# 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.

# Allow the program to be configured to find the sum of multiples of
# numbers other than 3 and 5.

class SumOfMultiples
  MULTIPLES = [3, 5]

  def self.to(number)
    new(*MULTIPLES).to(number)
  end

  attr_reader :multiples

  def initialize(*multiples)
    @multiples = multiples || [3, 5]
  end

  def to(number)
    sum = 0
    (1...number).each do |number|
      sum += number if any_multiple?(number)
    end
    sum
  end

  private

  def any_multiple?(number)
    multiples.any? { |multiple| number % multiple == 0 }
  end
end
