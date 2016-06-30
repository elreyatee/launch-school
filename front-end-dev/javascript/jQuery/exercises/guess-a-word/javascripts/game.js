var $message = $("#message"),
    $spaces = $("#spaces"),
    $guesses = $("#guesses"),
    $apples = $("#apples");

var randomWord = (function () {
  var words = ["rhythm", "exodus", "voyeurism", "haphazard", "jiujitsu", "kilobyte"];

  return function () {
    var word = words[Math.floor(Math.random() * words.length)];
    words.splice(words.indexOf(word), 1);
    return word;
  };
})();

function Game() {
  this.word = randomWord();
  this.guesses = [];
  this.correct_spaces = 0;
  this.total_incorrect = 0;

  if (!this.word) {
    this.displayMessage("Sorry, I've run out of words!");
  }

  this.word = this.word.split("");
  this.init();
}

Game.prototype = {
  constructor: Game,
  total_guesses: 6,
  createBlanks: function () {
    var blank_spans = "<span></span>".repeat(this.word.length);

    $spaces.find("span").remove();
    $spaces.append(blank_spans);
  },
  clearGuesses: function () {
    $guesses.find("span").remove();
  },
  setClass: function () {
    $apples.removeAttr("class").addClass("guess_" + this.total_incorrect);
  },
  resetClass: function () {
    $apples.removeAttr("class");
  },
  displayMessage: function (msg) {
    $message.text(msg);
  },
  init: function () {
    this.createBlanks();
    this.clearGuesses();
    this.resetClass();
    this.displayMessage("");
  },
  renderGuess: function (letter) {
    $guesses.append("<span>" + letter + "</span>");
  },
  renderCorrectGuess: function (letter, index) {
    this.correct_spaces++;
    $spaces.find("span").eq(index).text(letter);
  },
  renderIncorrectGuess: function (letter) {
    this.total_incorrect++;
    this.setClass();
  },
  invalidGuess: function (letter) {
    var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    return !alphabet.includes(letter);
  },
  addGuess: function (letter) {
    var self = this;

    if (self.guesses.includes(letter)) { return; }
    if (self.invalidGuess(letter)) { return; }

    self.guesses.push(letter);
    self.renderGuess(letter);

    if (self.word.includes(letter)) {
      self.word.forEach(function (l, i) {
        if (letter === l) { self.renderCorrectGuess(l, i); }
      });
    } else {
      self.renderIncorrectGuess(letter);
    }

    self.isGameOver();
  },
  isGameOver: function () {
    if (this.total_incorrect === this.total_guesses) {
      $(document).off("keypress");
      this.displayMessage("Sorry you lost.");
    } else if (this.correct_spaces === this.word.length) {
      $(document).off("keypress");
      this.displayMessage("You won!");
    }
  }
};

var game = new Game();

$(document).on("keypress", function (event) {
  var letter = String.fromCharCode(event.which);

  game.addGuess(letter);
});

$("#replay").on("click", function (event) {
  event.preventDefault();

  game = new Game();
});
