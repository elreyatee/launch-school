// Exercise 1

function getDefiningObject(object, propKey) {
  while (object && !object.hasOwnProperty(propKey)) {
    object = Object.getPrototypeOf(object);
  }
  return object;
}

// Exercise 2
function shallowCopy(object) {
  var new_obj = Object.create(Object.getPrototypeOf(object));

  for(var prop in object) {
    if(object.hasOwnProperty(prop)) {
      new_obj[prop] = object[prop];
    }
  }
  return new_obj;
}

function shallowCopy(object) {
  var new_object = Object.create(Object.getPrototypeOf(object));

  for(var prop in object) {
    if(Object.prototype.hasOwnProperty.call(object, prop)) {
      new_obj[prop] = object[prop];
    }
  }
  return new_obj;
}

// Exercise 3
function extend(destination) {
  for(var i = 1; i < arguments.length; i++ ) {
    var source = arguments[i];
    for(var prop in source) {
      if(Object.prototype.hasOwnProperty.call(source, prop)) {
        destination[prop] = source[prop];
      }
    }
  }
  return destination;
}
