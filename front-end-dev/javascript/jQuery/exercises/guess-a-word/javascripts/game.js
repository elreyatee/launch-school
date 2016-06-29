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
    var blank_spans = "<span></span>".repeat(this.word.length);

    $spaces.find("span").remove();
    $guesses.find("span").remove();
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
  },
  addGuessedLetter: function(letter) {
    if (!this.letters_guessed.includes(letter)) {
      this.letters_guessed.push(letter);
      $guesses.append("<span>" + letter + "</span>");

      if (this.word.indexOf(letter) !== -1) {
        this.word.forEach(function(character, index) {
          if (character === letter) {
            $spaces.find("span").eq(index).text(character);
          }
        });
      } else {
        this.incorrect++;
        $apples.removeAttr("class").addClass("guess_" + this.incorrect);
      }
    }
  }
};

var game = new Game();

function range(start, end) {
  return new Array((end + 1) - start).fill().map(function(_, index) {
    return start + index;
  });
}

$(document).on("keypress", function(event) {
  var key = event.which,
      key_range = range(97, 122);

  if(key_range.includes(key)) {
    game.addGuessedLetter(String.fromCharCode(key));
  }
});
