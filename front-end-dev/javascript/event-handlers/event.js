window.onload = init;

function init() {
  var images = document.getElementsByTagName("img");

  for (var i = 0; i < images.length; i++) {
    images[i].onmouseover = showAnswer;
    images[i].onmouseout = reblur;
  }
}

function showAnswer(event) {
  var image = event.target,
      name = image.id;

  name += ".jpg";
  image.src = name;
  // setTimeout(reblur, 2000, image);
}

function reblur(event) {
  var image = event.target,
      name = image.id;
  name += "blur.jpg";
  image.src = name;
}
