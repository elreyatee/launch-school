class PigLatin
  def self.translate(words)
    words.split(' ').map do |word|
      if word.scan(/^[aeiou]+|^(y|x)[^aeiou]/).empty?
        word << word.slice!(/^[^aeiouq]*(qu)*/)
      end
      word << "ay"
    end
    .join(' ')
  end
end
