// Exercise 1

// 1. Create an object called shape that has a type property and a
//    getType method.

var shape = {
  type: "",
  getType: function() {
    return this.type;
  }
};

// 2. Define a Trangle constructor function whose prototype is
//    shape. Objects created with Triangle should have three own
//    properties: a, b and c representing the sides of a triange.

function Triangle(a, b, c) {
  this.type = "triangle";
  this.a = a;
  this.b = b;
  this.c = c;
}

Triangle.prototype = shape;

// 3. Add a new method to the prototype called getPerimeter.

Triangle.prototype.getPerimeter = function() {
  return this.a + this.b + this.c;
}

// Note, normally this is done for you because a function's
// prototype object will have a constructor property pointing
// to the function. However, in this case, because we set it
// manually, we lost that constructor reference.
Triangle.prototype.constructor = Triangle;
