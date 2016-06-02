(function() {

  var findObjs = function(element, props, multiple) {
    var match = multiple ? [] : undefined;

    element.some(function(obj) {
      var all_match = true;

      for (var prop in props) {
        if (!(prop in obj) || obj[prop] !== props[prop]) {
          all_match = false;
        }
      }

      if (all_match) {
        if (multiple) {
          match.push(obj);
        } else {
          match = obj;
          return true;
        }
      }
    });

    return match;
  };

  var _ = function(element) {
    u = {
      // _.first
      first: function() {
        return element[0];
      },
      // _.last
      last: function() {
        return element[element.length - 1];
      },
      // _.without
      without: function() {
        var new_arr = [],
            args = Array.prototype.slice.call(arguments);

        element.forEach(function(el) {
          if (args.indexOf(el) === -1) {
            new_arr.push(el);
          }
        });

        return new_arr;
      },
      // _.lastIndexOf
      lastIndexOf: function(search) {
        var idx = -1;

        for (var i = element.length - 1; i >= 0; i--) {
          if (element[i] === search) {
            idx = i;
            break;
          }
        }
        return idx;
      },
      // _.sample
      sample: function(qty) {
        var sampled = [],
            copy = element.slice(),
            get = function() {
              var idx = Math.floor(Math.random() * copy.length),
                  el = copy[idx];
              copy.splice(idx, 1);
              return el;
            };

        if (!qty) { return get(); }
        while(qty) {
          sampled.push(get());
          qty--;
        }

        return sampled;
      },
      // _.findWhere
      findWhere: function(props) {
        return findObjs(element, props, false);
      },
      // _.where
      where: function(props) {
        return findObjs(element, props, true);
      },
      // _.pluck
      pluck: function(query) {
        return element.map(function(obj) {
          if (obj[query]) { return obj[query]; }
        });
      }
    };

    return u;
  };

  // _.range
  _.range = function(start, stop) {
    var range = [];
    if (stop === undefined) {
      stop = start;
      start = 0;
    }

    for (var i = start; i < stop; i++) {
      range.push(i);
    }

    return range;
  };

  window._ = _;
})();
