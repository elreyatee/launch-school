class Triplet
  attr_reader :numbers

  def initialize(*numbers)
    @numbers = numbers
  end  

  def sum
    numbers.reduce(&:+)
  end

  def product
    numbers.reduce(&:*)
  end

  def pythagorean?
    a, b, c = numbers
    a**2 + b**2 == c**2
  end

  def self.where(options = {})
    min = options[:min_factor] || 1
    max = options[:max_factor]
    sum = options[:sum] || 0

    [*min..max].combination(3).reduce([]) do |triplets, triple|
      if new(*triple).pythagorean? && (sum == 0 || new(*triple).sum == sum)
        triplets << new(*triple) 
      else
        triplets
      end
    end
  end
end
