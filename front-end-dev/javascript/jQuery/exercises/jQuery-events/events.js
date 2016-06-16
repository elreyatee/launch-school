$(function() {
  $("form").submit(function(event) {
    event.preventDefault();

    var character_code = $("#key").val().charCodeAt(0); // char code for input character

    $(document).off("keypress").on("keypress", function(event) {
      if (event.which !== character_code) { return; }
      $("a").trigger("click");
    });
  });

  $("a").click(function(event) {
    event.preventDefault();
    $("#accordion").slideToggle();
  });
});
