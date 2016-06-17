$(document).ready(function() {
  $("form").submit(function(event) {
    event.preventDefault();

    var $form = $(this),
        value_1 = +$form.find("#value_1").val(),
        value_2 = +$form.find("#value_2").val(),
        operator = $form.find("#operator").val(),
        result = 0;

    if(operator === "+") {
      result = value_1 + value_2;
    } else if(operator === "-") {
      result = value_1 - value_2;
    } else if(operator === "*") {
      result = value_1 * value_2;
    } else if(operator === "/") {
      result = value_1 / value_2;
    }

    $("h2").text(result);
  });
});
