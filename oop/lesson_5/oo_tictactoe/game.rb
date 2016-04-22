Dir.glob("*.rb").each do |file|
  require_relative file unless file == __FILE__
end

class TTTGame
  include Displayable

  attr_accessor :data
  attr_reader :board, :human, :computer

  def initialize
    @data = { round: 0, ties: 0, max: 3, players: [],
              first_to_move: nil, current_player: nil }

    @board = Board.new
    @human = Player.new
    @computer = Computer.new
    @data[:players].push(@human, @computer)

    @data[:first_to_move] = @data[:current_player] = human
    @human.name = ask_name
  end

  def play
    main_loop
    display_winner
    display_goodbye_message
  end

  private

  def main_loop
    loop do
      round_loop
      display_final_scores
      break unless play_again?
      display_play_again_message
      setup_new_game
    end
  end

  def round_loop
    loop do
      data[:round] += 1
      clear_screen_and_display_board
      player_loop
      display_result
      break if first_to_max?
      reset_game
      display_next_round_message
    end
  end

  def player_loop
    until board.someone_won? || board.full?
      current_player_moves
      clear_screen_and_display_board
    end
  end

  def setup_new_game
    reset_game
    data[:players].each { |plyr| plyr.score = 0 }
    data[:round] = 0
    data[:ties] = 0
    data[:first_to_move] = human
    data[:current_player] = human
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

  def computer_moves
    square = computer.choice_on(board)
    board[square] = computer.marker
  end

  def reset_game
    board.reset
    data[:first_to_move] = data[:current_player] = human
    clear_screen
  end

  def current_player_moves
    if data[:current_player] == human
      human_moves
      data[:current_player] = computer
    else
      computer_moves
      data[:current_player] = human
    end
  end

  def ask_name
    display_welcome_message
    print "Hello! What's your name? "
    name = gets.chomp
    puts "Nice to meet you #{name}, lets begin ..."
    sleep 1
    name
  end

  def first_to_max?
    data[:players].any? { |plyr| plyr.score == data[:max] }
  end

  def owner_of(mrk)
    winner = data[:players].find { |plyr| plyr.marker == mrk }
    winner ? winner.score += 1 : data[:ties] += 1
    winner
  end

  def play_again?
    answer = nil
    loop do
      print "Would you like to play again #{human.name} (y/n)? "
      answer = gets.chomp.downcase
      break if %(y n).include? answer
      puts "Sorry, must by y or n"
    end

    answer == 'y'
  end
end

game = TTTGame.new
game.play
