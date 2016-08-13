// Write a function that takes two arguments:
//
// 1. a string to be split
// 2. a delimeter string

// The function logs out the splitted strings to the console.

// Examples:
// function splitString(string, delimeter) {
//   // ...
// }
//
// splitString("abc,123,hello world", ",");
// // logs out:
// abc
// 123
// hello world
//
// splitString("hello");
// // logs out:
// hello
//
// splitString("hello", "");
// // logs out:
// h
// e
// l
// l
// o
//
// splitString("hello", ";");
// // logs out:
// hello
//
// splitString(";hello;", ";");
// // logs out:
//
// hello

// Don't use any other JavaScript's built-in string methods, other than the square
// brackets ([]) for index access of characters in a string.


function splitString(string, delimiter) {
  var temp_string = "";

  for (var i = 0; i < string.length; i++) {
    if (string[i] === delimiter) {
      console.log(temp_string);
      temp_string = "";
    } else if (delimiter === "") {
      console.log(string[i]);
    } else {
      temp_string += string[i];
    }
  }

  if (temp_string) {
    console.log(temp_string);
  }
}
