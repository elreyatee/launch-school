function letterSort(word) {
  return word.split('').sort().join('');
}

function areAnagrams(word, candidate) {
  var sortedWord = letterSort(word);
  var sortedCandidate = letterSort(candidate);
  return sortedWord === sortedCandidate;
}

function anagram(word, list) {
  return list.filter(function(candidate) {
    return areAnagrams(word, candidate);
  })
}
