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
        var args = Array.prototype.slice.call(arguments);

        return element.map(function(el){
          if (args.indexOf(el) === -1) { return el; }
        });
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
      },
      // _.keys
      keys: function() {
        var keys = [];

        for (var prop in element) {
          keys.push(prop);
        }
        return keys;
      },
      // _.values
      values: function() {
        var vals = [];

        for (var prop in element) {
          vals.push(element[prop]);
        }
        return vals;
      },
      // _.pick
      pick: function() {
        var args = Array.prototype.slice.call(arguments),
            new_obj = {};

        args.forEach(function(prop) {
          if (prop in element) {
            new_obj[prop] = element[prop];
          }
        });

        return new_obj;
      },
      omit: function() {
        var args = Array.prototype.slice.call(arguments),
            new_obj = {};
        args.forEach(function(prop) {
          if (!(prop in element)) {
            new_obj[prop] = element[prop];
          }
        });

        return new_obj;
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

  // _.extend
  _.extend = function() {
    var args = Array.prototype.slice.call(arguments),
        old_obj = args.pop(),
        new_obj = args[args.length - 1];

    for (var prop in old_obj) {
      new_obj[prop] = old_obj[prop];
    }

    return args.length === 1 ? new_obj : _.extend.apply(_, args);
  };

  window._ = _;
})();
