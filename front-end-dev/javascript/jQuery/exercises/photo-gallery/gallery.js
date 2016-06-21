$(function() {
  var $slideshow = $("#slideshow"),
      $nav = $slideshow.find("ul");

  $nav.on("click", "a", function(e) {
    e.preventDefault();
    var $li = $(e.currentTarget).closest("li"),
        idx = $li.index();

    // $slideshow.find("figure").filter(":visible").hide().end().eq(idx).show();
    $slideshow.find("figure").stop().filter(":visible").fadeOut(300);
    $slideshow.find("figure").eq(idx).delay(300).fadeIn(300);
    $nav.find(".active").removeClass("active");
    $li.addClass("active");
  });

  // $("a").on("click", function(e) {
  //   e.preventDefault();
  //
  //   var $e = $(this),
  //       index;
  //
  //   // Place blue border around chosen thumbnail
  //   $("ul").find("li.active").removeClass("active");
  //   $e.parent().addClass("active");
  //   index = $("ul").find("li").filter(".active").index();
  //
  //   // Hide currently displayed photo
  //   $("#slideshow figure").filter(function() {
  //     return $(this).css("display", "block");
  //   }).css("display", "none");
  //
  //   // Display chosen photo
  //   $("#slideshow figure").eq(index).css("display", "block");
  // });
});
