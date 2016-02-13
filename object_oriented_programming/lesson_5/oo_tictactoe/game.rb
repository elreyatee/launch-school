Dir.glob("*.rb").each do |file|
  require_relative file unless file == __FILE__
end

class TTTGame
  MAX = 5
  SPACING = 40
  @@first_to_move = nil
  @@round = 1
  @@ties = 0

  attr_reader :board, :human, :computer

  def initialize
    @board = Board.new
    @human = Player.new
    @computer = Computer.new
    @@first_to_move = human.marker
    @current_marker = @@first_to_move
    @human.name = ask_name
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

  def ask_name
    print "Hello! What's your name? "
    name = gets.chomp
    puts "Nice to meet you #{name}, lets begin ..."
    sleep 2
    name
  end

  def setup_new_game
    reset
    human.score = 0
    computer.score = 0
    @@round = 1
    @@ties = 0
  end

  def display_final_scores
    clear
    puts "Total rounds played: #{@@round}"
    puts "Total number of ties: #{@@ties}"
    puts "Final score: "
    puts "#{human.name}: #{human.score}"
    puts "#{computer.name}: #{computer.score}"

    puts "#{human.name} won the game!" if human.score == MAX
    puts "#{computer.name} won the game!" if computer.score == MAX
  end

  def first_to_max?
    human.score == MAX || computer.score == MAX
  end

  def display_welcome_message
    puts "Welcome to Tic Tac Toe!\n".center(SPACING)
  end

  def display_goodbye_message
    puts "Thanks for playing Tic Tac Toe! Goodbye!"
  end

  # rubocop:disable Metrics/AbcSize
  def display_board
    puts "ROUND #{@@round}".center(SPACING)
    puts "=" * SPACING
    puts "SCORES".center(SPACING)
    puts "#{human.name}: #{human.score}".ljust(SPACING / 2) + "#{computer.name}: #{computer.score}".rjust(SPACING / 2)
    puts "=" * SPACING
    puts ''
    puts "You're an #{human.marker}.  #{computer.name} is an #{computer.marker}.".center(SPACING)
    puts ''
    board.draw(options: SPACING)
    puts ''
  end
  # rubocop:enable Metrics/AbcSize

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

  def offense
    board.find_game_winning_square(computer.marker)
  end

  def defense
    board.find_at_risk_square(human.marker)
  end

  def middle
    return 5 if board.unmarked_keys.include?(5)
  end

  def random
    board.unmarked_keys.sample
  end

  def computer_moves
    moves = [:offense, :defense, :middle, :random]
    square = nil

    moves.each do |move|
      square = send(move)
      break if square 
    end

    board[square] = computer.marker
  end

  def display_result
    clear_screen_and_display_board

    case board.winning_marker
    when human.marker
      puts "You won!"
      human.score += 1
    when computer.marker
      puts "#{computer.name} won!"
      computer.score += 1
    else
      puts "It's a tie!"
      @@ties += 1
    end
    sleep 2
  end

  def play_again?
    answer = nil
    loop do
      puts "Would you like to play again #{human.name}? (y/n)"
      answer = gets.chomp.downcase
      break if %(y n).include? answer
      puts "Sorry, must by y or n"
    end

    answer == 'y'
  end

  def reset
    board.reset
    @current_marker = @@first_to_move
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
    if @current_marker == human.marker
      human_moves
      @current_marker = computer.marker
    else
      computer_moves
      @current_marker = human.marker
    end
  end
end

game = TTTGame.new
game.play
