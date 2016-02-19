class School
  attr_reader :students

  def initialize
    @students = Hash.new { |hash, grade| hash[grade] = Array.new }
  end

  def add(name, grade)
    students[grade] << name
  end

  def to_h
    students.sort_by { |grade, names| [grade, names.sort!] }.to_h
  end

  def grade(grade_request)
    students[grade_request]
  end
end