var $letters = $("#spaces"),
    $guesses = $("#guesses"),
    $apples = $("#apples"),
    $message = $("#message");

var randomWord = (function() {
  var words = ["abacus", "quotient", "octothorpe", "proselytize", "stipend"];

  return function() {
    var word = words[Math.floor(Math.random() * words.length)];
    words.splice(words.indexOf(word), 1);
    return word;
  };
})();

function Game() {
  this.incorrect = 0;
  this.letters_guessed = [];
  this.correct_spaces = 0;
  this.word = randomWord();

  if (!this.word) {
    this.displayMessage("Sorry, I've run out of words!");
  }
  this.word = this.word.split("");
  this.init();
}

Game.prototype = {
  createBlanks: function() {
    var spaces = (new Array(this.word.length + 1)).join("<span></span>");

    $letters.find("span").remove();
    $letters.append(spaces);
    this.$spaces = $("#spaces span");
  },
  displayMessage: function(text) {
    $message.text(text);
  },
  init: function() {
    this.createBlanks();
  }
}
