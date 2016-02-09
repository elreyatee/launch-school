require 'pry'

SUITS = ["\u2660", "\u2663", "\u2665", "\u2666"].freeze
RANKS = %w(2 3 4 5 6 7 8 9 10 Jack King Queen Ace).freeze
NUMBER_OF_DECKS = 1

def prompt(msg)
  puts "=> #{msg}"
end

def deck_of_cards
  (RANKS.product(SUITS) * NUMBER_OF_DECKS).shuffle!
end

# [["2", "Diamonds"], ["2", "Clubs"] ...
# rubocop:disable Style/ConditionalAssignment
def total(cards)
  values = cards.map { |card| card[0] }

  sum = 0
  values.each do |value|
    if value == 'Ace'
      sum += 11
    elsif value.to_i == 0
      sum += 10
    else
      sum += value.to_i
    end
  end

  # correct for aces
  values.count('Ace').times { sum -= 10 if sum > 21 }

  sum
end
# rubocop:enable Style/ConditionalAssignment

def deal_card(deck)
  deck.pop
end

def welcome
  puts "================================================="
  puts "------------- Welcome to Twenty-One -------------"
  puts "================================================="
  puts ""
end

Array.class_eval do
  def joinand(delimiter, conjunction = 'and')
    return join(" #{conjunction} ") if size == 2
    self[-1] = "#{conjunction} #{last}" if size > 2
    join(delimiter)
  end
end

def show_cards(hand, msg = 'Your cards: ')
  sentence = hand.map do |card|
    "#{card[0]} of #{card[1]}"
  end
  prompt msg.to_s + sentence.joinand(', ')
end

def show_a_card(card, msg = '')
  prompt "#{msg} #{card[0]} of #{card[1]}"
end

def busted?(hand)
  total(hand) > 21
end

def player_turn(hand, deck)
  puts "------------ Player's Turn ------------"

  while !busted?(hand)
    show_cards(hand)
    prompt "Hit or stay?"
    answer = gets.chomp
    break if answer.start_with?('s')
    show_a_card(deck.last, "You're dealt:")
    hand << deal_card(deck)
  end

  prompt "You chose to stay!" if !busted?(hand)
  total(hand)
end

def dealer_turn(hand, deck)
  puts "------------ Dealer's Turn ------------"

  loop do
    show_cards(hand, "Dealer's cards: ")
    break if busted?(hand) || total(hand) >= 17
    show_card(deck.last, "Dealer takes a hit: ")
    hand << deal_card(deck)
  end

  prompt "Dealer chose to stay!" if !busted?(hand)
  total(hand)
end

def display_totals(player_hand, dealer_hand)
  puts "======================================="
  prompt "You're total card value: #{total(player_hand)}"
  prompt "Dealer's total card value: #{total(dealer_hand)}"
  puts "======================================="
end

def detect_result(player_hand, dealer_hand, deck)
  player_total = player_turn(player_hand, deck)
  return :player_busted if player_total > 21

  dealer_total = dealer_turn(dealer_hand, deck)
  return :dealer_busted if dealer_total > 21

  if dealer_total < player_total
    :player
  elsif player_total < dealer_total
    :dealer
  else
    :tie
  end
end

def display_result(player_hand, dealer_hand, deck)
  result = detect_result(player_hand, dealer_hand, deck)

  display_totals(player_hand, dealer_hand)

  case result
  when :player
    prompt "You win!"
  when :dealer
    prompt "Dealer wins!"
  when :tie
    prompt "It's a tie!"
  when :player_busted
    prompt "Sorry, you busted. Dealer wins!"
  when :dealer_busted
    prompt "Dealer busted! You win!"
  end
end

def play_again?
  puts "---------------------------------------"
  prompt "Would you like to play again? (y or n)"
  answer = gets.chomp
  answer.downcase.start_with?('y')
end

def play_game
  welcome

  # Main game loop
  loop do
    deck = deck_of_cards
    player_hand = []
    dealer_hand = []

    # initial deal
    2.times do
      player_hand << deal_card(deck)
      dealer_hand << deal_card(deck)
    end

    # Show dealer's face up card
    prompt "Dealer's face up card is a #{dealer_hand.last[0]} of #{dealer_hand.last[1]}."

    display_result(player_hand, dealer_hand, deck)
    break unless play_again?
  end

  prompt "Thanks for playing, good-bye!"
end

play_game
