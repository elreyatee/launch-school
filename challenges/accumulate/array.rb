class Array
  def accumulate(&block)
    reduce([]) { |result, item| result << block.call(item) }
  end
end