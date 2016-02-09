Array.class_eval do
  def joinand(delimiter, conjunction = 'and')
    return join(" #{conjunction} ") if size == 2
    self[-1] = "#{conjunction} #{last}" if size > 2
    join(delimiter)
  end
end

def prompt(msg)
  puts "=> #{msg}"
end

def welcome
  puts "================================================="
  puts "------------- Welcome to Twenty-One -------------"
  puts "================================================="
  puts ""
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

def display_totals(player_hand, dealer_hand)
  puts "======================================="
  prompt "You're total card value: #{total(player_hand)}"
  prompt "Dealer's total card value: #{total(dealer_hand)}"
  puts "======================================="
end

def detect_result(player_hand, dealer_hand, deck)
  # Show dealer's face up card
  prompt "Dealer's face up card is a #{dealer_hand.last[0]} of #{dealer_hand.last[1]}."

  player_total = player_turn(player_hand, deck)
  return :player_busted if player_total > BLACKJACK

  dealer_total = dealer_turn(dealer_hand, deck)
  return :dealer_busted if dealer_total > BLACKJACK

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