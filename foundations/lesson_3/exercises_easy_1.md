Question 1

What would you expect the code below to print out?

  numbers = [1, 2, 2, 3]
  numbers.uniq

  puts numbers 

  Answer:
  => 1 2 2 3 because uniq unique does not mutate the caller. Also, puts calls to_s method on the array which justs prints out the contents on each new line

Question 2

Describe the difference between ! and ? in Ruby. And explain what would happen in the following scenarios: 1. what is != and where should you use it? 2. put ! before something, like !user_name 3. put ! after something, like words.uniq! 4. put ? before something 5. put ? after something 6. put !! before something, like !!user_name

  Answer:
  1. != means 'not equal to' 
  2. ! before something flips its boolean value, true -> false, false -> true
  3. ! after a method name like some_method! by convention represents a distructive action
  4. ? before something doesn't do anything
  5. ? : is the ternary operator for if..else
  6. !! is used to turn something into a boolean statement

Question 3

Replace the word "important" with "urgent" in this string:
  advice = "Few things in life are as important as house training your pet dinosaur."

  Answer: 
  advice.gsub!('important', 'urgent')

Question 4

The Ruby Array class has several methods for removing items from the array. Two of them have very similar names. Let's see how they differ:

  numbers = [1, 2, 3, 4, 5]

What does the follow method calls do (assume we reset numbers to the original array between method calls)?

  numbers.delete_at(1)
  numbers.delete(1)

  Answer:
  numbers.delete_at(1) => [1, 3, 4, 5] ... deletes number at index 1
  numbers.delete(1) => [2, 3, 4, 5] ... deletes the number 1 from the array

Question 5

Programmatically determine if 42 lies between 10 and 100.

  Answer:
  (10..100).cover?(42)

Question 6

Starting with the string:

  famous_words = "seven years ago..."

show two different ways to put the expected "Four score and " in front of it.

  Answer:
  1. "Four score and " + famous_words
  2. "Four score and " << famous_words
  3. famous_words.prepend("Four score and ")

Question 7

Fun with gsub:

  def add_eight(number)
    number + 8
  end

  number = 2

  how_deep = "number"
  5.times { how_deep.gsub!("number", "add_eight(number)") }

  p how_deep

This gives us a string that looks like a "recursive" method call:

  "add_eight(add_eight(add_eight(add_eight(add_eight(number)))))"
  If we take advantage of Ruby's Kernel#eval method to have it execute this string as if it were a "recursive" method call

  eval(how_deep)
  what will be the result?

  Answer: 42

Question 8

If we build an array like this:

flintstones = ["Fred", "Wilma"]
flintstones << ["Barney", "Betty"]
flintstones << ["BamBam", "Pebbles"]
We will end up with this "nested" array:

["Fred", "Wilma", ["Barney", "Betty"], ["BamBam", "Pebbles"]]

  Answer: flintstones.flatten!

Question 9

Given the hash below

flintstones = { "Fred" => 0, "Wilma" => 1, "Barney" => 2, "Betty" => 3, "BamBam" => 4, "Pebbles" => 5 }

Turn this into an array containing only two elements: Barney's name and Barney's number

  Answer:
  flintstones.assoc("Barney")

Question 10

Given the array below

flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "BamBam"]

Turn this array into a hash where the names are the keys and the values are the positions in the array.

  Answer:

  hash = {}
  flintstones.each_with_index { |name, index| hash[name] = index}
