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
  CPU_NAMES = %w(Hal Klaatu Skynet SID6.7 Bishop Jarvis).freeze
  COMPUTER_MARKER = "O".freeze

  def initialize(marker = COMPUTER_MARKER, name = CPU_NAMES.sample)
    super(marker, name)
  end

  def choice_on(brd)
    moves = [:offense, :defense, :middle, :random]
    square = nil

    moves.each do |move|
      square = send(move, brd)
      break if square
    end

    square
  end

  private

  def offense(brd)
    brd.find_game_winning_square(marker)
  end

  def defense(brd)
    brd.find_at_risk_square(!marker || ' ')
  end

  def middle(brd)
    return 5 if brd.unmarked_keys.include?(5)
  end

  def random(brd)
    brd.unmarked_keys.sample
  end
end
