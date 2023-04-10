'use strict';


function map(f, x) {
  if (!x) {
    return /* [] */0;
  }
  var r = f(x.hd);
  return {
          hd: r,
          tl: map(f, x.tl)
        };
}

exports.map = map;
/* No side effect */
