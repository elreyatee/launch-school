require 'date'

class Meetup
  STARTING_DAYS = { first: 1, second: 8, teenth: 13,
                    third: 15, fourth: 22, last: -7 }.freeze

  def initialize(month, year)
    @month = month
    @year = year
  end

  def day(weekday, schedule)
    first_day = STARTING_DAYS[schedule]
    day = (first_day..(first_day + 6)).detect { |find_day| Date.new(@year, @month, find_day).send(weekday.to_s + '?') }
    @date = Date.new(@year, @month, day)
  end
end
