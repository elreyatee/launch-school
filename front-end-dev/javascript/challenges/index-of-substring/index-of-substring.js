// Write two functions that both take two strings as arguments. Their expected
// behaviors are:
//
// the indexOf function returns the index of the first character in the firstString
// argument at the first instance that the secondString argument is found the
// lastIndexOf function returns the index of the first character in the firstString
// argument at the last instance that the secondString argument is found in either
// function, if there's no instance found of second string, return -1.
//
// Examples
//
// function indexOf(firstString, secondString) {
//   // statements
// };
//
// function lastIndexOf(firstString, secondString) {
//   // statements
// };
//
// indexOf("Some strings", "s");      // 5
// indexOf("Blue Whale", "Whale");    // 5
// indexOf("Blue Whale", "Blute");    // -1
// indexOf("Blue Whale", "leB");      // -1
//
// lastIndexOf("Some strings", "s");                  // 11
// lastIndexOf("Blue Whale, Killer Whale", "Whale");  // 19
// lastIndexOf("Blue Whale, Killer Whale", "all");    // -1
//
// Don't use any other JavaScript's built-in string methods, other than the square
// brackets ([]) for index access of characters in a string, for example:
//
// "hello"[0];     // "h"
// "hello"[4];     // "o"

// function indexOf(firstString, secondString) {
  // var arr = firstString.split("");
  //
  // for(var idx = 0; idx <= firstString.length - 1; idx++) {
  //   if (arr.slice(idx, secondString.length + idx).join("") === secondString) {
  //     return idx;
  //   }
  // }
  //
  // return -1;
function indexOf(firstString, secondString) {
  var limit = firstString.length - secondString.length,
      matchCount;

  for (var idx = 0; idx <= limit; idx++) {
    matchCount = 0;

    for (var j = 0; j < secondString.length; j++) {
      if (firstString[idx + j] == secondString[j]) {
        matchCount++;
      } else {
        break;
      };
    }

    if (matchCount == secondString.length) {
      return idx;
    }
  }

  return -1;
}

function lastIndexOf(firstString, secondString) {
  var limit = firstString.length - secondString.length,
      matchCount;

  for (var idx = limit; idx >= 0; i--) {
    matchCount = 0

    for (var j = 0; j < secondString.length; j++) {
      if (firstString[idx + j] == secondString[j]) {
        matchCount++;
      } else {
        break;
      };
    }

    if (matchCount == secondString.length) {
      return idx;
    }
  }
  
  return -1;
}
