# Rule 1: If a word begins with a vowel sound, add an "ay" sound to the end of the word.
# Rule 2: If a word begins with a consonant sound, move it to the end of the word, and then add an "ay" sound to the end of the word.

class String
  VOWELS = %w(a e i o u).freeze
  CONSONANTS = [*'a'..'z'] - VOWELS
  PHONEMES = %w(sch scr squ str thr ch qu th).freeze

  def consonant?
    length == 1 && CONSONANTS.include?(self)
  end

  def vowel?
    length == 1 && VOWELS.include?(self)
  end

  def phoneme?
    PHONEMES.any? do |phoneme|
      self[0..2].match(/#{phoneme}/) || self[0..1].match(/#{phoneme}/)
    end
  end

  def grab_phoneme
    phoneme = ''
    PHONEMES.each do |p|
      if !!match(/^#{p}/)
        phoneme = scan(/^#{p}/)
        break
      end
    end
    phoneme.first
  end
end

class PigLatin
  def self.translate(words)
    words.split(' ').map do |word|
      if word.phoneme?
        phoneme = word.grab_phoneme
        rest_of_word = word.split(phoneme).reject(&:empty?).first
        rest_of_word + phoneme + "ay"
      elsif word[0].vowel? || (word[0] == 'y' && word[1].consonant?) || word[0..1] == 'xr'
        word + "ay"
      elsif word[0].consonant? && word[1].consonant?
        word[2..-1] + word[0..1] + "ay"
      elsif word[0].consonant?
        word[1..-1] + word[0] + "ay"
      else
        word
      end
    end
         .join(' ')
  end
end
