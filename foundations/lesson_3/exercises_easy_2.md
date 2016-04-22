Question 1

In this hash of people and their age,

ages = { "Herman" => 32, "Lily" => 30, "Grandpa" => 402, "Eddie" => 10 }

see if there is an age present for "Spot".

  Answer:

  1. ages["Spot"] => nil
  2. ages.fetch("Spot") => KeyError: key not found
  3. ages.include? "Spot"
  4. ages.key? "Spot"
  5. ages.member? "Spot"

Question 2

Add up all of the ages from our current Munster family hash:

ages = { "Herman" => 32, "Lily" => 30, "Grandpa" => 5843, "Eddie" => 10, "Marilyn" => 22, "Spot" => 237 }

  Answer:

  ages.values.reduce(:+)

Question 3

In the age hash:

ages = { "Herman" => 32, "Lily" => 30, "Grandpa" => 402, "Eddie" => 10 }

throw out the really old people (age 100 or older).

  Answer:
  1. ages.delete_if { |_, age| age >= 100 }
  2. ages.keep_if { |name, age| age < 100 }

Question 4

Starting with this string:

  munsters_description = "The Munsters are creepy in a good way."

Convert the string in the following ways (code will be executed on original munsters_description above):

"The munsters are creepy in a good way." => munsters_description.capitalize!
"tHE mUNSTERS ARE CREEPY IN A GOOD WAY." => munsters_description.swapcase!
"the munsters are creepy in a good way." => munsters_description.downcase!
"THE MUNSTERS ARE CREEPY IN A GOOD WAY." => munsters_description.upcase!

Question 5

We have most of the Munster family in our age hash:

  ages = { "Herman" => 32, "Lily" => 30, "Grandpa" => 5843, "Eddie" => 10 }

add ages for Marilyn and Spot to the existing hash

  additional_ages = { "Marilyn" => 22, "Spot" => 237 }

  Answer:
  ages.merge!(additional_ages)

Question 6

Pick out the minimum age from our current Munster family hash:

ages = { "Herman" => 32, "Lily" => 30, "Grandpa" => 5843, "Eddie" => 10, "Marilyn" => 22, "Spot" => 237 }

  Answer:
  ages.values.min

Question 7

See if the name "Dino" appears in the string below:

  advice = "Few things in life are as important as house training your pet dinosaur."

  Answer:
  advice.match("Dino")

Question 8

In the array:

flintstones = %w(Fred Barney Wilma Betty BamBam Pebbles)

Find the index of the first name that starts with "Be"

  Answer:
  flintstones.index {|word| word.match /^Be/}

Question 9

Using array#map!, shorten each of these names to just 3 characters:

flintstones = %w(Fred Barney Wilma Betty BamBam Pebbles)

  Answer:
  flintstones.map! do |name| 
    name[0, 2] 
  end

Question 10

Again, shorten each of these names to just 3 characters -- but this time do it all on one line:

flintstones = %w(Fred Barney Wilma Betty BamBam Pebbles)

  Answer:
  flintstones.map! { |name| name[0, 2] }



