class Employee
  attr_accessor :emp_name, :serial_number

  @@total_employees = 0

  def initialize(name, serial_number)
    @emp_name = name
    @serial_number = serial_number
    @@total_employees += 1
  end
end

class PartTime < Employee; end

class FullTime < Employee
  attr_accessor :desk, :vacation_days

  def initialize(name, serial_number, desk)
    super(name, serial_number)
    @desk = desk
    @vacation_days = 10
  end
end

class Manager < FullTime
  attr_accessor :office, :can_delegate_tasks

  @@prefix = "Mgr"

  def initialize(name, serial_number, desk, office)
    @office = office
    @vacation_days = 14
    @can_delegate_tasks = true
    super(titled(name), serial_number, desk)
  end

  private

  def titled(some_name)
    @@prefix + ' ' + some_name
  end
end

class Executive < Manager
  @@prefix = "Exe"

  def initialize(name, serial_number, desk, corner_office)
    @vacation_days = 20
    super(titled(name), serial_number, desk, corner_office)
  end
end
