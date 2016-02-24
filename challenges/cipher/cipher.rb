class Cipher
  ALPHABET = [*'a'..'z']
  KEY_LENGTH = 100

  attr_reader :key

  def initialize
    @key = keygen
  end

  def encode(message)
    

  end

  private

  def keygen
    ''.tap do |arr|
      KEY_LENGTH.times { arr << ALPHABET.sample }
    end
  end
end