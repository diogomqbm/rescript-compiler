'use strict';

var Caml_exceptions = require("../../lib/js/caml_exceptions.js");

function insert(queue, prio, elt) {
  if (typeof queue !== "object") {
    return {
            TAG: "Node",
            _0: prio,
            _1: elt,
            _2: "Empty",
            _3: "Empty"
          };
  }
  var right = queue._3;
  var left = queue._2;
  var e = queue._1;
  var p = queue._0;
  if (prio <= p) {
    return {
            TAG: "Node",
            _0: prio,
            _1: elt,
            _2: insert(right, p, e),
            _3: left
          };
  } else {
    return {
            TAG: "Node",
            _0: p,
            _1: e,
            _2: insert(right, prio, elt),
            _3: left
          };
  }
}

var Queue_is_empty = /* @__PURE__ */Caml_exceptions.create("Pq_test.PrioQueue.Queue_is_empty");

function remove_top(x) {
  if (typeof x !== "object") {
    throw {
          RE_EXN_ID: Queue_is_empty,
          Error: new Error()
        };
  }
  var left = x._2;
  var tmp = x._3;
  if (typeof tmp !== "object") {
    return left;
  }
  if (typeof left !== "object") {
    return x._3;
  }
  var right = x._3;
  var rprio = right._0;
  var lprio = left._0;
  if (lprio <= rprio) {
    return {
            TAG: "Node",
            _0: lprio,
            _1: left._1,
            _2: remove_top(left),
            _3: right
          };
  } else {
    return {
            TAG: "Node",
            _0: rprio,
            _1: right._1,
            _2: left,
            _3: remove_top(right)
          };
  }
}

function extract(x) {
  if (typeof x === "object") {
    return [
            x._0,
            x._1,
            remove_top(x)
          ];
  }
  throw {
        RE_EXN_ID: Queue_is_empty,
        Error: new Error()
      };
}

var PrioQueue = {
  empty: "Empty",
  insert: insert,
  Queue_is_empty: Queue_is_empty,
  remove_top: remove_top,
  extract: extract
};

exports.PrioQueue = PrioQueue;
/* No side effect */
