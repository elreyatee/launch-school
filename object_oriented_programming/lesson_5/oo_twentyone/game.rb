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

  def calculate_value
    if rank == 'Ace'
      11
    elsif rank.to_i == 0
      10
    else
      rank.to_i
    end
  end

  private :calculate_value
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

  def <<(card)
    cards << card
  end

  def size
    cards.size
  end
end

class Game
  DEALER_MIN = 17

  attr_accessor :player, :dealer, :deck

  def initialize
    @deck = Deck.new
    @player = Player.new
    @dealer = Dealer.new
  end

  def start
    display_welcome_message

    loop do
      deal_cards
      show_initial_cards
      result = compare_players
      show_results(result)
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
      puts "Total value: #{player.total}"
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
      puts "Total value: #{dealer.total}"
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
    return :player_busted if player.busted?

    dealer_total = dealer_turn
    return :dealer_busted if dealer.busted?

    if dealer_total > player_total
      :dealer
    elsif player_total > dealer_total
      :player
    else
      :tie
    end
  end

  def show_results(result)
    case result
    when :player
      puts "You win!"
    when :dealer
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
    dealer.hand.each { |card| deck << card }
    player.hand.each { |card| deck << card }
    dealer.hand.clear
    player.hand.clear
    clear_screen
  end

  def display_goodbye_message
    puts "Thank for playing! Good-bye!"
  end

  def clear_screen
    system 'clear'
  end

  private :display_welcome_message, :deal_cards, :show_initial_cards, :player_turn,
          :dealer_turn, :compare_players, :show_results, :play_again?,
          :reset_game, :display_goodbye_message, :clear_screen
end

Game.new.start
