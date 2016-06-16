$(document).ready(function() {
  var answer = Math.floor(Math.random() * 100) + 1;
  var message = "Guess a number from 1 to 100";
  var guess_count = 0;

  $("form").submit(function(event) {
    event.preventDefault();

    var guess = +$("#guess").val();
    guess_count += 1;

    if(guess > answer) {
      message = "My number is lower than " + guess;
    } else if(guess < answer) {
      message = "My number is higher than " + guess;
    } else {
      message = "You've won! It took you " + guess_count + " guesses.";
    }

    $("p").text(message);
  });

  $("a").click(function(event) {
    event.preventDefault();
    answer = Math.floor(Math.random() * 100) + 1;
    $("p").text("Guess a number from 1 to 100");
    guess_count = 0;
  });
});
