// Write a function that takes a string as an argument, and returns the string stripped of spaces from both ends.
//
// Example
//
// trim("  abc  ");  // "abc"
// trim("abc   ");   // "abc"
// trim(" ab c");    // "ab c"'
// trim(" a b  c");  // "a b  c"
// trim("      ");   // ""
// trim("");         // ""
// Don't use any other JavaScript's built-in string methods, other than the square brackets ([]) for index access of characters in a string, for example:
//
// "hello"[0];     // "h"
// "hello"[4];     // "o"

function trim(string) {
  var result = trimLeft(string);
  return trimRight(result);
}

function trimLeft(string) {
  var result = "",
      copyMode = false;

  for (var i = 0; i < string.length; i++) {
    if (string[i] !== " ") {
      copyMode = true;
    }

    if (copyMode) {
      result += string[i];
    }
  }

  return result;
}

function trimRight(string) {
  var result = "",
      copyMode = false;

  for (var i = string.length - 1; i >= 0; i--) {
    if(string[i] !== " ") {
      copyMode = true;
    }

    if (copyMode) {
      result = string[i] + result;
    }
  }

  return result;
}
