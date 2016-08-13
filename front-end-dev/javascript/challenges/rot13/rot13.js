var lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz",
    upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    shiftPos;

function isUpper(c) {
  if (c.toUpperCase() === c && upperCaseLetters.indexOf(c) !== -1) { return true; }
  return false;
}

function isLower(c) {
  if (c.toLowerCase() === c && lowerCaseLetters.indexOf(c) !== -1) { return true; }
  return false;
}

function rot13(string) {
  return string.split("").map(function(char) {
    if (isUpper(char)) {
      shiftPos = upperCaseLetters.indexOf(char) + 13;
      return upperCaseLetters[shiftPos % 26];
    } else if (isLower(char)) {
      shiftPos = lowerCaseLetters.indexOf(char) + 13;
      return lowerCaseLetters[shiftPos % 26];
    } else {
      return char;
    }
  }).join("");
}
