// Exercise 1

// Write a constructor function Circle that takes a radius argument that
// can create circle objects. You should be able to call an area on the
// created objects to get a circle's area.

function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function() {
  return Math.PI * this.radius * this.radius;
}

// Exercise 2

// What will the following code log out and why?

function Ninja(){
  this.swung = true;
}

var ninja = new Ninja();

Ninja.prototype.swingSword = function(){
  return this.swung;
};

console.log(ninja.swingSword());

// True

// Exercise 3

// What will the following code log out and why?

function Ninja(){
  this.swung = true;
}

var ninja = new Ninja();

Ninja.prototype = {
  swingSword: function() {
    return this.swung;
  }
};

console.log(ninja.swingSword());

// Unchaught TypeError

// Exercise 4

function Ninja(){
  this.swung = false;
}

var ninjaA = new Ninja();
var ninjaB = new Ninja();

// Add a swing method to the Ninja prototype which
// returns itself and modifies swung

Ninja.prototype.swing = function() {
  this.swung = true;
  return this;
}

consoloe.log(ninjaA.swing().swung)      // this needs to be true
consoloe.log(ninjaB.swing().swung)      // this needs to be true

// Exercise 5

var ninjaA = (function(){
 function Ninja(){};
 return new Ninja();
})();

// var ninjaB = Object.create(ninjaA);

var ninjaB = new ninjaA.constructor();

console.log(ninjaB.constructor === ninjaA.constructor);    // this should be true
