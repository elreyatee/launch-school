require 'minitest/autorun'
require_relative 'palindrome_products2'

class PalindromesTest < Minitest::Test
  def test_largest_palindrome_from_single_digit_factors
    palindromes = Palindromes.new(max_factor: 9)
    palindromes.generate
    largest = palindromes.largest
    assert_equal 9, largest.value
    assert_includes [[[3, 3], [1, 9]], [[1, 9], [3, 3]]], largest.factors
  end

  def test_largest_palindrome_from_double_digit_factors
    skip
    palindromes = Palindromes.new(max_factor: 99, min_factor: 10)
    palindromes.generate
    largest = palindromes.largest
    assert_equal 9009, largest.value
    assert_equal [[91, 99]], largest.factors
  end

  def test_smallest_palindrome_from_double_digit_factors
    skip
    palindromes = Palindromes.new(max_factor: 99, min_factor: 10)
    palindromes.generate
    smallest = palindromes.smallest
    assert_equal 121, smallest.value
    assert_equal [[11, 11]], smallest.factors
  end

  def test_largest_palindrome_from_triple_digit_factors
    skip
    palindromes = Palindromes.new(max_factor: 999, min_factor: 100)
    palindromes.generate
    largest = palindromes.largest
    assert_equal 906_609, largest.value
    assert_equal [[913, 993]], largest.factors
  end

  def test_smallest_palindrome_from_triple_digit_factors
    skip
    palindromes = Palindromes.new(max_factor: 999, min_factor: 100)
    palindromes.generate
    smallest = palindromes.smallest
    assert_equal 10_201, smallest.value
    assert_equal [[101, 101]], smallest.factors
  end

  def test_smallest_palindrome_from_4_digit_factors
    skip
    palindromes = Palindromes.new(max_factor: 4321, min_factor: 1234)
    palindromes.generate
    smallest = palindromes.smallest
    assert_equal 1_639_361, smallest.value
    assert_equal [[1241, 1321]], smallest.factors
  end

  def test_largest_palindrome_with_mixed_sizes
    skip
    palindromes = Palindromes.new(max_factor: 1500, min_factor: 1)
    palindromes.generate
    largest = palindromes.largest
    assert_equal 2_150_512, largest.value
    assert_equal [[1456, 1477]], largest.factors
  end
end