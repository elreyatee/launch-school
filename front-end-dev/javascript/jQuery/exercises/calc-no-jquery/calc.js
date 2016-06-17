// $(document).ready(function() {
//   $("form").submit(function(event) {
//     event.preventDefault();
//
//     var $form = $(this),
//         value_1 = +$form.find("#value_1").val(),
//         value_2 = +$form.find("#value_2").val(),
//         operator = $form.find("#operator").val(),
//         result = 0;
//
//     if(operator === "+") {
//       result = value_1 + value_2;
//     } else if(operator === "-") {
//       result = value_1 - value_2;
//     } else if(operator === "*") {
//       result = value_1 * value_2;
//     } else if(operator === "/") {
//       result = value_1 / value_2;
//     }
//
//     $("h2").text(result);
//   });
// });

function $(id_selector) {
  return document.getElementById(id_selector);
}

window.onload = function() {
  $("calculator").onsubmit = function(event) {
    event.preventDefault();

    var value_1 = +$("value_1").value,
        value_2 = +$("value_2").value,
        operator = $("operator").value,
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

    $("result").innerHTML = result;
  };
};
