// Implement a function that takes a string and a number times as an argument.
// The function returns the string repeated times number of times. You can assume
// times is an integer. If times is a negative number, return undefined. If times
// is 0, return an empty string. If times is passed in as a non-number, return
// undefined as well.
//
// function repeat(string, times) {
//   // ...
// }
//
// repeat("abc", 1);    // "abc"
// repeat("abc", 2);    // "abcabc"
// repeat("abc", -1);   // undefined
// repeat("abc", 0);    // ""
// repeat("abc", "a");  // undefined

function repeat(string, times) {
  var newString = "";

  if (times < 0 || isNaN(times)) {
    return undefined;
  }

  for(var i = 0; i < times; i++) {
    newString += string;
  }

  return newString;
}
