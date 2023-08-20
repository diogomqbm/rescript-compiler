// Generated by ReScript, PLEASE EDIT WITH CARE

import * as List from "rescript/lib/es6/list.js";
import * as Curry from "rescript/lib/es6/curry.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";

function swap(tree) {
  return {
          label: tree.label,
          left: Belt_Option.map(tree.right, swap),
          right: Belt_Option.map(tree.left, swap)
        };
}

function selfRecursiveConverter(param) {
  return param.self;
}

function mutuallyRecursiveConverter(param) {
  return param.b;
}

function testFunctionOnOptionsAsArgument(a, foo) {
  return Curry._1(foo, a);
}

function jsonStringify(prim) {
  return JSON.stringify(prim);
}

function testConvertNull(x) {
  return x;
}

function testConvertLocation(x) {
  return x;
}

var testMarshalFields = {
  _rec: "rec",
  _switch: "_switch",
  switch: "switch",
  __: "__",
  ___: "_",
  foo__: "foo",
  _foo__: "_foo",
  _Uppercase: "Uppercase",
  _Uppercase__: "_Uppercase"
};

function setMatch(x) {
  x._match = 34;
}

function testInstantiateTypeParameter(x) {
  return x;
}

var currentTime = new Date();

var optFunction = (function (param) {
    return 3;
  });

var ObjectId = {};

var someIntList = {
  hd: 1,
  tl: {
    hd: 2,
    tl: {
      hd: 3,
      tl: /* [] */0
    }
  }
};

var map = List.map;

var stringT = "a";

var jsStringT = "a";

var jsString2T = "a";

var i64Const = [
  0,
  34
];

export {
  someIntList ,
  map ,
  swap ,
  selfRecursiveConverter ,
  mutuallyRecursiveConverter ,
  testFunctionOnOptionsAsArgument ,
  stringT ,
  jsStringT ,
  jsString2T ,
  jsonStringify ,
  testConvertNull ,
  testConvertLocation ,
  testMarshalFields ,
  setMatch ,
  testInstantiateTypeParameter ,
  currentTime ,
  i64Const ,
  optFunction ,
  ObjectId ,
}
/* currentTime Not a pure module */
