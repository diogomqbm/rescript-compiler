'use strict';

var Mt = require("./mt.js");

var suites = {
  contents: /* [] */0
};

var test_id = {
  contents: 0
};

function eq(loc, x, y) {
  Mt.eq_suites(test_id, suites, loc, x, y);
}

var x = ({
    x: 3,
    y: 4
  }).x;

var zz = ({
    "5": 3
  })[5];

var h = {
  "0123": 2,
  "123_456": 3
};

function f(id) {
  while(false) {
    
  };
  return id;
}

eq("File \"gpr_1946_test.res\", line 24, characters 3-10", ({
        "5": 3
      })[5], 3);

eq("File \"gpr_1946_test.res\", line 25, characters 3-10", [
      2,
      3
    ], [
      f(h)["0123"],
      f(h)["123_456"]
    ]);

console.log(({
          "5": 3
        }).TAG);

Mt.from_pair_suites("File \"gpr_1946_test.res\", line 28, characters 20-27", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.x = x;
exports.zz = zz;
exports.h = h;
exports.f = f;
/* x Not a pure module */
