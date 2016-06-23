$(function() {
  var $blinds = $("[id^=blind]"),
      delay = 1500,
      speed = 250;

  $blinds.each(function(index) {
    var $blind = $blinds.eq(index);

    $blind.delay(delay * index + speed).animate({
      top: "+=" + $(this).height(),
      height: 0
    }, speed);
  });
});
