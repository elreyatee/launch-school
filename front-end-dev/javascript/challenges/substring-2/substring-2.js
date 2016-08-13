// This exercise is similar to the previous one, but this time both arguments
// passed in are indices of the string provided, with the following rules:
//
// * if both start and end are positive integers, start is less than end, and both
//   are within the boundary of the string, return the substring from the start
//   index (inclusive), to the end index (NOT inclusive).
// * if the value of start is greater than end, the function swaps the value of the two.
// * if start is equal to end then substring will return an empty string
// * if end is not provided, the end variable inside of the function will become undefined.
//   In this case return the substring up to the end of the string.
// * if either start or end is less than 0 or NaN, it is treated as 0.
// * if either start or end is greater than the length of the string, then it is
//   treated to be equal to the length of the string instead.

function substring(string, start, end) {
  var newString = "",
       temp;

  if (end === undefined) {
    end = string.length;
  }

  if (start < 0 || isNaN(start)) {
    start = 0;
  }

  if (end < 0 || isNaN(end)) {
    end = 0;
  }

  if (start > end) {
    temp = start;
    start = end;
    end = temp;
  }

  if (start > string.length) {
    start = string.length;
  }

  if (end > string.length) {
    end = string.length;
  }

  if (start === end) {
    return "";
  }

  for (var i = start; i < end; i++) {
    newString += string[i];
  }

  return newString;
}
