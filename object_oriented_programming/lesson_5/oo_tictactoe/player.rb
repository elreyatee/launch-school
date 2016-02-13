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

  def choice_on(board)
    moves = [:offense, :defense, :middle, :random]
    square = nil

    moves.each do |move|
      square = send(move, board)
      break if square
    end
    square
  end

  private

  def offense(board)
    board.find_game_winning_square(marker)
  end

  def defense(board)
    board.find_at_risk_square(!marker || ' ')
  end

  def middle(board)
    return 5 if board.unmarked_keys.include?(5)
  end

  def random(board)
    board.unmarked_keys.sample
  end
end
