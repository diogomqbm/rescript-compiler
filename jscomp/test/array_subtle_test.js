'use strict';

var Mt = require("./mt.js");
var Caml_array = require("../../lib/js/caml_array.js");

var suites = {
  contents: /* [] */0
};

var test_id = {
  contents: 0
};

function eq(loc, param) {
  var y = param[1];
  var x = param[0];
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

var v = [
  1,
  2,
  3,
  3
];

eq("File \"array_subtle_test.res\", line 11, characters 12-19", [
      4,
      v.length
    ]);

eq("File \"array_subtle_test.res\", line 14, characters 5-12", [
      5,
      v.push(3)
    ]);

eq("File \"array_subtle_test.res\", line 15, characters 5-12", [
      5,
      v.length
    ]);

eq("File \"array_subtle_test.res\", line 16, characters 5-12", [
      5,
      v.length
    ]);

eq("File \"array_subtle_test.res\", line 20, characters 5-12", [
      3,
      Caml_array.get(v, 2)
    ]);

Caml_array.set(v, 2, 4);

eq("File \"array_subtle_test.res\", line 22, characters 5-12", [
      4,
      Caml_array.get(v, 2)
    ]);

while(v.length > 0) {
  v.pop();
};

eq("File \"array_subtle_test.res\", line 29, characters 5-12", [
      0,
      v.length
    ]);

function f(v) {
  var x = v.pop();
  if (x !== undefined) {
    console.log("hi");
  } else {
    console.log("hi2");
  }
  console.log((v.pop(), undefined));
}

function fff(x) {
  return true;
}

function fff2(x) {
  if (x.length >= 10) {
    console.log("hi");
    return ;
  }
  
}

function fff3(x) {
  return 1;
}

function fff4(x) {
  if (x.length !== 0) {
    return 1;
  } else {
    return 2;
  }
}

eq("File \"array_subtle_test.res\", line 61, characters 3-10", [
      fff3([]),
      1
    ]);

eq("File \"array_subtle_test.res\", line 62, characters 3-10", [
      fff4([]),
      2
    ]);

eq("File \"array_subtle_test.res\", line 63, characters 3-10", [
      fff4([1]),
      1
    ]);

Mt.from_pair_suites("Array_subtle_test", suites.contents);

exports.suites = suites;
exports.test_id = test_id;
exports.eq = eq;
exports.v = v;
exports.f = f;
exports.fff = fff;
exports.fff2 = fff2;
exports.fff3 = fff3;
exports.fff4 = fff4;
/*  Not a pure module */
