var passengers = [ { name: "Aaron Temple", paid: true, ticket: "economy" },
                   { name: "Ellery Temple", paid: true, ticket: "firstclass" },
                   { name: "Ashley Lawrence", paid: false, ticket: null } ];

function startFlight(passengers) {
  for(var i = 0; i < passengers.length; i++) {
    servePassenger(passengers[i]);
  }
}

function servePassenger(passenger) {
  var getDrinkOrder = createDrinkOrder(passenger);
  // take dinner order, etc.
  getDrinkOrder();
}

function createDrinkOrder(passenger) {
  var orderFunction;

  if(passenger.ticket === "firstclass") {
    orderFunction = function() {
      console.log("Would you like wine or beer?");
    };
  } else if(passenger.ticket === null) {
    orderFunction = function() {
      console.log("Get off the plane!");
    };
  } else {
    orderFunction = function() {
      console.log("Would you like soda or water?");
    };
  }
  return orderFunction;
}

startFlight(passengers);
