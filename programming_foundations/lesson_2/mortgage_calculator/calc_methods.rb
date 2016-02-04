# Calculate monthly payments
# n = number of months
# c = monthly interest rate
# l = loan amount

def calculate_monthly_payment(l, n, c)
  l * (c * (1 + c)**n) / ((1 + c)**n - 1)
end

def valid_loan_duration?(value)
  return false if value.empty? || value.to_f < 0 || value.to_f.zero?
  true
end
alias valid_loan_amount? valid_loan_duration?

def valid_interest_rate?(interest_rate)
  (1.00..20.00).cover? interest_rate.to_f
end

def prompt(message)
  print "=> #{message}"
end

def wait_for(seconds)
  string = '*'
  while seconds > 0
    print string
    string += string
    sleep 1
    seconds -= 1
  end
  puts ''
end
