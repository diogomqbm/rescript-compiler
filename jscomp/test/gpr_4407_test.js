'use strict';

var Mt = require("./mt.js");
var Debug_mode_value = require("./debug_mode_value.js");

var suites = {
  contents: /* [] */0
};

var test_id = {
  contents: 0
};

function eq(loc, x, y) {
  Mt.eq_suites(test_id, suites, loc, x, y);
}

var non_debug_u = {
  TAG: "A",
  _0: 1,
  _1: 2
};

eq("File \"gpr_4407_test.res\", line 7, characters 3-10", Debug_mode_value.u, non_debug_u);

Mt.from_pair_suites("File \"gpr_4407_test.res\", line 8, characters 20-27", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.non_debug_u = non_debug_u;
/*  Not a pure module */
