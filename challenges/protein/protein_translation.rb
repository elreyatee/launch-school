class InvalidCodonError < StandardError; end

class Translation
  PROTEINS = {
    ['AUG'] => 'Methionine',
    ['UUU', 'UUC'] => 'Phenylalanine',
    ['UUA', 'UUG'] => 'Leucine',
    ['UCU', 'UCC', 'UCA', 'UCG'] => 'Serine',
    ['UAU', 'UAC'] => 'Tyrosine',
    ['UGU', 'UGC'] => 'Cysteine',
    ['UGG'] => 'Tryptophan',
    ['UAA', 'UAG', 'UGA'] => 'STOP'
  }.freeze

  def self.of_codon(rna)
    PROTEINS.select { |codons, _| codons.include?(rna) }.values.first
  end

  def self.of_rna(strand)
    arr = strand.scan(/[a-z]{3}/i)
    result = []
    arr.each do |rna|
      fail InvalidCodonError if of_codon(rna).nil?
      break if stop?(rna)
      result << of_codon(rna)
    end
    result
  end

  def self.stop?(rna)
    of_codon(rna) == 'STOP'
  end
end
