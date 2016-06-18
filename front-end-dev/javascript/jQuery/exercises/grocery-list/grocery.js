$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();

    var item = $("#item").val(),
        quantity = $("#quantity").val() || "1",
        list_item = quantity + " " + item;

    $("ul").append("<li>" + list_item + "</li>");
    $("form").find("input").val("");
  });
});
