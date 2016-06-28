var randomWord = (function() {
  var words = ["rhythm", "exodus", "voyeurism", "haphazard", "jiujitsu", "kilobyte"];

  return function() {
    var word = words[Math.floor(Math.random() * words.length)];
    words.splice(words.indexOf(word), 1);
    return word;
  };
})();

var $message = $("#message"),
    $spaces  = $("#spaces"),
    $guesses = $("#guesses"),
    $apples  = $("#apples");

function Game() {
  this.word = randomWord().split(""); // word broken up into letters
  this.letters_guessed = [];
  this.max_wrong_guesses = 6;
  this.correct = 0;
  this.incorrect = 0;
  this.init();

  if (!this.word) {
    this.displayMessage("Sorry, I've run out of words!");
  }
}

Game.prototype = {
  constructor: Game,
  createBlanks: function() {
    var blank_spans = "<span></span>".repeat(this.word.length + 1);

    $spaces.find("span").remove();
    $spaces.append(blank_spans);
  },
  displayMessage: function(msg) {
    $message.text(msg);
  },
  init: function() {
    this.createBlanks();
  },
  isGameOver: function() {
    return (this.incorrect === this.max_wrong_guesses) ||
           (this.correct === this.word.length);
  }
};

new Game();
