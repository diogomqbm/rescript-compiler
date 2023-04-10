'use strict';

var Mt = require("./mt.js");
var Curry = require("../../lib/js/curry.js");
var Caml_module = require("../../lib/js/caml_module.js");

var suites = {
  contents: /* [] */0
};

var test_id = {
  contents: 0
};

function eq(loc, x, y) {
  test_id.contents = test_id.contents + 1 | 0;
  suites.contents = {
    hd: [
      loc + (" id " + String(test_id.contents)),
      (function (param) {
          return {
                  TAG: "Eq",
                  _0: x,
                  _1: y
                };
        })
    ],
    tl: suites.contents
  };
}

function add(suite) {
  suites.contents = {
    hd: suite,
    tl: suites.contents
  };
}

var Int3 = Caml_module.init_mod([
      "recursive_module_test.res",
      12,
      4
    ], {
      TAG: "Module",
      _0: [[
          "Function",
          "u"
        ]]
    });

Caml_module.update_mod({
      TAG: "Module",
      _0: [[
          "Function",
          "u"
        ]]
    }, Int3, Int3);

function fact(n) {
  if (n <= 1) {
    return 1;
  } else {
    return Math.imul(n, Curry._1(M.fact, n - 1 | 0));
  }
}

var M = {
  fact: fact
};

var fact$1 = M.fact;

var Fact = {
  M: M,
  fact: fact$1
};

eq("File \"recursive_module_test.res\", line 29, characters 12-19", 120, Curry._1(fact$1, 5));

add([
      "File \"recursive_module_test.res\", line 31, characters 14-21",
      (function (param) {
          return {
                  TAG: "ThrowAny",
                  _0: (function (param) {
                      Curry._1(Int3.u, 3);
                    })
                };
        })
    ]);

Mt.from_pair_suites("Recursive_module_test", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.add = add;
exports.Int3 = Int3;
exports.Fact = Fact;
/* Int3 Not a pure module */
