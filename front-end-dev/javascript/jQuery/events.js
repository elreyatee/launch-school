$(function() {

  var $p = $("p");
  var output = "Your favorite fruit is ";

  $("a").click(function(e) {
    e.preventDefault();
    var $e = $(this);

    $p.text(output + $e.text());
  });

  $("form").submit(function(e){
    e.preventDefault();

    var $input = $(this).find("input[type='text']");

    $p.text(output + $input.val());
  });
});
