// Implement a function that determines if a string starts with another string.
// If it does the function should return true and false otherwise.
//
// Examples
//
// function startsWith(string, searchString) {
//   // ...
// }
//
// var str = "We put comprehension and mastery above all else";
// startsWith(str, "We");       // true
// startsWith(str, "We put");   // true
// startsWith(str, "");         // true
// startsWith(str, "put");      // false
//
// var longerString = "We put comprehension and mastery above all else!";
// startsWith(str, longerString);      // false
// Don't use any other JavaScript's built-in string methods, other than the
// square brackets ([]) for index access of characters in a string.

function startsWith(string, searchString) {
  // var newString = "";
  //
  // for(var i = 0; i <= searchString.length - 1; i++) {
  //   newString += string[i];
  // }
  //
  // return newString === searchString;
  for(var i = 0; i < searchString.length; i++) {
    if (string[i] !== searchString[i]) {
      return false;
    }

    return true;
  }
}
