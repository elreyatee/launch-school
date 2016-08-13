function octalToDecimal(numericString) {
  var decimals = number.split('').reverse().map(function(num, idx) {
    return +num * Math.pow(8, idx);
  });

  return decimals.reduce(function(total, num) {
    return total + num;
  }, 0);
}
