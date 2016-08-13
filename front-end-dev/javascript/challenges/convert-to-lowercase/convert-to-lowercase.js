// Write a function that turns a string into a lower-cased string manually.
//
// The way to convert a single upper-cased character to a lower-cased one is
// to get its numeric representation in the ASCII table, add 32 to that number,
// and convert the number back to a string character. You can use the
// String.fromCharCode and the charCodeAt methods on a string for those purposes.
// For example:

// var string = "A"
// asciiNumeric = string.charCodeAt(0);                 // 65
// asciiNumeric += 32;
// string = String.fromCharCode(asciiNumeric);

function toLowerCase(string) {
  var newString = "",
      charCode;

  for (var i = 0; i < string.length; i++) {
    charCode = string.charCodeAt(i);

    if (charCode >= 65 && charCode <= 90) {
      charCode += 32;
    }

    newString += String.fromCharCode(charCode);
  }

  return newString;
}
