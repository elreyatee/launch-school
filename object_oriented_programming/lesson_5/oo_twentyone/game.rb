# - Both players are initially dealt two cards from a 52 card deck
# - The player takes the first turn and decides whether to 'stay' or 'hit'
# - If the player busts, he loses. If he stays, it's the dealer's turn
# - The dealer must keep hitting until his cards add up to at least 17
# - If the dealer busts, the player wins. If both the dealer and player stays, the highest total wins
module Hand
  def self.included(klass)
    Array.class_eval do 
      def joinand(delimiter)
        conjunction = 'and'
        return join(" #{conjunction} ") if size == 2
        self[-1] = "#{conjunction} #{self[-1]}" if size > 2
        join(delimiter)
      end
    end
  end

  def total
    result = 0
    hand.each { |card| result += card.value }

    # Correct for Aces
    hand.each do |card|
      if result > 21 && card == 'Ace'
        result -= 10
      end 
    end

    result
  end

  def show_hand
    hand.map { |card| card.to_s }.joinand(', ')
  end
end

class Player
  include Hand

  attr_accessor :hand, :name

  def initialize(name = 'Player')
    @name = name
    @hand = []
  end

  def busted?
    hand.total > 21
  end
end

class Dealer < Player 
  DEALER_MIN = 17

  def initialize(name = 'Dealer')
    super(name)
  end
end

class Card 
  attr_reader :suit, :rank, :value

  def initialize(rank, suit)
    @rank = rank
    @suit = suit
    @value = calculate_value
  end

  def to_s
    "#{rank} of #{suit}"
  end

  def calculate_value
    case rank 
    when 2..10
      rank.to_i
    when 'Ace'
      11
    else
      10
    end
  end
end

class Deck 
  SUITS = %W(\u2660 \u2663 \u2665 \u2666)
  RANKS = %w(2 3 4 5 6 7 8 9 10 Jack Queen King Ace)

  attr_reader :cards

  def initialize
    @cards = RANKS.product(SUITS).collect do |(rank, suit)|
              Card.new(rank, suit)
            end
    @cards.shuffle!
  end

  def deal
    cards.pop
  end
end

class Game
  def initialize

  end

  def start
    deal_cards
    show_initial_cards
    player_turn
    dealer_turn
    show_result
  end
end
