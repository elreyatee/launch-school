class Sieve
  attr_reader :primes

  def initialize(limit)
    @primes = []

    range = [*2..limit]

    until range.empty?
      @primes << range.shift
      range.delete_if { |n| (n % @primes.last).zero? }
    end
  end
end

