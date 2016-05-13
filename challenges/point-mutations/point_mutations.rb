class DNA
  attr_reader :s1

  def initialize(s1)
    @s1 = s1
  end

  def hamming_distance(s2)
    return 0 if s1 == s2

    if s2.length > s1.length
      count_differences(s1, s2)
    else
      count_differences(s2, s1)
    end
  end

  private

  def count_differences(s1, s2)
    count = 0

    s1.each_char.with_index do |char, index|
      count += 1 unless char == s2[index]
    end

    count
  end
end
