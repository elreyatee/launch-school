require 'yaml'
MESSAGES = YAML.load_file '.calculator_messages.yml'
LANGUAGE = 'en'.freeze

# ask the user for two numbers
# ask the user for an operation to perform
# perform the operation on the two numbers
# output the result

def messages(message, lang)
  MESSAGES[lang][message]
end

def prompt(key)
  message = messages(key, LANGUAGE).nil? ? key : messages(key, LANGUAGE)
  puts "=> #{message}"
end

def valid_number?(number)
  number.instance_of?(Numeric)
end

def operator_to_message(op)
  case op
  when '1'
    'Adding'
  when '2'
    'Subtracting'
  when '3'
    'Multiplying'
  when '4'
    'Dividing'
  end
end

prompt 'welcome'

name = ''
loop do
  name = gets.chomp
  break unless name.empty? { prompt 'valid_name' }
end

prompt "Hi #{name}!"

loop do # main loop
  number1 = ''
  loop do
    prompt 'first_number'
    number1 = gets.chomp

    break unless valid_number?(number1) { prompt 'valid_number' }
  end

  number2 = ''
  loop do
    prompt 'second_number'
    number2 = gets.chomp

    break unless valid_number?(number1) { prompt 'valid_number' }
  end

  operator_prompt = <<-msg.gsub(/^\s+/, '')
    What operation would you like to perform?
    1) add
    2) subtract
    3) multiply
    4) divide
  msg

  prompt(operator_prompt)

  operator = ''
  loop do
    operator = gets.chomp

    break if %w(1 2 3 4).include?(operator) { prompt 'must_choose' }
  end

  prompt "#{operator_to_message(operator)} the two numbers ..."

  result = case operator
           when '1'
             number1.to_i + number2.to_i
           when '2'
             number1.to_i - number2.to_i
           when '3'
             number1.to_i * number2.to_i
           when '4'
             number1.to_f / number2.to_f
           end

  prompt result

  prompt 'another_calculation'
  answer = gets.chomp
  break unless answer.downcase.start_with? 'y'
end

prompt 'thank_you'
