require_relative 'deck'
require_relative 'card'
require_relative 'presentation'

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

  prompt "You chose to stay!" unless busted?(hand)
  
  total(hand)
end

def dealer_turn(hand, deck)
  puts "------------ Dealer's Turn ------------"

  while !busted?(hand)
    show_cards(hand, "Dealer's cards: ")
    break if total(hand) >= DEALER_MIN
    show_a_card(deck.last, "Dealer takes a hit: ")
    hand << deal_card(deck)
  end

  prompt "Dealer chose to stay!" unless busted?(hand)

  total(hand)
end

def play_again?
  puts "---------------------------------------"
  prompt "Would you like to play again? (y or n)"
  answer = gets.chomp
  answer.downcase.start_with?('y')
end

def play_game
  welcome

  loop do
    # Initialize game
    deck = deck_of_cards
    player_hand = []
    dealer_hand = []

    2.times do
      player_hand << deal_card(deck)
      dealer_hand << deal_card(deck)
    end

    display_result(player_hand, dealer_hand, deck)
    break unless play_again?
  end

  prompt "Thanks for playing, good-bye!"
end

play_game
