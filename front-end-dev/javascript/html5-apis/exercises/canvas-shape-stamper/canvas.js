$(function() {
  var canvas = document.querySelector("canvas"),
      ctx = canvas.getContext("2d"),
      method,
      $color = $("input");

  var drawing_methods = {
    square: function(e) {
      var side = 30,
          x = e.offsetX - side / 2,
          y = e.offsetY - side / 2;

      ctx.fillRect(x, y, side, side);
    },
    circle: function(e) {
      var radius = 15,
          x = e.offsetX,
          y = e.offsetY;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    },
    triangle: function(e) {
      var side = 30,
          x = e.offsetX,
          y = e.offsetY - side / 2;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + side / 2, y + side);
      ctx.lineTo(x - side / 2, y + side);
      ctx.fill();
      ctx.closePath();
    },
    clear: function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  $(".drawing_method").on("click", function(e) {
    e.preventDefault();

    var $el = $(this);

    $el.closest("ul").find(".active").removeClass("active");
    $el.addClass("active");
    method = $el.data("method");
  }).eq(0).click();

  $("#clear").on("click", function(e) {
    e.preventDefault();

    drawing_methods.clear();
  });

  $("canvas").on("click", function(e) {
    var color = $color.val();

    ctx.fillStyle = color;
    drawing_methods[method](e);
  });
});