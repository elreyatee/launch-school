Question 1

What would you expect the code below to print out?

  numbers = [1, 2, 2, 3]
  numbers.uniq

  puts numbers 

  => 1 2 2 3 because uniq unique does not mutate the caller. Also, puts calls to_s method on the array which justs prints out the contents on each new line

Question 2

Describe the difference between ! and ? in Ruby. And explain what would happen in the following scenarios: 1. what is != and where should you use it? 2. put ! before something, like !user_name 3. put ! after something, like words.uniq! 4. put ? before something 5. put ? after something 6. put !! before something, like !!user_name

