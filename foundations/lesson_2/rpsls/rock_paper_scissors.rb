VALID_CHOICES = %w(rock paper scissors lizard spock).freeze

WINNERS = {
  'rock' => %w(scissors lizard),
  'paper' => %w(rock spock),
  'scissors' => %w(paper lizard),
  'lizard' => %w(spock paper),
  'spock' => %w(rock scissors)
}.freeze

def prompt(message)
  puts "=> #{message}"
end

Array.class_eval do
  alias_method :beats?, :include?
end

def win?(first, second)
  WINNERS[first].beats?(second)
end

def display_results(player, computer)
  if win?(player, computer)
    prompt 'You won!'
  elsif win?(computer, player)
    prompt 'Computer won!'
  else
    prompt "It's a tie!"
  end
end

loop do
  choice = ''
  loop do
    prompt "Choose one: #{VALID_CHOICES.join(', ')}"
    choice = gets.chomp

    break if VALID_CHOICES.include?(choice)
    prompt "That's not a valid choice."
  end

  computer_choice = VALID_CHOICES.sample

  prompt "You chose: #{choice}; Computer chose: #{computer_choice}"

  display_results(choice, computer_choice)

  prompt 'Do you want to play again?'
  answer = gets.chomp
  break unless answer.downcase.start_with?('y')
end

prompt 'Thank you for playing!'
