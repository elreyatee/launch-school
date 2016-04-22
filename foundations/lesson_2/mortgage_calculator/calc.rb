require_relative 'calc_methods'

SECONDS = 4
amount, years, interest_rate = '','',''

loop do
  prompt "-------- Welcome to Mortgage Calculator! --------\n"
  prompt "-------------------------------------------------\n"
  prompt "What is the loan amount? "

  loop do
    amount = gets.chomp

    break if valid_loan_amount?(amount)
    prompt "Please enter a positive number: "
  end

  prompt "What's the loan duration in years? "

  loop do
    years = gets.chomp

    break if valid_loan_duration?(years)
    prompt "Please enter a positive number: "
  end

  prompt "What is the annual interest rate (example: 6.5 for 6.5%)? "

  loop do
    interest_rate = gets.chomp

    break if valid_interest_rate?(interest_rate)
    prompt "Please enter a positive number between 1-20%: "
  end

  annual_interest_rate = interest_rate.to_f / 100
  monthly_interest_rate = annual_interest_rate / 12
  months = years.to_i * 12

  monthly_payments = calculate_monthly_payment(amount.to_f, months, monthly_interest_rate)

  prompt "Calculating your estimated monthly payments "
  wait_for(SECONDS)

  prompt "Your payments are $#{format('%.2f', monthly_payments)} a month.\n"
  prompt "Would you like to try again? "
  puts ''

  answer = gets.chomp
  break unless answer.downcase.start_with?('y')
end

prompt "Goodbye!\n"
