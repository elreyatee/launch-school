SUITS = ["\u2660", "\u2663", "\u2665", "\u2666"].freeze
RANKS = %w(2 3 4 5 6 7 8 9 10 Jack King Queen Ace).freeze
NUMBER_OF_DECKS = 1

def deck_of_cards
  (RANKS.product(SUITS) * NUMBER_OF_DECKS).shuffle!
end