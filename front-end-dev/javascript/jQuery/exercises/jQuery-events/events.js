$(function() {
  $("form").submit(function(e) {
    e.preventDefault();

    var key = $("input[type='text']").val();
    var character_code = key.charCodeAt(0);  // char code for input character

    $(document).off("keypress").on("keypress", function(e) {
      if (e.which !== character_code) { return; }
      $("a").trigger("click");
    });
  });

  $("a").click(function(e) {
    e.preventDefault();
    $("#accordion").slideToggle();
  });
});
