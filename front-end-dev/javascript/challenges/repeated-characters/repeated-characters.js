// Implement a function that takes a string as an argument and returns an object
// containing the count of repeated characters.
//
// repeatedCharacters("Programming");    // { r: 2, g: 2, m: 2 }
// repeatedCharacters("Combination");    // { o: 2, i: 2, n: 2 }
// repeatedCharacters("Pet");            // {}
// repeatedCharacters("Paper");          // { p: 2 }
// repeatedCharacters("Baseless");       // { s: 3, e: 2 }
//
// Note that the repeatedCharacters function is not just about counting the
// numbers of times a character repeats. It counts and returns only the
// characters that have a count of 2 or more. Also, it ignores cases when
// counting characters.

function deleteNonRepeat(obj) {
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (obj[key] < 2) delete obj[key];
    }
  }
}

function repeatedCharacters(word) {
  var letters = word.toLowerCase().split("");
  var result = {};

  letters.forEach(function(l) {
    if (result[l]) {
      result[l] += 1;
    } else {
      result[l] = 1;
    }
  });

  deleteNonRepeat(result);

  return result;
}
