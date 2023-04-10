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

function nextFor(x) {
  if (x !== undefined) {
    if (x === "Required") {
      return "Optional";
    } else {
      return ;
    }
  } else {
    return "Required";
  }
}

eq("File \"gpr_4519_test.res\", line 16, characters 3-10", nextFor("Required"), "Optional");

Mt.from_pair_suites("Gpr_4519_test", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.nextFor = nextFor;
/*  Not a pure module */
