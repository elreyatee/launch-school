Dir.glob("*.rb").each do |file|
  require_relative file unless file == __FILE__
end

class TTTGame
  SPACING = 40

  attr_accessor :game_data
  attr_reader :board, :human, :computer

  def initialize
    @data = { round: 1, ties: 0, max: 1, players: [], first_to_move: nil, current_marker: nil }

    @board = Board.new
    @data[:players] << @human = Player.new
    @data[:players] << @computer = Computer.new

    @data[:first_to_move] = human.marker
    @data[:current_marker] = human.marker
    @human.name = ask_name
  end

  # rubocop:disable Metrics/AbcSize
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

    display_winner
    display_goodbye_message
  end
  # rubocop:enable Metrics/AbcSize

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
    data[:round] = 1
    data[:ties] = 0
  end

  def display_winner
    if human.score == data[:max]
      puts "#{human.name} won the game!"
    else
      puts "#{computer.name} won the game!"
    end
  end

  def display_final_scores
    clear

    final_scores = <<-FINAL_SCORES
    GAME STATS
    #{dash_line}
    Total rounds played: #{data[:round]}
    Total number of ties: #{data[:ties]}
    Final scores:
    FINAL_SCORES

    final_scores.each_line { |line| puts line.strip.center(SPACING) }
    data[:players].each { |plyr| puts "#{plyr.name}: #{plyr.score}".center(SPACING) }
  end

  def first_to_max?
    data[:players].any? { |plyr| plyr.score == data[:max] }
  end

  def display_welcome_message
    puts "Welcome to Tic Tac Toe!\n".center(SPACING)
  end

  def display_goodbye_message
    puts "Thanks for playing Tic Tac Toe! Goodbye!"
  end

  def dash_line
    '=' * SPACING
  end

  def scores
    "#{human.name}: #{human.score}".ljust(SPACING / 2) +
      "#{computer.name}: #{computer.score}".rjust(SPACING / 2)
  end

  def display_board
    game_board = <<-GAME_BOARD
      ROUND #{data[:round]}
      #{dash_line}
      SCORES
      #{dash_line}
      #{scores}
    GAME_BOARD

    game_board.each_line { |line| puts line.strip.center(SPACING) }
    board.draw(options: SPACING)
  end

  def clear_screen_and_display_board
    clear
    display_board
  end

  def clear
    system 'clear'
  end

  def human_moves
    print "Chose a square between (#{board.unmarked_keys.join(', ')}): "

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
      game_data[:ties] += 1
    end
    sleep 1
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
    data[:current_marker] = data[:first_to_move]
    clear
  end

  def display_next_round_message
    puts "Let's play another round!"
    puts ''
    data[:round] += 1
  end

  def display_play_again_message
    puts "Let's play again!"
    puts ''
  end

  def current_player_moves
    if data[:current_marker] == human.marker
      human_moves
      data[:current_marker] = computer.marker
    else
      computer_moves
      data[:current_marker] = human.marker
    end
  end
end

game = TTTGame.new
game.play
