'use strict';

var Mt = require("./mt.js");
var Caml = require("../../lib/js/caml.js");
var List = require("../../lib/js/list.js");
var Curry = require("../../lib/js/curry.js");
var Caml_option = require("../../lib/js/caml_option.js");

function Make(Ord) {
  var height = function (x) {
    if (typeof x !== "object") {
      return 0;
    } else {
      return x._4;
    }
  };
  var create = function (l, x, d, r) {
    var hl = height(l);
    var hr = height(r);
    return {
            TAG: "Node",
            _0: l,
            _1: x,
            _2: d,
            _3: r,
            _4: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          };
  };
  var singleton = function (x, d) {
    return {
            TAG: "Node",
            _0: "Empty",
            _1: x,
            _2: d,
            _3: "Empty",
            _4: 1
          };
  };
  var bal = function (l, x, d, r) {
    var hl;
    hl = typeof l !== "object" ? 0 : l._4;
    var hr;
    hr = typeof r !== "object" ? 0 : r._4;
    if (hl > (hr + 2 | 0)) {
      if (typeof l !== "object") {
        throw {
              RE_EXN_ID: "Invalid_argument",
              _1: "Map.bal",
              Error: new Error()
            };
      }
      var lr = l._3;
      var ld = l._2;
      var lv = l._1;
      var ll = l._0;
      if (height(ll) >= height(lr)) {
        return create(ll, lv, ld, create(lr, x, d, r));
      }
      if (typeof lr === "object") {
        return create(create(ll, lv, ld, lr._0), lr._1, lr._2, create(lr._3, x, d, r));
      }
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Map.bal",
            Error: new Error()
          };
    }
    if (hr <= (hl + 2 | 0)) {
      return {
              TAG: "Node",
              _0: l,
              _1: x,
              _2: d,
              _3: r,
              _4: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
            };
    }
    if (typeof r !== "object") {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Map.bal",
            Error: new Error()
          };
    }
    var rr = r._3;
    var rd = r._2;
    var rv = r._1;
    var rl = r._0;
    if (height(rr) >= height(rl)) {
      return create(create(l, x, d, rl), rv, rd, rr);
    }
    if (typeof rl === "object") {
      return create(create(l, x, d, rl._0), rl._1, rl._2, create(rl._3, rv, rd, rr));
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Map.bal",
          Error: new Error()
        };
  };
  var is_empty = function (x) {
    if (typeof x !== "object") {
      return true;
    } else {
      return false;
    }
  };
  var add = function (x, data, x_) {
    if (typeof x_ !== "object") {
      return {
              TAG: "Node",
              _0: "Empty",
              _1: x,
              _2: data,
              _3: "Empty",
              _4: 1
            };
    }
    var r = x_._3;
    var d = x_._2;
    var v = x_._1;
    var l = x_._0;
    var c = Curry._2(Ord.compare, x, v);
    if (c === 0) {
      return {
              TAG: "Node",
              _0: l,
              _1: x,
              _2: data,
              _3: r,
              _4: x_._4
            };
    } else if (c < 0) {
      return bal(add(x, data, l), v, d, r);
    } else {
      return bal(l, v, d, add(x, data, r));
    }
  };
  var find = function (x, _x_) {
    while(true) {
      var x_ = _x_;
      if (typeof x_ !== "object") {
        throw {
              RE_EXN_ID: "Not_found",
              Error: new Error()
            };
      }
      var c = Curry._2(Ord.compare, x, x_._1);
      if (c === 0) {
        return x_._2;
      }
      _x_ = c < 0 ? x_._0 : x_._3;
      continue ;
    };
  };
  var mem = function (x, _x_) {
    while(true) {
      var x_ = _x_;
      if (typeof x_ !== "object") {
        return false;
      }
      var c = Curry._2(Ord.compare, x, x_._1);
      if (c === 0) {
        return true;
      }
      _x_ = c < 0 ? x_._0 : x_._3;
      continue ;
    };
  };
  var min_binding = function (_x) {
    while(true) {
      var x = _x;
      if (typeof x !== "object") {
        throw {
              RE_EXN_ID: "Not_found",
              Error: new Error()
            };
      }
      var l = x._0;
      if (typeof l !== "object") {
        return [
                x._1,
                x._2
              ];
      }
      _x = l;
      continue ;
    };
  };
  var max_binding = function (_x) {
    while(true) {
      var x = _x;
      if (typeof x !== "object") {
        throw {
              RE_EXN_ID: "Not_found",
              Error: new Error()
            };
      }
      var r = x._3;
      if (typeof r !== "object") {
        return [
                x._1,
                x._2
              ];
      }
      _x = r;
      continue ;
    };
  };
  var remove_min_binding = function (x) {
    if (typeof x !== "object") {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Map.remove_min_elt",
            Error: new Error()
          };
    }
    var l = x._0;
    if (typeof l !== "object") {
      return x._3;
    } else {
      return bal(remove_min_binding(l), x._1, x._2, x._3);
    }
  };
  var remove = function (x, x_) {
    if (typeof x_ !== "object") {
      return "Empty";
    }
    var r = x_._3;
    var d = x_._2;
    var v = x_._1;
    var l = x_._0;
    var c = Curry._2(Ord.compare, x, v);
    if (c === 0) {
      if (typeof l !== "object") {
        return r;
      }
      if (typeof r !== "object") {
        return l;
      }
      var match = min_binding(r);
      return bal(l, match[0], match[1], remove_min_binding(r));
    } else if (c < 0) {
      return bal(remove(x, l), v, d, r);
    } else {
      return bal(l, v, d, remove(x, r));
    }
  };
  var iter = function (f, _x) {
    while(true) {
      var x = _x;
      if (typeof x !== "object") {
        return ;
      }
      iter(f, x._0);
      Curry._2(f, x._1, x._2);
      _x = x._3;
      continue ;
    };
  };
  var map = function (f, x) {
    if (typeof x !== "object") {
      return "Empty";
    }
    var l$p = map(f, x._0);
    var d$p = Curry._1(f, x._2);
    var r$p = map(f, x._3);
    return {
            TAG: "Node",
            _0: l$p,
            _1: x._1,
            _2: d$p,
            _3: r$p,
            _4: x._4
          };
  };
  var mapi = function (f, x) {
    if (typeof x !== "object") {
      return "Empty";
    }
    var v = x._1;
    var l$p = mapi(f, x._0);
    var d$p = Curry._2(f, v, x._2);
    var r$p = mapi(f, x._3);
    return {
            TAG: "Node",
            _0: l$p,
            _1: v,
            _2: d$p,
            _3: r$p,
            _4: x._4
          };
  };
  var fold = function (f, _m, _accu) {
    while(true) {
      var accu = _accu;
      var m = _m;
      if (typeof m !== "object") {
        return accu;
      }
      _accu = Curry._3(f, m._1, m._2, fold(f, m._0, accu));
      _m = m._3;
      continue ;
    };
  };
  var for_all = function (p, _x) {
    while(true) {
      var x = _x;
      if (typeof x !== "object") {
        return true;
      }
      if (!Curry._2(p, x._1, x._2)) {
        return false;
      }
      if (!for_all(p, x._0)) {
        return false;
      }
      _x = x._3;
      continue ;
    };
  };
  var exists = function (p, _x) {
    while(true) {
      var x = _x;
      if (typeof x !== "object") {
        return false;
      }
      if (Curry._2(p, x._1, x._2)) {
        return true;
      }
      if (exists(p, x._0)) {
        return true;
      }
      _x = x._3;
      continue ;
    };
  };
  var add_min_binding = function (k, v, x) {
    if (typeof x !== "object") {
      return singleton(k, v);
    } else {
      return bal(add_min_binding(k, v, x._0), x._1, x._2, x._3);
    }
  };
  var add_max_binding = function (k, v, x) {
    if (typeof x !== "object") {
      return singleton(k, v);
    } else {
      return bal(x._0, x._1, x._2, add_max_binding(k, v, x._3));
    }
  };
  var join = function (l, v, d, r) {
    if (typeof l !== "object") {
      return add_min_binding(v, d, r);
    }
    var lh = l._4;
    if (typeof r !== "object") {
      return add_max_binding(v, d, l);
    }
    var rh = r._4;
    if (lh > (rh + 2 | 0)) {
      return bal(l._0, l._1, l._2, join(l._3, v, d, r));
    } else if (rh > (lh + 2 | 0)) {
      return bal(join(l, v, d, r._0), r._1, r._2, r._3);
    } else {
      return create(l, v, d, r);
    }
  };
  var concat = function (t1, t2) {
    if (typeof t1 !== "object") {
      return t2;
    }
    if (typeof t2 !== "object") {
      return t1;
    }
    var match = min_binding(t2);
    return join(t1, match[0], match[1], remove_min_binding(t2));
  };
  var concat_or_join = function (t1, v, d, t2) {
    if (d !== undefined) {
      return join(t1, v, Caml_option.valFromOption(d), t2);
    } else {
      return concat(t1, t2);
    }
  };
  var split = function (x, x_) {
    if (typeof x_ !== "object") {
      return [
              "Empty",
              undefined,
              "Empty"
            ];
    }
    var r = x_._3;
    var d = x_._2;
    var v = x_._1;
    var l = x_._0;
    var c = Curry._2(Ord.compare, x, v);
    if (c === 0) {
      return [
              l,
              Caml_option.some(d),
              r
            ];
    }
    if (c < 0) {
      var match = split(x, l);
      return [
              match[0],
              match[1],
              join(match[2], v, d, r)
            ];
    }
    var match$1 = split(x, r);
    return [
            join(l, v, d, match$1[0]),
            match$1[1],
            match$1[2]
          ];
  };
  var merge = function (f, s1, s2) {
    if (typeof s1 !== "object") {
      if (typeof s2 !== "object") {
        return "Empty";
      }
      
    } else {
      var v1 = s1._1;
      if (s1._4 >= height(s2)) {
        var match = split(v1, s2);
        return concat_or_join(merge(f, s1._0, match[0]), v1, Curry._3(f, v1, Caml_option.some(s1._2), match[1]), merge(f, s1._3, match[2]));
      }
      
    }
    if (typeof s2 !== "object") {
      throw {
            RE_EXN_ID: "Assert_failure",
            _1: [
              "inline_map2_test.res",
              359,
              11
            ],
            Error: new Error()
          };
    }
    var v2 = s2._1;
    var match$1 = split(v2, s1);
    return concat_or_join(merge(f, match$1[0], s2._0), v2, Curry._3(f, v2, match$1[1], Caml_option.some(s2._2)), merge(f, match$1[2], s2._3));
  };
  var filter = function (p, x) {
    if (typeof x !== "object") {
      return "Empty";
    }
    var d = x._2;
    var v = x._1;
    var l$p = filter(p, x._0);
    var pvd = Curry._2(p, v, d);
    var r$p = filter(p, x._3);
    if (pvd) {
      return join(l$p, v, d, r$p);
    } else {
      return concat(l$p, r$p);
    }
  };
  var partition = function (p, x) {
    if (typeof x !== "object") {
      return [
              "Empty",
              "Empty"
            ];
    }
    var d = x._2;
    var v = x._1;
    var match = partition(p, x._0);
    var lf = match[1];
    var lt = match[0];
    var pvd = Curry._2(p, v, d);
    var match$1 = partition(p, x._3);
    var rf = match$1[1];
    var rt = match$1[0];
    if (pvd) {
      return [
              join(lt, v, d, rt),
              concat(lf, rf)
            ];
    } else {
      return [
              concat(lt, rt),
              join(lf, v, d, rf)
            ];
    }
  };
  var cons_enum = function (_m, _e) {
    while(true) {
      var e = _e;
      var m = _m;
      if (typeof m !== "object") {
        return e;
      }
      _e = {
        TAG: "More",
        _0: m._1,
        _1: m._2,
        _2: m._3,
        _3: e
      };
      _m = m._0;
      continue ;
    };
  };
  var compare = function (cmp, m1, m2) {
    var _e1 = cons_enum(m1, "End");
    var _e2 = cons_enum(m2, "End");
    while(true) {
      var e2 = _e2;
      var e1 = _e1;
      if (typeof e1 !== "object") {
        if (typeof e2 !== "object") {
          return 0;
        } else {
          return -1;
        }
      }
      if (typeof e2 !== "object") {
        return 1;
      }
      var c = Curry._2(Ord.compare, e1._0, e2._0);
      if (c !== 0) {
        return c;
      }
      var c$1 = Curry._2(cmp, e1._1, e2._1);
      if (c$1 !== 0) {
        return c$1;
      }
      _e2 = cons_enum(e2._2, e2._3);
      _e1 = cons_enum(e1._2, e1._3);
      continue ;
    };
  };
  var equal = function (cmp, m1, m2) {
    var _e1 = cons_enum(m1, "End");
    var _e2 = cons_enum(m2, "End");
    while(true) {
      var e2 = _e2;
      var e1 = _e1;
      if (typeof e1 !== "object") {
        if (typeof e2 !== "object") {
          return true;
        } else {
          return false;
        }
      }
      if (typeof e2 !== "object") {
        return false;
      }
      if (Curry._2(Ord.compare, e1._0, e2._0) !== 0) {
        return false;
      }
      if (!Curry._2(cmp, e1._1, e2._1)) {
        return false;
      }
      _e2 = cons_enum(e2._2, e2._3);
      _e1 = cons_enum(e1._2, e1._3);
      continue ;
    };
  };
  var cardinal = function (x) {
    if (typeof x !== "object") {
      return 0;
    } else {
      return (cardinal(x._0) + 1 | 0) + cardinal(x._3) | 0;
    }
  };
  var bindings_aux = function (_accu, _x) {
    while(true) {
      var x = _x;
      var accu = _accu;
      if (typeof x !== "object") {
        return accu;
      }
      _x = x._0;
      _accu = {
        hd: [
          x._1,
          x._2
        ],
        tl: bindings_aux(accu, x._3)
      };
      continue ;
    };
  };
  var bindings = function (s) {
    return bindings_aux(/* [] */0, s);
  };
  return {
          height: height,
          create: create,
          singleton: singleton,
          bal: bal,
          empty: "Empty",
          is_empty: is_empty,
          add: add,
          find: find,
          mem: mem,
          min_binding: min_binding,
          max_binding: max_binding,
          remove_min_binding: remove_min_binding,
          remove: remove,
          iter: iter,
          map: map,
          mapi: mapi,
          fold: fold,
          for_all: for_all,
          exists: exists,
          add_min_binding: add_min_binding,
          add_max_binding: add_max_binding,
          join: join,
          concat: concat,
          concat_or_join: concat_or_join,
          split: split,
          merge: merge,
          filter: filter,
          partition: partition,
          cons_enum: cons_enum,
          compare: compare,
          equal: equal,
          cardinal: cardinal,
          bindings_aux: bindings_aux,
          bindings: bindings,
          choose: min_binding
        };
}

function height(x) {
  if (typeof x !== "object") {
    return 0;
  } else {
    return x._4;
  }
}

function create(l, x, d, r) {
  var hl = height(l);
  var hr = height(r);
  return {
          TAG: "Node",
          _0: l,
          _1: x,
          _2: d,
          _3: r,
          _4: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
        };
}

function singleton(x, d) {
  return {
          TAG: "Node",
          _0: "Empty",
          _1: x,
          _2: d,
          _3: "Empty",
          _4: 1
        };
}

function bal(l, x, d, r) {
  var hl;
  hl = typeof l !== "object" ? 0 : l._4;
  var hr;
  hr = typeof r !== "object" ? 0 : r._4;
  if (hl > (hr + 2 | 0)) {
    if (typeof l !== "object") {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Map.bal",
            Error: new Error()
          };
    }
    var lr = l._3;
    var ld = l._2;
    var lv = l._1;
    var ll = l._0;
    if (height(ll) >= height(lr)) {
      return create(ll, lv, ld, create(lr, x, d, r));
    }
    if (typeof lr === "object") {
      return create(create(ll, lv, ld, lr._0), lr._1, lr._2, create(lr._3, x, d, r));
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Map.bal",
          Error: new Error()
        };
  }
  if (hr <= (hl + 2 | 0)) {
    return {
            TAG: "Node",
            _0: l,
            _1: x,
            _2: d,
            _3: r,
            _4: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          };
  }
  if (typeof r !== "object") {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Map.bal",
          Error: new Error()
        };
  }
  var rr = r._3;
  var rd = r._2;
  var rv = r._1;
  var rl = r._0;
  if (height(rr) >= height(rl)) {
    return create(create(l, x, d, rl), rv, rd, rr);
  }
  if (typeof rl === "object") {
    return create(create(l, x, d, rl._0), rl._1, rl._2, create(rl._3, rv, rd, rr));
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "Map.bal",
        Error: new Error()
      };
}

function is_empty(x) {
  if (typeof x !== "object") {
    return true;
  } else {
    return false;
  }
}

function add(x, data, x_) {
  if (typeof x_ !== "object") {
    return {
            TAG: "Node",
            _0: "Empty",
            _1: x,
            _2: data,
            _3: "Empty",
            _4: 1
          };
  }
  var r = x_._3;
  var d = x_._2;
  var v = x_._1;
  var l = x_._0;
  var c = Caml.int_compare(x, v);
  if (c === 0) {
    return {
            TAG: "Node",
            _0: l,
            _1: x,
            _2: data,
            _3: r,
            _4: x_._4
          };
  } else if (c < 0) {
    return bal(add(x, data, l), v, d, r);
  } else {
    return bal(l, v, d, add(x, data, r));
  }
}

function find(x, _x_) {
  while(true) {
    var x_ = _x_;
    if (typeof x_ !== "object") {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }
    var c = Caml.int_compare(x, x_._1);
    if (c === 0) {
      return x_._2;
    }
    _x_ = c < 0 ? x_._0 : x_._3;
    continue ;
  };
}

function mem(x, _x_) {
  while(true) {
    var x_ = _x_;
    if (typeof x_ !== "object") {
      return false;
    }
    var c = Caml.int_compare(x, x_._1);
    if (c === 0) {
      return true;
    }
    _x_ = c < 0 ? x_._0 : x_._3;
    continue ;
  };
}

function min_binding(_x) {
  while(true) {
    var x = _x;
    if (typeof x !== "object") {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }
    var l = x._0;
    if (typeof l !== "object") {
      return [
              x._1,
              x._2
            ];
    }
    _x = l;
    continue ;
  };
}

function max_binding(_x) {
  while(true) {
    var x = _x;
    if (typeof x !== "object") {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }
    var r = x._3;
    if (typeof r !== "object") {
      return [
              x._1,
              x._2
            ];
    }
    _x = r;
    continue ;
  };
}

function remove_min_binding(x) {
  if (typeof x !== "object") {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Map.remove_min_elt",
          Error: new Error()
        };
  }
  var l = x._0;
  if (typeof l !== "object") {
    return x._3;
  } else {
    return bal(remove_min_binding(l), x._1, x._2, x._3);
  }
}

function remove(x, x_) {
  if (typeof x_ !== "object") {
    return "Empty";
  }
  var r = x_._3;
  var d = x_._2;
  var v = x_._1;
  var l = x_._0;
  var c = Caml.int_compare(x, v);
  if (c === 0) {
    if (typeof l !== "object") {
      return r;
    }
    if (typeof r !== "object") {
      return l;
    }
    var match = min_binding(r);
    return bal(l, match[0], match[1], remove_min_binding(r));
  } else if (c < 0) {
    return bal(remove(x, l), v, d, r);
  } else {
    return bal(l, v, d, remove(x, r));
  }
}

function iter(f, _x) {
  while(true) {
    var x = _x;
    if (typeof x !== "object") {
      return ;
    }
    iter(f, x._0);
    Curry._2(f, x._1, x._2);
    _x = x._3;
    continue ;
  };
}

function map(f, x) {
  if (typeof x !== "object") {
    return "Empty";
  }
  var l$p = map(f, x._0);
  var d$p = Curry._1(f, x._2);
  var r$p = map(f, x._3);
  return {
          TAG: "Node",
          _0: l$p,
          _1: x._1,
          _2: d$p,
          _3: r$p,
          _4: x._4
        };
}

function mapi(f, x) {
  if (typeof x !== "object") {
    return "Empty";
  }
  var v = x._1;
  var l$p = mapi(f, x._0);
  var d$p = Curry._2(f, v, x._2);
  var r$p = mapi(f, x._3);
  return {
          TAG: "Node",
          _0: l$p,
          _1: v,
          _2: d$p,
          _3: r$p,
          _4: x._4
        };
}

function fold(f, _m, _accu) {
  while(true) {
    var accu = _accu;
    var m = _m;
    if (typeof m !== "object") {
      return accu;
    }
    _accu = Curry._3(f, m._1, m._2, fold(f, m._0, accu));
    _m = m._3;
    continue ;
  };
}

function for_all(p, _x) {
  while(true) {
    var x = _x;
    if (typeof x !== "object") {
      return true;
    }
    if (!Curry._2(p, x._1, x._2)) {
      return false;
    }
    if (!for_all(p, x._0)) {
      return false;
    }
    _x = x._3;
    continue ;
  };
}

function exists(p, _x) {
  while(true) {
    var x = _x;
    if (typeof x !== "object") {
      return false;
    }
    if (Curry._2(p, x._1, x._2)) {
      return true;
    }
    if (exists(p, x._0)) {
      return true;
    }
    _x = x._3;
    continue ;
  };
}

function add_min_binding(k, v, x) {
  if (typeof x !== "object") {
    return singleton(k, v);
  } else {
    return bal(add_min_binding(k, v, x._0), x._1, x._2, x._3);
  }
}

function add_max_binding(k, v, x) {
  if (typeof x !== "object") {
    return singleton(k, v);
  } else {
    return bal(x._0, x._1, x._2, add_max_binding(k, v, x._3));
  }
}

function join(l, v, d, r) {
  if (typeof l !== "object") {
    return add_min_binding(v, d, r);
  }
  var lh = l._4;
  if (typeof r !== "object") {
    return add_max_binding(v, d, l);
  }
  var rh = r._4;
  if (lh > (rh + 2 | 0)) {
    return bal(l._0, l._1, l._2, join(l._3, v, d, r));
  } else if (rh > (lh + 2 | 0)) {
    return bal(join(l, v, d, r._0), r._1, r._2, r._3);
  } else {
    return create(l, v, d, r);
  }
}

function concat(t1, t2) {
  if (typeof t1 !== "object") {
    return t2;
  }
  if (typeof t2 !== "object") {
    return t1;
  }
  var match = min_binding(t2);
  return join(t1, match[0], match[1], remove_min_binding(t2));
}

function concat_or_join(t1, v, d, t2) {
  if (d !== undefined) {
    return join(t1, v, Caml_option.valFromOption(d), t2);
  } else {
    return concat(t1, t2);
  }
}

function split(x, x_) {
  if (typeof x_ !== "object") {
    return [
            "Empty",
            undefined,
            "Empty"
          ];
  }
  var r = x_._3;
  var d = x_._2;
  var v = x_._1;
  var l = x_._0;
  var c = Caml.int_compare(x, v);
  if (c === 0) {
    return [
            l,
            Caml_option.some(d),
            r
          ];
  }
  if (c < 0) {
    var match = split(x, l);
    return [
            match[0],
            match[1],
            join(match[2], v, d, r)
          ];
  }
  var match$1 = split(x, r);
  return [
          join(l, v, d, match$1[0]),
          match$1[1],
          match$1[2]
        ];
}

function merge(f, s1, s2) {
  if (typeof s1 !== "object") {
    if (typeof s2 !== "object") {
      return "Empty";
    }
    
  } else {
    var v1 = s1._1;
    if (s1._4 >= height(s2)) {
      var match = split(v1, s2);
      return concat_or_join(merge(f, s1._0, match[0]), v1, Curry._3(f, v1, Caml_option.some(s1._2), match[1]), merge(f, s1._3, match[2]));
    }
    
  }
  if (typeof s2 !== "object") {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "inline_map2_test.res",
            359,
            11
          ],
          Error: new Error()
        };
  }
  var v2 = s2._1;
  var match$1 = split(v2, s1);
  return concat_or_join(merge(f, match$1[0], s2._0), v2, Curry._3(f, v2, match$1[1], Caml_option.some(s2._2)), merge(f, match$1[2], s2._3));
}

function filter(p, x) {
  if (typeof x !== "object") {
    return "Empty";
  }
  var d = x._2;
  var v = x._1;
  var l$p = filter(p, x._0);
  var pvd = Curry._2(p, v, d);
  var r$p = filter(p, x._3);
  if (pvd) {
    return join(l$p, v, d, r$p);
  } else {
    return concat(l$p, r$p);
  }
}

function partition(p, x) {
  if (typeof x !== "object") {
    return [
            "Empty",
            "Empty"
          ];
  }
  var d = x._2;
  var v = x._1;
  var match = partition(p, x._0);
  var lf = match[1];
  var lt = match[0];
  var pvd = Curry._2(p, v, d);
  var match$1 = partition(p, x._3);
  var rf = match$1[1];
  var rt = match$1[0];
  if (pvd) {
    return [
            join(lt, v, d, rt),
            concat(lf, rf)
          ];
  } else {
    return [
            concat(lt, rt),
            join(lf, v, d, rf)
          ];
  }
}

function cons_enum(_m, _e) {
  while(true) {
    var e = _e;
    var m = _m;
    if (typeof m !== "object") {
      return e;
    }
    _e = {
      TAG: "More",
      _0: m._1,
      _1: m._2,
      _2: m._3,
      _3: e
    };
    _m = m._0;
    continue ;
  };
}

function compare(cmp, m1, m2) {
  var _e1 = cons_enum(m1, "End");
  var _e2 = cons_enum(m2, "End");
  while(true) {
    var e2 = _e2;
    var e1 = _e1;
    if (typeof e1 !== "object") {
      if (typeof e2 !== "object") {
        return 0;
      } else {
        return -1;
      }
    }
    if (typeof e2 !== "object") {
      return 1;
    }
    var c = Caml.int_compare(e1._0, e2._0);
    if (c !== 0) {
      return c;
    }
    var c$1 = Curry._2(cmp, e1._1, e2._1);
    if (c$1 !== 0) {
      return c$1;
    }
    _e2 = cons_enum(e2._2, e2._3);
    _e1 = cons_enum(e1._2, e1._3);
    continue ;
  };
}

function equal(cmp, m1, m2) {
  var _e1 = cons_enum(m1, "End");
  var _e2 = cons_enum(m2, "End");
  while(true) {
    var e2 = _e2;
    var e1 = _e1;
    if (typeof e1 !== "object") {
      if (typeof e2 !== "object") {
        return true;
      } else {
        return false;
      }
    }
    if (typeof e2 !== "object") {
      return false;
    }
    if (e1._0 !== e2._0) {
      return false;
    }
    if (!Curry._2(cmp, e1._1, e2._1)) {
      return false;
    }
    _e2 = cons_enum(e2._2, e2._3);
    _e1 = cons_enum(e1._2, e1._3);
    continue ;
  };
}

function cardinal(x) {
  if (typeof x !== "object") {
    return 0;
  } else {
    return (cardinal(x._0) + 1 | 0) + cardinal(x._3) | 0;
  }
}

function bindings_aux(_accu, _x) {
  while(true) {
    var x = _x;
    var accu = _accu;
    if (typeof x !== "object") {
      return accu;
    }
    _x = x._0;
    _accu = {
      hd: [
        x._1,
        x._2
      ],
      tl: bindings_aux(accu, x._3)
    };
    continue ;
  };
}

function bindings(s) {
  return bindings_aux(/* [] */0, s);
}

var IntMap = {
  height: height,
  create: create,
  singleton: singleton,
  bal: bal,
  empty: "Empty",
  is_empty: is_empty,
  add: add,
  find: find,
  mem: mem,
  min_binding: min_binding,
  max_binding: max_binding,
  remove_min_binding: remove_min_binding,
  remove: remove,
  iter: iter,
  map: map,
  mapi: mapi,
  fold: fold,
  for_all: for_all,
  exists: exists,
  add_min_binding: add_min_binding,
  add_max_binding: add_max_binding,
  join: join,
  concat: concat,
  concat_or_join: concat_or_join,
  split: split,
  merge: merge,
  filter: filter,
  partition: partition,
  cons_enum: cons_enum,
  compare: compare,
  equal: equal,
  cardinal: cardinal,
  bindings_aux: bindings_aux,
  bindings: bindings,
  choose: min_binding
};

var m = List.fold_left((function (acc, param) {
        return add(param[0], param[1], acc);
      }), "Empty", {
      hd: [
        10,
        /* 'a' */97
      ],
      tl: {
        hd: [
          3,
          /* 'b' */98
        ],
        tl: {
          hd: [
            7,
            /* 'c' */99
          ],
          tl: {
            hd: [
              20,
              /* 'd' */100
            ],
            tl: /* [] */0
          }
        }
      }
    });

function height$1(x) {
  if (typeof x !== "object") {
    return 0;
  } else {
    return x._4;
  }
}

function create$1(l, x, d, r) {
  var hl = height$1(l);
  var hr = height$1(r);
  return {
          TAG: "Node",
          _0: l,
          _1: x,
          _2: d,
          _3: r,
          _4: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
        };
}

function singleton$1(x, d) {
  return {
          TAG: "Node",
          _0: "Empty",
          _1: x,
          _2: d,
          _3: "Empty",
          _4: 1
        };
}

function bal$1(l, x, d, r) {
  var hl;
  hl = typeof l !== "object" ? 0 : l._4;
  var hr;
  hr = typeof r !== "object" ? 0 : r._4;
  if (hl > (hr + 2 | 0)) {
    if (typeof l !== "object") {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Map.bal",
            Error: new Error()
          };
    }
    var lr = l._3;
    var ld = l._2;
    var lv = l._1;
    var ll = l._0;
    if (height$1(ll) >= height$1(lr)) {
      return create$1(ll, lv, ld, create$1(lr, x, d, r));
    }
    if (typeof lr === "object") {
      return create$1(create$1(ll, lv, ld, lr._0), lr._1, lr._2, create$1(lr._3, x, d, r));
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Map.bal",
          Error: new Error()
        };
  }
  if (hr <= (hl + 2 | 0)) {
    return {
            TAG: "Node",
            _0: l,
            _1: x,
            _2: d,
            _3: r,
            _4: hl >= hr ? hl + 1 | 0 : hr + 1 | 0
          };
  }
  if (typeof r !== "object") {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Map.bal",
          Error: new Error()
        };
  }
  var rr = r._3;
  var rd = r._2;
  var rv = r._1;
  var rl = r._0;
  if (height$1(rr) >= height$1(rl)) {
    return create$1(create$1(l, x, d, rl), rv, rd, rr);
  }
  if (typeof rl === "object") {
    return create$1(create$1(l, x, d, rl._0), rl._1, rl._2, create$1(rl._3, rv, rd, rr));
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "Map.bal",
        Error: new Error()
      };
}

function is_empty$1(x) {
  if (typeof x !== "object") {
    return true;
  } else {
    return false;
  }
}

function add$1(x, data, x_) {
  if (typeof x_ !== "object") {
    return {
            TAG: "Node",
            _0: "Empty",
            _1: x,
            _2: data,
            _3: "Empty",
            _4: 1
          };
  }
  var r = x_._3;
  var d = x_._2;
  var v = x_._1;
  var l = x_._0;
  var c = Caml.string_compare(x, v);
  if (c === 0) {
    return {
            TAG: "Node",
            _0: l,
            _1: x,
            _2: data,
            _3: r,
            _4: x_._4
          };
  } else if (c < 0) {
    return bal$1(add$1(x, data, l), v, d, r);
  } else {
    return bal$1(l, v, d, add$1(x, data, r));
  }
}

function find$1(x, _x_) {
  while(true) {
    var x_ = _x_;
    if (typeof x_ !== "object") {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }
    var c = Caml.string_compare(x, x_._1);
    if (c === 0) {
      return x_._2;
    }
    _x_ = c < 0 ? x_._0 : x_._3;
    continue ;
  };
}

function mem$1(x, _x_) {
  while(true) {
    var x_ = _x_;
    if (typeof x_ !== "object") {
      return false;
    }
    var c = Caml.string_compare(x, x_._1);
    if (c === 0) {
      return true;
    }
    _x_ = c < 0 ? x_._0 : x_._3;
    continue ;
  };
}

function min_binding$1(_x) {
  while(true) {
    var x = _x;
    if (typeof x !== "object") {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }
    var l = x._0;
    if (typeof l !== "object") {
      return [
              x._1,
              x._2
            ];
    }
    _x = l;
    continue ;
  };
}

function max_binding$1(_x) {
  while(true) {
    var x = _x;
    if (typeof x !== "object") {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }
    var r = x._3;
    if (typeof r !== "object") {
      return [
              x._1,
              x._2
            ];
    }
    _x = r;
    continue ;
  };
}

function remove_min_binding$1(x) {
  if (typeof x !== "object") {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Map.remove_min_elt",
          Error: new Error()
        };
  }
  var l = x._0;
  if (typeof l !== "object") {
    return x._3;
  } else {
    return bal$1(remove_min_binding$1(l), x._1, x._2, x._3);
  }
}

function remove$1(x, x_) {
  if (typeof x_ !== "object") {
    return "Empty";
  }
  var r = x_._3;
  var d = x_._2;
  var v = x_._1;
  var l = x_._0;
  var c = Caml.string_compare(x, v);
  if (c === 0) {
    if (typeof l !== "object") {
      return r;
    }
    if (typeof r !== "object") {
      return l;
    }
    var match = min_binding$1(r);
    return bal$1(l, match[0], match[1], remove_min_binding$1(r));
  } else if (c < 0) {
    return bal$1(remove$1(x, l), v, d, r);
  } else {
    return bal$1(l, v, d, remove$1(x, r));
  }
}

function iter$1(f, _x) {
  while(true) {
    var x = _x;
    if (typeof x !== "object") {
      return ;
    }
    iter$1(f, x._0);
    Curry._2(f, x._1, x._2);
    _x = x._3;
    continue ;
  };
}

function map$1(f, x) {
  if (typeof x !== "object") {
    return "Empty";
  }
  var l$p = map$1(f, x._0);
  var d$p = Curry._1(f, x._2);
  var r$p = map$1(f, x._3);
  return {
          TAG: "Node",
          _0: l$p,
          _1: x._1,
          _2: d$p,
          _3: r$p,
          _4: x._4
        };
}

function mapi$1(f, x) {
  if (typeof x !== "object") {
    return "Empty";
  }
  var v = x._1;
  var l$p = mapi$1(f, x._0);
  var d$p = Curry._2(f, v, x._2);
  var r$p = mapi$1(f, x._3);
  return {
          TAG: "Node",
          _0: l$p,
          _1: v,
          _2: d$p,
          _3: r$p,
          _4: x._4
        };
}

function fold$1(f, _m, _accu) {
  while(true) {
    var accu = _accu;
    var m = _m;
    if (typeof m !== "object") {
      return accu;
    }
    _accu = Curry._3(f, m._1, m._2, fold$1(f, m._0, accu));
    _m = m._3;
    continue ;
  };
}

function for_all$1(p, _x) {
  while(true) {
    var x = _x;
    if (typeof x !== "object") {
      return true;
    }
    if (!Curry._2(p, x._1, x._2)) {
      return false;
    }
    if (!for_all$1(p, x._0)) {
      return false;
    }
    _x = x._3;
    continue ;
  };
}

function exists$1(p, _x) {
  while(true) {
    var x = _x;
    if (typeof x !== "object") {
      return false;
    }
    if (Curry._2(p, x._1, x._2)) {
      return true;
    }
    if (exists$1(p, x._0)) {
      return true;
    }
    _x = x._3;
    continue ;
  };
}

function add_min_binding$1(k, v, x) {
  if (typeof x !== "object") {
    return singleton$1(k, v);
  } else {
    return bal$1(add_min_binding$1(k, v, x._0), x._1, x._2, x._3);
  }
}

function add_max_binding$1(k, v, x) {
  if (typeof x !== "object") {
    return singleton$1(k, v);
  } else {
    return bal$1(x._0, x._1, x._2, add_max_binding$1(k, v, x._3));
  }
}

function join$1(l, v, d, r) {
  if (typeof l !== "object") {
    return add_min_binding$1(v, d, r);
  }
  var lh = l._4;
  if (typeof r !== "object") {
    return add_max_binding$1(v, d, l);
  }
  var rh = r._4;
  if (lh > (rh + 2 | 0)) {
    return bal$1(l._0, l._1, l._2, join$1(l._3, v, d, r));
  } else if (rh > (lh + 2 | 0)) {
    return bal$1(join$1(l, v, d, r._0), r._1, r._2, r._3);
  } else {
    return create$1(l, v, d, r);
  }
}

function concat$1(t1, t2) {
  if (typeof t1 !== "object") {
    return t2;
  }
  if (typeof t2 !== "object") {
    return t1;
  }
  var match = min_binding$1(t2);
  return join$1(t1, match[0], match[1], remove_min_binding$1(t2));
}

function concat_or_join$1(t1, v, d, t2) {
  if (d !== undefined) {
    return join$1(t1, v, Caml_option.valFromOption(d), t2);
  } else {
    return concat$1(t1, t2);
  }
}

function split$1(x, x_) {
  if (typeof x_ !== "object") {
    return [
            "Empty",
            undefined,
            "Empty"
          ];
  }
  var r = x_._3;
  var d = x_._2;
  var v = x_._1;
  var l = x_._0;
  var c = Caml.string_compare(x, v);
  if (c === 0) {
    return [
            l,
            Caml_option.some(d),
            r
          ];
  }
  if (c < 0) {
    var match = split$1(x, l);
    return [
            match[0],
            match[1],
            join$1(match[2], v, d, r)
          ];
  }
  var match$1 = split$1(x, r);
  return [
          join$1(l, v, d, match$1[0]),
          match$1[1],
          match$1[2]
        ];
}

function merge$1(f, s1, s2) {
  if (typeof s1 !== "object") {
    if (typeof s2 !== "object") {
      return "Empty";
    }
    
  } else {
    var v1 = s1._1;
    if (s1._4 >= height$1(s2)) {
      var match = split$1(v1, s2);
      return concat_or_join$1(merge$1(f, s1._0, match[0]), v1, Curry._3(f, v1, Caml_option.some(s1._2), match[1]), merge$1(f, s1._3, match[2]));
    }
    
  }
  if (typeof s2 !== "object") {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "inline_map2_test.res",
            359,
            11
          ],
          Error: new Error()
        };
  }
  var v2 = s2._1;
  var match$1 = split$1(v2, s1);
  return concat_or_join$1(merge$1(f, match$1[0], s2._0), v2, Curry._3(f, v2, match$1[1], Caml_option.some(s2._2)), merge$1(f, match$1[2], s2._3));
}

function filter$1(p, x) {
  if (typeof x !== "object") {
    return "Empty";
  }
  var d = x._2;
  var v = x._1;
  var l$p = filter$1(p, x._0);
  var pvd = Curry._2(p, v, d);
  var r$p = filter$1(p, x._3);
  if (pvd) {
    return join$1(l$p, v, d, r$p);
  } else {
    return concat$1(l$p, r$p);
  }
}

function partition$1(p, x) {
  if (typeof x !== "object") {
    return [
            "Empty",
            "Empty"
          ];
  }
  var d = x._2;
  var v = x._1;
  var match = partition$1(p, x._0);
  var lf = match[1];
  var lt = match[0];
  var pvd = Curry._2(p, v, d);
  var match$1 = partition$1(p, x._3);
  var rf = match$1[1];
  var rt = match$1[0];
  if (pvd) {
    return [
            join$1(lt, v, d, rt),
            concat$1(lf, rf)
          ];
  } else {
    return [
            concat$1(lt, rt),
            join$1(lf, v, d, rf)
          ];
  }
}

function cons_enum$1(_m, _e) {
  while(true) {
    var e = _e;
    var m = _m;
    if (typeof m !== "object") {
      return e;
    }
    _e = {
      TAG: "More",
      _0: m._1,
      _1: m._2,
      _2: m._3,
      _3: e
    };
    _m = m._0;
    continue ;
  };
}

function compare$1(cmp, m1, m2) {
  var _e1 = cons_enum$1(m1, "End");
  var _e2 = cons_enum$1(m2, "End");
  while(true) {
    var e2 = _e2;
    var e1 = _e1;
    if (typeof e1 !== "object") {
      if (typeof e2 !== "object") {
        return 0;
      } else {
        return -1;
      }
    }
    if (typeof e2 !== "object") {
      return 1;
    }
    var c = Caml.string_compare(e1._0, e2._0);
    if (c !== 0) {
      return c;
    }
    var c$1 = Curry._2(cmp, e1._1, e2._1);
    if (c$1 !== 0) {
      return c$1;
    }
    _e2 = cons_enum$1(e2._2, e2._3);
    _e1 = cons_enum$1(e1._2, e1._3);
    continue ;
  };
}

function equal$1(cmp, m1, m2) {
  var _e1 = cons_enum$1(m1, "End");
  var _e2 = cons_enum$1(m2, "End");
  while(true) {
    var e2 = _e2;
    var e1 = _e1;
    if (typeof e1 !== "object") {
      if (typeof e2 !== "object") {
        return true;
      } else {
        return false;
      }
    }
    if (typeof e2 !== "object") {
      return false;
    }
    if (Caml.string_compare(e1._0, e2._0) !== 0) {
      return false;
    }
    if (!Curry._2(cmp, e1._1, e2._1)) {
      return false;
    }
    _e2 = cons_enum$1(e2._2, e2._3);
    _e1 = cons_enum$1(e1._2, e1._3);
    continue ;
  };
}

function cardinal$1(x) {
  if (typeof x !== "object") {
    return 0;
  } else {
    return (cardinal$1(x._0) + 1 | 0) + cardinal$1(x._3) | 0;
  }
}

function bindings_aux$1(_accu, _x) {
  while(true) {
    var x = _x;
    var accu = _accu;
    if (typeof x !== "object") {
      return accu;
    }
    _x = x._0;
    _accu = {
      hd: [
        x._1,
        x._2
      ],
      tl: bindings_aux$1(accu, x._3)
    };
    continue ;
  };
}

function bindings$1(s) {
  return bindings_aux$1(/* [] */0, s);
}

var SMap = {
  height: height$1,
  create: create$1,
  singleton: singleton$1,
  bal: bal$1,
  empty: "Empty",
  is_empty: is_empty$1,
  add: add$1,
  find: find$1,
  mem: mem$1,
  min_binding: min_binding$1,
  max_binding: max_binding$1,
  remove_min_binding: remove_min_binding$1,
  remove: remove$1,
  iter: iter$1,
  map: map$1,
  mapi: mapi$1,
  fold: fold$1,
  for_all: for_all$1,
  exists: exists$1,
  add_min_binding: add_min_binding$1,
  add_max_binding: add_max_binding$1,
  join: join$1,
  concat: concat$1,
  concat_or_join: concat_or_join$1,
  split: split$1,
  merge: merge$1,
  filter: filter$1,
  partition: partition$1,
  cons_enum: cons_enum$1,
  compare: compare$1,
  equal: equal$1,
  cardinal: cardinal$1,
  bindings_aux: bindings_aux$1,
  bindings: bindings$1,
  choose: min_binding$1
};

var s = List.fold_left((function (acc, param) {
        return add$1(param[0], param[1], acc);
      }), "Empty", {
      hd: [
        "10",
        /* 'a' */97
      ],
      tl: {
        hd: [
          "3",
          /* 'b' */98
        ],
        tl: {
          hd: [
            "7",
            /* 'c' */99
          ],
          tl: {
            hd: [
              "20",
              /* 'd' */100
            ],
            tl: /* [] */0
          }
        }
      }
    });

Mt.from_pair_suites("Inline_map2_test", {
      hd: [
        "assertion1",
        (function (param) {
            return {
                    TAG: "Eq",
                    _0: find(10, m),
                    _1: /* 'a' */97
                  };
          })
      ],
      tl: {
        hd: [
          "assertion2",
          (function (param) {
              return {
                      TAG: "Eq",
                      _0: find$1("10", s),
                      _1: /* 'a' */97
                    };
            })
        ],
        tl: /* [] */0
      }
    });

var empty = "Empty";

exports.Make = Make;
exports.IntMap = IntMap;
exports.empty = empty;
exports.m = m;
exports.SMap = SMap;
exports.s = s;
/* m Not a pure module */
