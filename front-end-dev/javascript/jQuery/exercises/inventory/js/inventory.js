$(function() {
  function getDate() {
    var $date = $("#order_date"),
        current_date = new Date();
    $date.text(current_date.toUTCString());
  }

  getDate();
});
