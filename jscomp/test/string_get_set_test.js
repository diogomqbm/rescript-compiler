'use strict';

var Mt = require("./mt.js");
var Caml_string = require("../../lib/js/caml_string.js");

Mt.from_pair_suites("string_get_set_test.res", {
      hd: [
        "File \"string_get_set_test.res\", line 4, characters 36-43",
        (function (param) {
            return {
                    TAG: "Eq",
                    _0: Caml_string.get("h", 0),
                    _1: /* 'h' */104
                  };
          })
      ],
      tl: /* [] */0
    });

/*  Not a pure module */
