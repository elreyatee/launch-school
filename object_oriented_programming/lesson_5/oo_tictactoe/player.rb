class Player
  CPU_NAMES = %w(Hal Klaatu Skynet SID6.7 Bishop).freeze

  attr_accessor :marker, :name, :score

  def initialize(marker, name = 'Player')
    @marker = marker
    @name = name
    @score = 0
  end
end
