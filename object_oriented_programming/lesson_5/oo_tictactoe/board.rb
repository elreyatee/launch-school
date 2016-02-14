class Board
  WINNING_LINES = [[1, 2, 3], [4, 5, 6], [7, 8, 9]] + # rows
                  [[1, 4, 7], [2, 5, 8], [3, 6, 9]] + # columns
                  [[1, 5, 9], [3, 5, 7]]              # diagonals

  def initialize
    @squares = {}
    reset
  end

  def []=(num, marker)
    @squares[num].marker = marker
  end

  def find_at_risk_square(marker)
    square = nil

    WINNING_LINES.each do |line|
      if @squares.values_at(*line).count(marker) == 2
        square = line.select { |grid| @squares[grid] != marker }
        break if square
      end
    end

    square
  end
  alias find_game_winning_square find_at_risk_square

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

  def draw(options = {})
    boards = <<-GRID

         -----+-----+-----
        |     |     |     |
        |  #{@squares[1]}  |  #{@squares[2]}  |  #{@squares[3]}  |
        |     |     |     |
         -----+-----+-----
        |     |     |     |
        |  #{@squares[4]}  |  #{@squares[5]}  |  #{@squares[6]}  |
        |     |     |     |
         -----+-----+-----
        |     |     |     |
        |  #{@squares[7]}  |  #{@squares[8]}  |  #{@squares[9]}  |
        |     |     |     |
         -----+-----+-----

    GRID
    puts boards.center(options[:spacing] || 0)
  end

  private

  def three_identical_markers?(squares)
    markers = squares.select(&:marked?).collect(&:marker)
    return false if markers.size != 3
    markers.min == markers.max
  end

  def tab(line)
    puts " " * TAB_VALUE + line.to_s
  end
end
