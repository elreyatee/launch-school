// Write a function that returns a substring of a string based on a starting index
// and length of the substring.
//
// Examples
//
// function substr(string, start, length) {
//   // ...
// }
//
// var string = "hello world";
//
// substr(string, 2, 4);     // "llo "
// substr(string, -3, 2);    // "rl"
// substr(string, 8, 20);    // "rld"
// substr(string, 0, -20);   // ""
// substr(string, 0, 0);     // ""
//
// * the start argument is the starting index. If a negative number is given, it is
// treated as strLength + start where strLength is the length of the string (for
// example, if start is -3 it is treated as strLength - 3.)
// * if the length number
// makes the substring go beyond the last character of the string, the substring
// should stop at the last character of the string.

function substr(string, start, length) {
  var newString = "";

  if (start < 0) {
    start = string.length + start;
  }

  for (var index = start; index < start + length; index++) {
    newString += string[index];
    if (string[index] === string[string.length - 1]) {
      break;
    }
  }

  return newString;
}
