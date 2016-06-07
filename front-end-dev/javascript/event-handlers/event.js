window.onload = init;

function init() {
  var image = document.getElementById("zero");
  image.onclick = showImage;
}

function showImage() {
  var image = document.getElementById("zero");
  image.src = "zero.jpg";
}
