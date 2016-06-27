$(function() {
  var $canvas = $("#canvas");

  function getFormObject($f) {
    var o = {};
    $f.serializeArray().forEach(function(input) {
      o[input.name] = input.value;
    });

    return o;
  }

  function createElement(data) {
    var $div = $("<div></div>", {
      "class": data.shape,
      data: data,
    });

    resetElement($div);

    return $div;
  }

  function animateElement() {
    var $e = $(this),
        data = $e.data();

    resetElement($e);

    $e.animate({
      left: +data.end_x,
      top: +data.end_y
    }, +data.duration);
  }

  function resetElement($e) {
    var data = $e.data();

    $e.css({
      left: +data.start_x,
      top: +data.start_y
    });
  }

  function stopAnimation() {
    $canvas.find("div").stop();
  }

  $("form").on("submit", function(event) {
    event.preventDefault();

    var $form = $(this),
        data = getFormObject($form);

    $canvas.append(createElement(data));
  });

  $("#animate").on("click", function(event) {
    event.preventDefault();

    $canvas.find("div").each(animateElement);
  });

  $("#stop").on("click", function(event) {
    event.preventDefault();

    $canvas.find("div").each(stopAnimation);
  });
});
