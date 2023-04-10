'use strict';

var Mt = require("./mt.js");

var suites = {
  contents: /* [] */0
};

var test_id = {
  contents: 0
};

function showToJs(x) {
  if (typeof x !== "object" && x === "No") {
    return false;
  } else {
    return true;
  }
}

Mt.eq_suites(test_id, suites, "File \"gpr_4900_test.res\", line 13, characters 29-36", true, true);

Mt.eq_suites(test_id, suites, "File \"gpr_4900_test.res\", line 14, characters 29-36", false, false);

Mt.eq_suites(test_id, suites, "File \"gpr_4900_test.res\", line 15, characters 29-36", true, true);

Mt.from_pair_suites("File \"gpr_4900_test.res\", line 17, characters 17-24", suites.contents);

var from_pair_suites = Mt.from_pair_suites;

var eq_suites = Mt.eq_suites;

exports.from_pair_suites = from_pair_suites;
exports.eq_suites = eq_suites;
exports.suites = suites;
exports.test_id = test_id;
exports.showToJs = showToJs;
/*  Not a pure module */
