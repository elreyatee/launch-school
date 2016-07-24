$(function() {
  var canvas = document.querySelector("canvas"),
      ctx = canvas.getContext("2d");

  var colors = ["#000", "#003", "#006", "#009", "#00c", "#00f"];

  function draw() {
    colors.forEach(function(color, i) {
      ctx.fillStyle = color;
      ctx.fillRect(i * 20, i * 20, canvas.width - i * 40, canvas.height - i * 40);
    });
    colors.unshift(colors.pop());
    setInterval(draw, 200);
  }

  draw();
});