module Hand
  # Add joinand method when Hand module included
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

  # Calculate total of hand
  def total
    result = 0
    hand.each { |card| result += card.value }

    # Correct for Aces
    hand.each do |card|
      if result > 21 && card.ace?
        result -= 10
      end
    end

    result
  end

  def show_hand
    hand.map(&:to_s).joinand(', ')
  end
end

class Participant
  include Hand

  attr_accessor :hand

  def initialize
    @hand = []
  end

  def busted?
    total > 21
  end

  def twenty_one?
    total == 21
  end
end

class Player < Participant
  include Hand

  attr_accessor :hand, :name

  def initialize
    @hand = []
    set_name
  end

  # Validate input for player name
  def set_name
    name = ''
    loop do
      print "What's your name? "
      name = gets.chomp
      break unless name.empty?
      puts "Sorry, please enter your name."
    end
    self.name = name
  end

  private :set_name
end

class Dealer < Participant
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

  def ace?
    rank == 'Ace'
  end

  def to_s
    "#{rank} of #{suit}"
  end

  # Assign value to card
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

  def deal_card
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
    display_welcome_message
    @deck = Deck.new
    @player = Player.new
    @dealer = Dealer.new
  end

  def start
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
    puts "Welcome to Twenty-One!"
  end

  def deal_cards
    deck.shuffle!
    puts "Dealing cards ..."
    puts ''
    sleep 1

    2.times do
      player.hand << deck.deal_card
      dealer.hand << deck.deal_card
    end
  end

  def show_initial_cards
    puts "------ Dealer's Face Up Card ------"
    puts dealer.show_face_up_card
    puts ''
  end

  def player_turn
    puts "---------- #{player.name}'s Turn ----------"

    loop do
      puts "You have #{player.show_hand}"
      puts "Total value: #{player.total}"
      break if player.twenty_one? || player.busted?

      print "Would you like to (h)it or (s)tay? "

      # validate answer is 'h' or 's'
      answer = ''
      loop do 
        answer = gets.chomp.downcase
        break if ['h', 's'].include?(answer)
        puts "Sorry, must enter 'h' or 's'."
      end
      
      if answer.start_with?('h')
        puts "#{player.name} hits ..."
        player.hand << deck.deal_card
      else
        puts "#{player.name} stays ..."
        break
      end
    end

    puts ''
    player.total
  end

  def dealer_turn
    puts "---------- Dealer's Turn ----------"

    loop do
      puts "Dealer has #{dealer.show_hand}"
      puts "Total value: #{dealer.total}"
      break if dealer.twenty_one? || dealer.busted?

      if dealer.total < DEALER_MIN
        puts "Dealer hits ..."
        sleep 1
        dealer.hand << deck.deal_card
      else
        puts "Dealer stays ..."
        sleep 1
        break
      end
    end

    puts ''
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
      puts "#{player.name} wins!"
    when :dealer
      puts "Dealer wins!"
    when :player_busted
      puts "Sorry, you busted. Game over."
    when :dealer_busted
      puts "Dealer busts, #{player.name} wins!"
    when :tie
      puts "It's a tie!"
    end
  end

  def play_again?
    answer = ''
    loop do 
      print "Want to play again (y)es or (n)o? "
      answer = gets.chomp.downcase
      break if ['y', 'n'].include?(answer)
      puts "Sorry, must enter 'y' or 'n'."
    end
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
