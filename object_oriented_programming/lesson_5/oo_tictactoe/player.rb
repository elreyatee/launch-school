class Player
  DEFAULT_HUMAN_MARKER = "X".freeze

  attr_accessor :marker, :name, :score

  def initialize(marker = DEFAULT_HUMAN_MARKER, name = 'Player')
    @marker = marker
    @name = name
    @score = 0
  end
end

class Computer < Player
  CPU_NAMES = %w(Hal Klaatu Skynet SID6.7 Bishop).freeze
  COMPUTER_MARKER = "O".freeze

  def initialize(marker = COMPUTER_MARKER, name = CPU_NAMES.sample)
    super(marker, name)
  end
end
