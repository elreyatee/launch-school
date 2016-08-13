// Create a function that takes 2 arguments, an array and an object.
// The array will contain 2 or more elements that, when combined with
// adjoining spaces, produce a person's name. The object will contain
// two keys, title and occupation, and the appropriate values. Your
// function should then display a greeting that uses the person's full
// name, and mentions the persons title.
//
// Example:
//
// greetings(["John", "Q", "Doe"], { title: "Master", occupation: "Plumber" })
//
// // console output
// Hello, John Q Doe! Nice to have a Master Plumber around.

function greetings(nameArray, jobTitle) {
  var name = nameArray.join(" "),
      title = jobTitle["title"] + " " + jobTitle["occupation"],
      greeting = "";

  greeting += "Hello, " + name + "!";
  greeting += "\u0020Nice to have a " + title + " around.";

  console.log(greeting);
}
