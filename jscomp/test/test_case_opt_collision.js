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

function f(xOpt, y) {
  var x = xOpt !== undefined ? xOpt : 3;
  var xOpt$1 = x + 2 | 0;
  console.log(xOpt$1);
  return xOpt$1 + y | 0;
}

console.log(f(undefined, 2));

eq("File \"test_case_opt_collision.res\", line 13, characters 3-10", f(undefined, 2), 7);

eq("File \"test_case_opt_collision.res\", line 15, characters 3-10", f(4, 2), 8);

Mt.from_pair_suites("test_case_opt_collision.res", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.f = f;
/*  Not a pure module */
