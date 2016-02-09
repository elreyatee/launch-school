BLACKJACK = 21
DEALER_MIN = 17

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
  values.count('Ace').times { sum -= 10 if sum > BLACKJACK }

  sum
end
# rubocop:enable Style/ConditionalAssignment

def deal_card(deck)
  deck.pop
end

def busted?(hand)
  total(hand) > BLACKJACK
end