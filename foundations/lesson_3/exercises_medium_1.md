Question 1

Let's do some "ASCII Art" (a stone-age form of nerd artwork from back in the days before computers had video screens).

For this exercise, write a one-line program that creates the following output 10 times, with the subsequent line indented 1 space to the right:

The Flintstones Rock!
 The Flintstones Rock!
  The Flintstones Rock!

  Answer:
  10.times { |i| puts "The Flintstones Rock!".prepend(' ' * i) }

Question 2

Create a hash that expresses the frequency with which each letter occurs in this string:

statement = "The Flintstones Rock"

  Answer: 
  h = Hash.new(0)
  statement.chars.each {|letter| h[letter] += 1}

Question 3

The result of the following statement will be an error:

puts "the value of 40 + 2 is " + (40 + 2)

Why is this and what are two possible ways to fix this?

  Answer: 

  You cannot add string and integers together, to fix 
  => puts "the value of 40 + 2 is #{(40 + 2)}"

Question 4

What happens when we modify an array while we are iterating over it? What would be output by this code?

  numbers = [1, 2, 3, 4]
  numbers.each do |number|
    p number
    numbers.shift(1)
  end

What would be output by this code?

  numbers = [1, 2, 3, 4]
  numbers.each do |number|
    p number
    numbers.pop(1)
  end

  Answer: 
  first one => 1 3
  second one => 1 2

Question 5:

def factors(number)
  dividend = number
  divisors = []
  begin
    divisors << number / dividend if number % dividend == 0
    dividend -= 1
  end until dividend == 0
  divisors
end

Alyssa noticed that this will fail if you call this with an input of 0 or a negative number and asked Alan to change the loop. How can you change the loop construct (instead of using begin/end/until) to make this work? Note that we're not looking to find the factors for 0 or negative numbers, but we just want to handle it gracefully instead of raising an exception or going into an infinite loop.

  Answer:

  def factors(number)
    dividend = number
    divisors = []
    while dividend > 0
      divisors << number / dividend if number % dividend == 0
      dividend -= 1
    end
    divisors
  end

  Bonus 1

  What is the purpose of the number % dividend == 0 ? factors of number is found when it divides evenly.

  Bonus 2

  What is the purpose of the second-to-last line in the method (the divisors before the method's end)? Return collection of factors

Question 6

Alyssa was asked to write an implementation of a rolling buffer. Elements are added to the rolling buffer and if the buffer becomes full, then new elements that are added will displace the oldest elements in the buffer.

She wrote two implementations saying, "Take your pick. Do you like << or + for modifying the buffer?". Is there a difference between the two, other than what operator she chose to use to add an element to the buffer?

  def rolling_buffer1(buffer, max_buffer_size, new_element)
    buffer << new_element
    buffer.shift if buffer.size >= max_buffer_size
    buffer
  end

  def rolling_buffer2(input_array, max_buffer_size, new_element)
    buffer = input_array + [new_element]
    buffer.shift if buffer.size >= max_buffer_size
    buffer
  end

  Answer:

  Yes, the difference is in the first one, the original buffer will be modified. In the second one, it will not alter the caller's input_array argument

Question 7

Alyssa asked Ben to write up a basic implementation of a Fibonacci calculator, A user passes in two numbers, and the calculator will keep computing the sequence until some limit is reached.

Ben coded up this implementation but complained that as soon as he ran it, he got an error. Something about the limit variable. What's wrong with the code?

limit = 15

def fib(first_num, second_num)
  while second_num < limit
    sum = first_num + second_num
    first_num = second_num
    second_num = sum
  end
  sum
end

result = fib(0, 1)
puts "result is #{result}"

How would you fix this so that it works?

  Answer:
  The method does not have access to the outer scope to capture the limit variable, you'll have to pass it into the method, set a constant or possible use a block.

Question 8 

In another example we used some built-in string methods to change the case of a string. A notably missing method is something provided in Rails, but not in Ruby itself...titleize! This method in Ruby on Rails creates a string that has each word capitalized as it would be in a title.

Write your own version of the rails titleize implementation.

  Answer:

  String.class_eval do 
    def titleize!
      self.split.map(&:capitalize).join(' ')
    end
  end

Question 9 

Given the munsters hash below

munsters = {
  "Herman" => { "age" => 32, "gender" => "male" },
  "Lily" => { "age" => 30, "gender" => "female" },
  "Grandpa" => { "age" => 402, "gender" => "male" },
  "Eddie" => { "age" => 10, "gender" => "male" },
  "Marilyn" => { "age" => 23, "gender" => "female"}
}

Modify the hash such that each member of the Munster family has an additional "age_group" key that has one of three values describing the age group the family member is in (kid, adult, or senior). Your solution should produce the hash below:

{ "Herman" => { "age" => 32, "gender" => "male", "age_group" => "adult" },
  "Lily" => {"age" => 30, "gender" => "female", "age_group" => "adult" },
  "Grandpa" => { "age" => 402, "gender" => "male", "age_group" => "senior" },
  "Eddie" => { "age" => 10, "gender" => "male", "age_group" => "kid" },
  "Marilyn" => { "age" => 23, "gender" => "female", "age_group" => "adult" } }

Note: a kid is in the age range 0 - 17, an adult is in the range 18 - 64 and a senior is aged 65+.

hint: try using a case statement along with Ruby Range objects in your solution

  Answer: 

  munsters.each do |name, stats|
    case stats["age"]
    when 0..17
      stats["age_group"] = "kid"
    when 18..64
      stats["age_group"] = "adult"
    else
      stats["age_group"] = "senior"
    end
  end
