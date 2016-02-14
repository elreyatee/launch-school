require 'pry'

# - Both players are initially dealt two cards from a 52 card deck
# - The player takes the first turn and decides whether to 'stay' or 'hit'
# - If the player busts, he loses. If he stays, it's the dealer's turn
# - The dealer must keep hitting until his cards add up to at least 17
# - If the dealer busts, the player wins. If both the dealer and player stays, the highest total wins
module Hand
  def self.included(*)
    Array.class_eval do
      def joinand(delimiter)
        arr = dup
        conjunction = 'and'
        return arr.join(" #{conjunction} ") if arr.size == 2
        arr[-1] = "#{conjunction} #{arr[-1]}" if arr.size > 2
        arr.join(delimiter)
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
    hand.map(&:to_s).joinand(', ')
  end

  def clear
    hand = []
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
    total > 21
  end

  def twenty_one?
    total == 21
  end
end

class Dealer < Player
  def initialize(name = 'Dealer')
    super(name)
  end

  def show_face_up_card
    "Dealer's face up card is a #{hand.last}"
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

  private

  def calculate_value
    if rank == 'Ace'
      11
    elsif rank.to_i == 0
      10
    else 
      rank.to_i
    end
  end
end

class Deck
  SUITS = %W(\u2660 \u2663 \u2665 \u2666).freeze
  RANKS = %w(2 3 4 5 6 7 8 9 10 Jack Queen King Ace).freeze

  attr_reader :cards

  def initialize
    @cards = RANKS.product(SUITS).collect do |(rank, suit)|
      Card.new(rank, suit)
    end
  end

  def deal!
    cards.pop
  end

  def shuffle!
    cards.shuffle!
  end
end

class Game
  DEALER_MIN = 17

  attr_accessor :player, :dealer, :deck, :winner

  def initialize
    @deck = Deck.new
    @player = Player.new
    @dealer = Dealer.new
    @winner = nil
  end

  def start
    display_welcome_message

    loop do 
      deal_cards
      show_initial_cards
      compare_players
      show_results
      break unless play_again?
      reset_game
    end
    display_goodbye_message
  end

  def display_welcome_message
    puts "Welcome to Twenty-One! Let's play!"
  end

  def deal_cards
    deck.shuffle!
    puts "Dealing cards ..."
    
    2.times do
      player.hand << deck.deal!
      dealer.hand << deck.deal!
    end
  end

  def show_initial_cards
    puts dealer.show_face_up_card
  end

  def player_turn
    loop do 
      puts "You have #{player.show_hand}"
      break if player.twenty_one? || player.busted?
      print "Would you like to hit or stay (h or s)? "
      answer = gets.chomp.downcase

      if answer.start_with?('h')
        puts "#{player.name} takes a hit ..."
        player.hand << deck.deal!
      else
        puts "#{player.name} decides to stay ..."
        break
      end
    end
    player.total
  end

  def dealer_turn
    loop do 
      puts "Dealer has #{dealer.show_hand}"
      break if dealer.twenty_one? || dealer.busted?

      if dealer.total < DEALER_MIN
        puts "Dealer takes a hit ..."
        dealer.hand << deck.deal!
      else
        puts "Dealer decides to stay ..."
        break
      end
    end
    dealer.total
  end

  def compare_players
    player_total = player_turn
    if player.busted?
      winner = :player_busted
      return winner 
    end

    dealer_total = dealer_turn 

    winner = case 
      when dealer.busted?
        :dealer_busted
      when player_total > dealer_total
        :player_wins
      when dealer_total > player_total 
        :dealer_wins
      else
        :tie 
      end
    winner
  end

  def show_results
    case winner 
    when :player_wins
      puts "You win!"
    when :dealer_wins
      puts "Dealer wins!"
    when :player_busted
      puts "Sorry, you busted. Game over."
    when :dealer_busted
      puts "Dealer busts, you win!"
    end
  end

  def play_again?
    print "Want to play again (y or n)? "
    answer = gets.chomp.downcase
    answer.start_with?('y')
  end

  def reset_game
    deck += dealer.hand
    deck += player.hand
    dealer.clear
    player.clear
    winner = nil
  end

  def display_goodbye_message
    puts "Thank for playing! Good-bye!"
  end

  private :display_welcome_message, :deal_cards, :show_initial_cards, :player_turn,
          :dealer_turn, :compare_players, :show_results, :play_again?, :reset_game,
          :display_goodbye_message

end

Game.new.start
