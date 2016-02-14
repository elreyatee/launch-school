module Displayable
  SPACING = 40
  
  private 

  def display_winner
    if human.score == data[:max]
      puts "#{human.name} won the game!"
    elsif
      puts "#{computer.name} won the game!"
    end
  end

  def display_final_scores
    clear_screen

    final_scores = <<-FINAL_STATS
    GAME STATS
    #{display_dash_line}
    Total rounds played: #{data[:round]}
    Total number of ties: #{data[:ties]}

    Final scores:
    FINAL_STATS

    final_scores.each_line { |line| puts line.strip.center(SPACING) }
    data[:players].each { |plyr| puts "#{plyr.name}: #{plyr.score}".center(SPACING) }
  end

  def display_welcome_message
    puts "Welcome to Tic Tac Toe!\n".center(SPACING)
  end

  def display_goodbye_message
    puts "Thanks for playing Tic Tac Toe! Goodbye!"
  end

  def display_dash_line
    '=' * SPACING
  end

  def display_scores
    "#{human.name}: #{human.score}".ljust(SPACING / 2) +
      "#{computer.name}: #{computer.score}".rjust(SPACING / 2)
  end

  def display_board
    game_board = <<-GAME_BOARD
      ROUND #{data[:round]}
      #{display_dash_line}
      SCORES
      #{display_dash_line}
      #{display_scores}
    GAME_BOARD

    game_board.each_line { |line| puts line.strip.center(SPACING) }
    board.draw(line_width: SPACING)
  end


  def display_result
    clear_screen_and_display_board

    winner = owner_of(board.winning_marker)

    case winner
    when human
      puts "You won!"
    when computer
      puts "#{computer.name} won!"
    else
      puts "It's a tie!"
    end

    sleep 1
  end

  def display_next_round_message
    puts "Let's play another round!"
    sleep 1
  end

  def display_play_again_message
    puts "Let's play again!"
    sleep 1
  end
end
