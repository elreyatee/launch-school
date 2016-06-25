$(function() {
  $("a").on("click, mouseenter" , function(event) {
    event.preventDefault();

    $("article").hide().filter("[data-block=" + $(this).attr("data-block") + "]").show();
  });
});
