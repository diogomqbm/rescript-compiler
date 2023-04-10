'use strict';

var Caml_obj = require("../../lib/js/caml_obj.js");
var Caml_option = require("../../lib/js/caml_option.js");

if (!Caml_obj.equal(Caml_option.nullable_to_opt(""), "")) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "gpr_974_test.res",
          2,
          2
        ],
        Error: new Error()
      };
}

if (!Caml_obj.equal(Caml_option.undefined_to_opt(""), "")) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "gpr_974_test.res",
          3,
          2
        ],
        Error: new Error()
      };
}

if (!Caml_obj.equal(Caml_option.null_to_opt(""), "")) {
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "gpr_974_test.res",
          4,
          2
        ],
        Error: new Error()
      };
}

/*  Not a pure module */
