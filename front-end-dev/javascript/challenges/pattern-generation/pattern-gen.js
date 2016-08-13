// Write a function that can take a single argument n, as number of rows,
// and log out a square of numbers of asterisks. For example, if n = 7,
// log out the following pattern:
//
//
// console output:
//
// 1******
// 12*****
// 123****
// 1234***
// 12345**
// 123456*
// 1234567
//
// You can assume that n is greater than 1 and less than 10.

function range(start, end) {
  var result = "";

  for(var i = start; i <= end; i++) {
    result += i;
  }

  return result;
}

function generatePattern(n) {
  var output = [];

  for(var i = 1; i <= n; i++) {
    output.push(range(1, i) + "*".repeat(n - i));
  }

  return output.join("\n");
}
