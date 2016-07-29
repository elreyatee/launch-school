$(function() {
  var $modal = $("#modal");

  $("a#add-todo").on("click", function(e) {
    e.preventDefault();
    $modal.show();
  });

  $modal.click(function() {
    $(this).hide();
  });

  

});
