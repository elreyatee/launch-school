class Board
  WINNING_LINES = [[1, 2, 3], [4, 5, 6], [7, 8, 9]] + # rows
                  [[1, 4, 7], [2, 5, 8], [3, 6, 9]] + # columns
                  [[1, 5, 9], [3, 5, 7]]              # diagonals

  TAB_VALUE = 10

  def initialize
    @squares = {}
    reset
  end

  def []=(num, marker)
    @squares[num].marker = marker
  end

  def unmarked_keys
    @squares.keys.select { |key| @squares[key].unmarked? }
  end

  def full?
    unmarked_keys.empty?
  end

  def someone_won?
    !!winning_marker
  end

  def winning_marker
    WINNING_LINES.each do |line|
      squares = @squares.values_at(*line)
      if three_identical_markers?(squares)
        return squares.first.marker
      end
    end
    nil
  end

  def reset
    (1..9).each { |key| @squares[key] = Square.new }
  end

  # rubocop:disable Metrics/AbcSize
  def draw
    tab "     |     |"
    tab "  #{@squares[1]}  |  #{@squares[2]}  |  #{@squares[3]}"
    tab "     |     |"
    tab "-----+-----+-----"
    tab "     |     |"
    tab "  #{@squares[4]}  |  #{@squares[5]}  |  #{@squares[6]}"
    tab "     |     |"
    tab "-----+-----+-----"
    tab "     |     |"
    tab "  #{@squares[7]}  |  #{@squares[8]}  |  #{@squares[9]}"
    tab "     |     |"
  end
  # rubocop:enable Metrics/AbcSize

  private

  def three_identical_markers?(squares)
    markers = squares.select(&:marked?).collect(&:marker)
    return false if markers.size != 3
    markers.min == markers.max
  end

  def tab(line)
    puts " " * TAB_VALUE + "#{line}"
  end
end

class Square
  INITIAL_MARKER = ' '.freeze

  attr_accessor :marker

  def initialize(marker = INITIAL_MARKER)
    @marker = marker
  end

  def to_s
    @marker
  end

  def unmarked?
    marker == INITIAL_MARKER
  end

  def marked?
    marker != INITIAL_MARKER
  end
end

class Player
  CPU_NAMES = %w(Hal Klaatu Skynet SID6.7 Bishop)

  attr_accessor :marker, :name

  def initialize(marker, name)
    @marker = marker
    @name = name 
  end
end

class TTTGame
  HUMAN_MARKER = "X".freeze
  COMPUTER_MARKER = "O".freeze
  FIRST_TO_MOVE = HUMAN_MARKER
  MAX = 5
  SPACING = 40

  @@round = 1
  @@ties = 0
  @@human_points = 0
  @@computer_points = 0

  attr_reader :board, :human, :computer

  def initialize
    @board = Board.new
    @human = Player.new(HUMAN_MARKER, 'Human')
    @computer = Player.new(COMPUTER_MARKER, Player::CPU_NAMES.sample)
    @current_marker = FIRST_TO_MOVE
  end

  def play
    clear
    display_welcome_message
   
    loop do 
      loop do 
        display_board

        loop do
          current_player_moves
          break if board.someone_won? || board.full?
          clear_screen_and_display_board
        end

        display_result
        break if first_to_max?
        reset
        display_next_round_message
      end

      display_final_scores
      break unless play_again?
      display_play_again_message
      setup_new_game
    end

    display_goodbye_message
  end

  private

  def setup_new_game
    reset
    @@human_points = 0
    @@computer_points = 0
    @@round = 1
    @@ties = 0
  end

  def display_final_scores
    clear
    puts "Total rounds played: #{@@round}"
    puts "Total number of ties: #{@@ties}"
    puts "Final score: "
    puts "Human: #{human.points}"
    puts "#{computer.name}: #{computer.points}"

    if @@human_points == MAX
      puts "You won the game!"
    else
      puts "#{computer.name} won the game!"
    end
  end

  def first_to_max?
    @@human_points == MAX || @@computer_points == MAX
  end

  def display_welcome_message
    puts "Welcome to Tic Tac Toe!"
    puts ""
  end

  def display_goodbye_message
    puts "Thanks for playing Tic Tac Toe! Goodbye!"
  end

  def display_board
    puts "ROUND #{@@round}".center(SPACING)
    puts "=" * SPACING
    puts "SCORES".center(SPACING)
    puts "Human: #{@@human_points}".ljust(SPACING / 2) + "#{computer.name}: #{@@computer_points}".rjust(SPACING / 2)
    puts "=" * SPACING
    puts ''
    puts "You're an #{human.marker}.  #{computer.name} is an #{computer.marker}.".center(SPACING)
    puts ''
    board.draw
    puts ''
  end

  def clear_screen_and_display_board
    clear
    display_board
  end

  def clear
    system 'clear'
  end

  def human_moves
    puts "Chose a square between (#{board.unmarked_keys.join(', ')}): "

    square = nil
    loop do
      square = gets.chomp.to_i
      break if board.unmarked_keys.include?(square)
      puts "Sorry, that's not a valid choice."
    end

    board[square] = human.marker
  end

  def computer_moves
    board[board.unmarked_keys.sample] = computer.marker
  end

  def display_result
    clear_screen_and_display_board

    case board.winning_marker
    when human.marker
      puts "You won!"
      @@human_points += 1
    when computer.marker
      puts "#{computer.name} won!"
      @@computer_points += 1
    else
      puts "It's a tie!"
      @@ties += 1
    end
    sleep 2
  end

  def play_again?
    answer = nil
    loop do
      puts "Would you like to play again? (y/n)"
      answer = gets.chomp.downcase
      break if %(y n).include? answer
      puts "Sorry, must by y or n"
    end

    answer == 'y'
  end

  def reset
    board.reset
    @current_marker = FIRST_TO_MOVE
    clear
  end

  def display_next_round_message
    puts "Let's play another round!"
    puts ''
    @@round += 1
  end

  def display_play_again_message
    puts "Let's play again!"
    puts ''
  end

  def current_player_moves
    if @current_marker == HUMAN_MARKER
      human_moves
      @current_marker = COMPUTER_MARKER
    else
      computer_moves
      @current_marker = HUMAN_MARKER
    end
  end
end

game = TTTGame.new
game.play
