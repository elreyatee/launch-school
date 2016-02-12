class Player
  CPU_NAMES = %w(Hal Klaatu Skynet SID6.7 Bishop)

  attr_accessor :marker, :name

  def initialize(marker, name)
    @marker = marker
    @name = name 
  end
end