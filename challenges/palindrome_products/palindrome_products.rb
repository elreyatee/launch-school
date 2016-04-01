class Palindromes
  Palindrome = Struct.new(:value, :factors) do 
    def initialize(*args)
      super
      self.factors = []
    end
  end

  attr_reader :min_factor, :max_factor

  def initialize(min_factor: 1, max_factor: nil)
    @min_factor = min_factor
    @max_factor = max_factor
  end

  def generate
    palindromes = Hash.new { |h, k| h[k] = Palindrome.new(k) }

    fetch_palindromes do |product, factors|
      palindromes[product].factors << factors
    end

    @palindrome_list = palindromes.values.sort_by!(&:value)
  end

  def largest
    palindrome_list.last
  end

  def smallest
    palindrome_list.first
  end

  private

  attr_reader :palindrome_list

  def fetch_palindromes
    fetch_pairs do |a, b|
      product = a * b
      yield(product, [a, b]) if palindrome?(product)
    end
  end

  def fetch_pairs
    (min_factor..max_factor).each do |a|
      (a..max_factor).each do |b|
        yield(a, b) if a <= b
      end
    end
  end

  def palindrome?(number)
    number.to_s == number.to_s.reverse
  end
end
