var $message = $("#message"),
    $spaces = $("#spaces"),
    $guesses = $("#guesses"),
    $replay = $("#replay"),
    $body = $("body"),
    $apples = $("#apples");

var randomWord = (function () {
  var words = ["rhythm", "exodus", "voyeurism", "haphazard", "jiujitsu", "kilobyte"];
  var words = ["ok"];

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
    this.replayLink(false);
    return this;
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
    $apples.removeClass().addClass("guess_" + this.total_incorrect);
  },
  resetClass: function () {
    $apples.removeClass();
  },
  displayMessage: function (msg) {
    $message.text(msg);
  },
  init: function () {
    this.keypressOn();
    this.resetClass();
    this.clearGuesses();
    this.createBlanks();
    this.setBoardStatus();
    this.displayMessage("");
    this.replayLink(false);
  },
  processGuess: function(event) {
    var letter = String.fromCharCode(event.which);

    if (this.guesses.includes(letter)) { return; }
    if (this.invalidGuess(letter)) { return; }
    this.addGuess(letter);
  },
  keypressOn: function() {
    $(document).on("keypress", this.processGuess.bind(this));
  },
  keypressOff: function() {
    $(document).off("keypress");
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
  setBoardStatus: function(status) {
    $body.removeClass();

    if(status) { $body.addClass(status); }
  },
  replayLink: function(which) {
    $replay.toggle(which);
  },
  win: function() {
    this.keypressOff();
    this.displayMessage("You won!");
    this.setBoardStatus("win");
    this.replayLink(true);
  },
  lose: function() {
    this.keypressOff();
    this.displayMessage("Sorry you lost!");
    this.setBoardStatus("lose");
    this.replayLink(true);
  },
  isGameOver: function () {
    if (this.total_incorrect === this.total_guesses) {
      this.lose();
    } else if (this.correct_spaces === this.word.length) {
      this.win();
    }
  }
};

$("#replay").on("click", function (event) {
  event.preventDefault();

  new Game();
});

new Game();
