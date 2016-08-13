function squareArea(s) {
  return s[0] * s[1];
}

function totalArea(rectangles) {
  return rectangles.map(squareArea).reduce(function(total, num) {
    return total + num;
  }, 0);
}

function totalSquareArea(rectangles) {
  var squares = rectangles.filter(function(shape) {
    return shape[0] === shape[1];
  });

  return totalArea(squares);
}
