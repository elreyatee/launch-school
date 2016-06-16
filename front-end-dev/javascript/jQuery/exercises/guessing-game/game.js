$(document).ready(function() {
  function randomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  var answer = randomNumber(),
      guess_count = 0;

  $("form").submit(function(event) {
    event.preventDefault();

    var guess = +$("#guess").val(),
        message;

    guess_count++;

    if(guess === answer) {
      message = "You've won! It took you " + guess_count + " guesses.";
    } else if(guess > answer) {
      message = "My number is lower than " + guess + ".";
    } else if(guess < answer) {
      message = "My number is higher than " + guess + ".";
    }

    $("p").text(message);
  });

  $("a").click(function(event) {
    event.preventDefault();

    answer = randomNumber();
    $("p").text("Guess a number from 1 to 100");
    guess_count = 0;
    $("#guess").val('');
  });
});
