// Exercise 1

// Write a function that returns the object on a given
// object's prototype chain where a property is defined.

function getDefiningObject(object, propKey) {
  while (object && !object.hasOwnProperty(propKey)) {
    object = Object.getPrototypeOf(object);
  }
  return object;
}

var foo = { a: 1, b: 2 };
var bar = Object.create(foo);
var baz = Object.create(bar);
var qux = Object.create(baz);

bar.c = 3;

console.log(getDefiningObject(qux, 'c') === bar); // true
console.log(getDefiningObject(qux, 'e'));         // null

// Exercise 2

// Write a function to provide a shallow copy of an object. The
// copied object should share the same prototype chain as the
// original object, and it has the same own properties that
// return the same values or objects when accessed.

function shallowCopy(object) {
  var copy = Object.create(Object.getPrototypeOf(object));
  for(var prop in object) {
    if (Object.prototype.hasOwnProperty.call(object, prop)) {
      copy[prop] = object[prop];
    }
  }
  return copy;
}

var foo = { a: 1, b: 2 };
var bar = Object.create(foo);

bar.c = 3;
bar.say = function() {
  console.log("c is " + this.c);
};

var baz = shallowCopy(bar);

console.log(baz.a);     // 1
console.log(baz.say()); // c is 3

// Exercise 3

// Write a function that extends an object (destination object) with contents
// from multiple objects (source objects).

function extend(destination) {
  for(var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for(var prop in source) {
      if(Object.prototype.hasOwnProperty.call(source, prop)) {
        destination[prop] = source[prop];
      }
    }
  }
  return destination;
}

var foo = {
  a: 0,
  b: { x: 1, y: 2 },
};

var joe = {
  name: "Joe",
};

var funcs = {
  sayHello: function() {
    console.log("Hello, " + this.name);
  },

  sayGoodBye: function() {
    console.log("Goodbye, " + this.name);
  },
};

var object = extend({}, foo, joe, funcs);

console.log(object.b.x);          // 1
console.log(object.sayHello());   // Hello, Joe
