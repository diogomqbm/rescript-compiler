'use strict';

var Caml_string = require("../../lib/js/caml_string.js");

var a10 = "hello world";

var a20 = a10 + "not";

var v = Caml_string.get(a20, 0) === /* 'h' */104 ? 1 : 2;

var a21 = a20 + a20;

var a22 = "test " + (a21 + "hello");

function ff(param) {
  return "cool " + a22;
}

var a23 = ff(undefined);

var a15 = a10;

var b15 = 111;

exports.a15 = a15;
exports.b15 = b15;
exports.a21 = a21;
exports.v = v;
exports.a23 = a23;
exports.ff = ff;
/* a23 Not a pure module */
