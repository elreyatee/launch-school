Question 3

Let's call a method, and pass both a string and an array as parameters and see how even though they are treated in the same way by Ruby, the results can be different.

Study the following code and state what will be displayed...and why:

  def tricky_method(a_string_param, an_array_param)
    a_string_param += "rutabaga"
    an_array_param << "rutabaga"
  end

  my_string = "pumpkins"
  my_array = ["pumpkins"]
  tricky_method(my_string, my_array)

  puts "My string looks like this now: #{my_string}"
  puts "My array looks like this now: #{my_array}"

  Answer: 

  => My string looks like this now: pumpkins
  => My array looks like this now: ["pumpkins", "rutabaga"]

  The reason is because Ruby is pass-by-reference-by-value. When you call a method, under the hood, Ruby passes NOT the actual value stored by the variable, but the value of the REFERENCE. So the parameter becomes a private copy of the reference. This is important becuase mutating actions, like the one performed on the array, actually augments the original value --> it doesn't change the original's reference, just the value that it's pointing to. In case of the string, += is a short cut for a generic varible assignment: a_string_param = a_string_param + "rutabaga". Here's, by doing basic varible assignment, the reference of the privately scoped variable changes, therefore any changes do NOT affect the outside original.

Question 4

To drive that last one home...let's turn the tables and have the string show a modified output, while the array thwarts the method's efforts to modify the caller's version of it.

  def tricky_method_two(a_string_param, an_array_param)
    a_string_param.gsub!('pumpkins', 'rutabaga')
    an_array_param = ['pumpkins', 'rutabaga']
  end

  my_string = "pumpkins"
  my_array = ["pumpkins"]
  tricky_method_two(my_string, my_array)

  puts "My string looks like this now: #{my_string}"
  puts "My array looks like this now: #{my_array}"

  Answer:
  => My string looks like this now: rutabaga
  => My array looks like this now: ["pumpkins"]

Question 5

How could the unnecessary duplication in this method be removed?

  def color_valid(color)
    if color == "blue" || color == "green"
      true
    else
      false
    end
  end

  Answer:
  def color_valid(color)
    color == "blue" || color == "green" 
  end