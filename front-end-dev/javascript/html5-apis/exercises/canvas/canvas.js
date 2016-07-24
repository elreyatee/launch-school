$(function() {
  var canvas = document.querySelector("canvas"),
      ctx = canvas.getContext("2d");

  // Draw Rectangle
  // var colors = ["#000", "#003", "#006", "#009", "#00c", "#00f"];

  // function draw() {
  //   colors.forEach(function(color, i) {
  //     ctx.fillStyle = color;
  //     ctx.fillRect(i * 20, i * 20, canvas.width - i * 40, canvas.height - i * 40);
  //   });
  //   colors.unshift(colors.pop());
  //   setInterval(draw, 200);
  // }

  // draw();

  // Draw Circle
  var x = canvas.width / 2,
      y = canvas.height / 2,
      radius = x;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();

  // Draw Triangle
  ctx.beginPath();
  ctx.strokeStyle = "rgba(0, 102, 204, .7)";
  ctx.moveTo(x, y - 50);
  ctx.lineTo(x + 50, y);
  ctx.lineTo(x - 50, y);
  ctx.lineTo(x, y - 50);
  ctx.stroke();
  ctx.closePath();

});