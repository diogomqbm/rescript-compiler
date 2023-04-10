'use strict';

var List = require("../../lib/js/list.js");
var Curry = require("../../lib/js/curry.js");
var Caml_obj = require("../../lib/js/caml_obj.js");
var Pervasives = require("../../lib/js/pervasives.js");

function length_aux(_len, _x) {
  while(true) {
    var x = _x;
    var len = _len;
    if (!x) {
      return len;
    }
    _x = x.tl;
    _len = len + 1 | 0;
    continue ;
  };
}

function length(l) {
  return length_aux(0, l);
}

function hd(x) {
  if (x) {
    return x.hd;
  }
  throw {
        RE_EXN_ID: "Failure",
        _1: "hd",
        Error: new Error()
      };
}

function tl(x) {
  if (x) {
    return x.tl;
  }
  throw {
        RE_EXN_ID: "Failure",
        _1: "tl",
        Error: new Error()
      };
}

function nth(l, n) {
  if (n < 0) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "List.nth",
          Error: new Error()
        };
  }
  var _l = l;
  var _n = n;
  while(true) {
    var n$1 = _n;
    var l$1 = _l;
    if (l$1) {
      if (n$1 === 0) {
        return l$1.hd;
      }
      _n = n$1 - 1 | 0;
      _l = l$1.tl;
      continue ;
    }
    throw {
          RE_EXN_ID: "Failure",
          _1: "nth",
          Error: new Error()
        };
  };
}

function rev_append(_l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (!l1) {
      return l2;
    }
    _l2 = {
      hd: l1.hd,
      tl: l2
    };
    _l1 = l1.tl;
    continue ;
  };
}

function rev(l) {
  return rev_append(l, /* [] */0);
}

function flatten(x) {
  if (x) {
    return Pervasives.$at(x.hd, flatten(x.tl));
  } else {
    return /* [] */0;
  }
}

function map(f, x) {
  if (!x) {
    return /* [] */0;
  }
  var r = Curry._1(f, x.hd);
  return {
          hd: r,
          tl: map(f, x.tl)
        };
}

function mapi(i, f, x) {
  if (!x) {
    return /* [] */0;
  }
  var r = Curry._2(f, i, x.hd);
  return {
          hd: r,
          tl: mapi(i + 1 | 0, f, x.tl)
        };
}

function mapi$1(f, l) {
  return mapi(0, f, l);
}

function rev_map(f, l) {
  var _accu = /* [] */0;
  var _x = l;
  while(true) {
    var x = _x;
    var accu = _accu;
    if (!x) {
      return accu;
    }
    _x = x.tl;
    _accu = {
      hd: Curry._1(f, x.hd),
      tl: accu
    };
    continue ;
  };
}

function iter(f, _x) {
  while(true) {
    var x = _x;
    if (!x) {
      return ;
    }
    Curry._1(f, x.hd);
    _x = x.tl;
    continue ;
  };
}

function iteri(f, l) {
  var _i = 0;
  var _x = l;
  while(true) {
    var x = _x;
    var i = _i;
    if (!x) {
      return ;
    }
    Curry._2(f, i, x.hd);
    _x = x.tl;
    _i = i + 1 | 0;
    continue ;
  };
}

function fold_left(f, _accu, _l) {
  while(true) {
    var l = _l;
    var accu = _accu;
    if (!l) {
      return accu;
    }
    _l = l.tl;
    _accu = Curry._2(f, accu, l.hd);
    continue ;
  };
}

function fold_right(f, l, accu) {
  if (l) {
    return Curry._2(f, l.hd, fold_right(f, l.tl, accu));
  } else {
    return accu;
  }
}

function map2(f, l1, l2) {
  if (l1) {
    if (l2) {
      var r = Curry._2(f, l1.hd, l2.hd);
      return {
              hd: r,
              tl: map2(f, l1.tl, l2.tl)
            };
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "List.map2",
          Error: new Error()
        };
  }
  if (!l2) {
    return /* [] */0;
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "List.map2",
        Error: new Error()
      };
}

function rev_map2(f, l1, l2) {
  var _accu = /* [] */0;
  var _l1 = l1;
  var _l2 = l2;
  while(true) {
    var l2$1 = _l2;
    var l1$1 = _l1;
    var accu = _accu;
    if (l1$1) {
      if (l2$1) {
        _l2 = l2$1.tl;
        _l1 = l1$1.tl;
        _accu = {
          hd: Curry._2(f, l1$1.hd, l2$1.hd),
          tl: accu
        };
        continue ;
      }
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "List.rev_map2",
            Error: new Error()
          };
    }
    if (l2$1) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "List.rev_map2",
            Error: new Error()
          };
    }
    return accu;
  };
}

function iter2(f, _l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (l1) {
      if (l2) {
        Curry._2(f, l1.hd, l2.hd);
        _l2 = l2.tl;
        _l1 = l1.tl;
        continue ;
      }
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "List.iter2",
            Error: new Error()
          };
    }
    if (!l2) {
      return ;
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "List.iter2",
          Error: new Error()
        };
  };
}

function fold_left2(f, _accu, _l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    var accu = _accu;
    if (l1) {
      if (l2) {
        _l2 = l2.tl;
        _l1 = l1.tl;
        _accu = Curry._3(f, accu, l1.hd, l2.hd);
        continue ;
      }
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "List.fold_left2",
            Error: new Error()
          };
    }
    if (l2) {
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "List.fold_left2",
            Error: new Error()
          };
    }
    return accu;
  };
}

function fold_right2(f, l1, l2, accu) {
  if (l1) {
    if (l2) {
      return Curry._3(f, l1.hd, l2.hd, fold_right2(f, l1.tl, l2.tl, accu));
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "List.fold_right2",
          Error: new Error()
        };
  }
  if (l2) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "List.fold_right2",
          Error: new Error()
        };
  }
  return accu;
}

function for_all(p, _x) {
  while(true) {
    var x = _x;
    if (!x) {
      return true;
    }
    if (!Curry._1(p, x.hd)) {
      return false;
    }
    _x = x.tl;
    continue ;
  };
}

function exists(p, _x) {
  while(true) {
    var x = _x;
    if (!x) {
      return false;
    }
    if (Curry._1(p, x.hd)) {
      return true;
    }
    _x = x.tl;
    continue ;
  };
}

function for_all2(p, _l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (l1) {
      if (l2) {
        if (!Curry._2(p, l1.hd, l2.hd)) {
          return false;
        }
        _l2 = l2.tl;
        _l1 = l1.tl;
        continue ;
      }
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "List.for_all2",
            Error: new Error()
          };
    }
    if (!l2) {
      return true;
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "List.for_all2",
          Error: new Error()
        };
  };
}

function exists2(p, _l1, _l2) {
  while(true) {
    var l2 = _l2;
    var l1 = _l1;
    if (l1) {
      if (l2) {
        if (Curry._2(p, l1.hd, l2.hd)) {
          return true;
        }
        _l2 = l2.tl;
        _l1 = l1.tl;
        continue ;
      }
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "List.exists2",
            Error: new Error()
          };
    }
    if (!l2) {
      return false;
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "List.exists2",
          Error: new Error()
        };
  };
}

function mem(x, _x_) {
  while(true) {
    var x_ = _x_;
    if (!x_) {
      return false;
    }
    if (Caml_obj.equal(x_.hd, x)) {
      return true;
    }
    _x_ = x_.tl;
    continue ;
  };
}

function memq(x, _x_) {
  while(true) {
    var x_ = _x_;
    if (!x_) {
      return false;
    }
    if (x_.hd === x) {
      return true;
    }
    _x_ = x_.tl;
    continue ;
  };
}

function assoc(x, _x_) {
  while(true) {
    var x_ = _x_;
    if (x_) {
      var match = x_.hd;
      if (Caml_obj.equal(match[0], x)) {
        return match[1];
      }
      _x_ = x_.tl;
      continue ;
    }
    throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
  };
}

function assq(x, _x_) {
  while(true) {
    var x_ = _x_;
    if (x_) {
      var match = x_.hd;
      if (match[0] === x) {
        return match[1];
      }
      _x_ = x_.tl;
      continue ;
    }
    throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
  };
}

function mem_assoc(x, _x_) {
  while(true) {
    var x_ = _x_;
    if (!x_) {
      return false;
    }
    if (Caml_obj.equal(x_.hd[0], x)) {
      return true;
    }
    _x_ = x_.tl;
    continue ;
  };
}

function mem_assq(x, _x_) {
  while(true) {
    var x_ = _x_;
    if (!x_) {
      return false;
    }
    if (x_.hd[0] === x) {
      return true;
    }
    _x_ = x_.tl;
    continue ;
  };
}

function remove_assoc(x, x_) {
  if (!x_) {
    return /* [] */0;
  }
  var l = x_.tl;
  var pair = x_.hd;
  if (Caml_obj.equal(pair[0], x)) {
    return l;
  } else {
    return {
            hd: pair,
            tl: remove_assoc(x, l)
          };
  }
}

function remove_assq(x, x_) {
  if (!x_) {
    return /* [] */0;
  }
  var l = x_.tl;
  var pair = x_.hd;
  if (pair[0] === x) {
    return l;
  } else {
    return {
            hd: pair,
            tl: remove_assq(x, l)
          };
  }
}

function find(p, _x) {
  while(true) {
    var x = _x;
    if (x) {
      var x$1 = x.hd;
      if (Curry._1(p, x$1)) {
        return x$1;
      }
      _x = x.tl;
      continue ;
    }
    throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
  };
}

function find_all(p) {
  return function (param) {
    var _accu = /* [] */0;
    var _x = param;
    while(true) {
      var x = _x;
      var accu = _accu;
      if (!x) {
        return rev_append(accu, /* [] */0);
      }
      var l = x.tl;
      var x$1 = x.hd;
      if (Curry._1(p, x$1)) {
        _x = l;
        _accu = {
          hd: x$1,
          tl: accu
        };
        continue ;
      }
      _x = l;
      continue ;
    };
  };
}

function partition(p, l) {
  var _yes = /* [] */0;
  var _no = /* [] */0;
  var _x = l;
  while(true) {
    var x = _x;
    var no = _no;
    var yes = _yes;
    if (!x) {
      return [
              rev_append(yes, /* [] */0),
              rev_append(no, /* [] */0)
            ];
    }
    var l$1 = x.tl;
    var x$1 = x.hd;
    if (Curry._1(p, x$1)) {
      _x = l$1;
      _yes = {
        hd: x$1,
        tl: yes
      };
      continue ;
    }
    _x = l$1;
    _no = {
      hd: x$1,
      tl: no
    };
    continue ;
  };
}

function split(x) {
  if (!x) {
    return [
            /* [] */0,
            /* [] */0
          ];
  }
  var match = x.hd;
  var match$1 = split(x.tl);
  return [
          {
            hd: match[0],
            tl: match$1[0]
          },
          {
            hd: match[1],
            tl: match$1[1]
          }
        ];
}

function combine(l1, l2) {
  if (l1) {
    if (l2) {
      return {
              hd: [
                l1.hd,
                l2.hd
              ],
              tl: combine(l1.tl, l2.tl)
            };
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "List.combine",
          Error: new Error()
        };
  }
  if (!l2) {
    return /* [] */0;
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "List.combine",
        Error: new Error()
      };
}

function merge(cmp, l1, l2) {
  if (!l1) {
    return l2;
  }
  if (!l2) {
    return l1;
  }
  var h2 = l2.hd;
  var h1 = l1.hd;
  if (Curry._2(cmp, h1, h2) <= 0) {
    return {
            hd: h1,
            tl: merge(cmp, l1.tl, l2)
          };
  } else {
    return {
            hd: h2,
            tl: merge(cmp, l1, l2.tl)
          };
  }
}

function chop(_k, _l) {
  while(true) {
    var l = _l;
    var k = _k;
    if (k === 0) {
      return l;
    }
    if (l) {
      _l = l.tl;
      _k = k - 1 | 0;
      continue ;
    }
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "test_list.res",
            343,
            11
          ],
          Error: new Error()
        };
  };
}

function stable_sort(cmp, l) {
  var sort = function (n, l) {
    if (n !== 2) {
      if (n === 3 && l) {
        var match = l.tl;
        if (match) {
          var match$1 = match.tl;
          if (match$1) {
            var x3 = match$1.hd;
            var x2 = match.hd;
            var x1 = l.hd;
            if (Curry._2(cmp, x1, x2) <= 0) {
              if (Curry._2(cmp, x2, x3) <= 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x2,
                          tl: {
                            hd: x3,
                            tl: /* [] */0
                          }
                        }
                      };
              } else if (Curry._2(cmp, x1, x3) <= 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x3,
                          tl: {
                            hd: x2,
                            tl: /* [] */0
                          }
                        }
                      };
              } else {
                return {
                        hd: x3,
                        tl: {
                          hd: x1,
                          tl: {
                            hd: x2,
                            tl: /* [] */0
                          }
                        }
                      };
              }
            } else if (Curry._2(cmp, x1, x3) <= 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x1,
                        tl: {
                          hd: x3,
                          tl: /* [] */0
                        }
                      }
                    };
            } else if (Curry._2(cmp, x2, x3) <= 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x3,
                        tl: {
                          hd: x1,
                          tl: /* [] */0
                        }
                      }
                    };
            } else {
              return {
                      hd: x3,
                      tl: {
                        hd: x2,
                        tl: {
                          hd: x1,
                          tl: /* [] */0
                        }
                      }
                    };
            }
          }
          
        }
        
      }
      
    } else if (l) {
      var match$2 = l.tl;
      if (match$2) {
        var x2$1 = match$2.hd;
        var x1$1 = l.hd;
        if (Curry._2(cmp, x1$1, x2$1) <= 0) {
          return {
                  hd: x1$1,
                  tl: {
                    hd: x2$1,
                    tl: /* [] */0
                  }
                };
        } else {
          return {
                  hd: x2$1,
                  tl: {
                    hd: x1$1,
                    tl: /* [] */0
                  }
                };
        }
      }
      
    }
    var n1 = (n >> 1);
    var n2 = n - n1 | 0;
    var l2 = chop(n1, l);
    var s1 = rev_sort(n1, l);
    var s2 = rev_sort(n2, l2);
    var _l1 = s1;
    var _l2 = s2;
    var _accu = /* [] */0;
    while(true) {
      var accu = _accu;
      var l2$1 = _l2;
      var l1 = _l1;
      if (!l1) {
        return rev_append(l2$1, accu);
      }
      if (!l2$1) {
        return rev_append(l1, accu);
      }
      var h2 = l2$1.hd;
      var h1 = l1.hd;
      if (Curry._2(cmp, h1, h2) > 0) {
        _accu = {
          hd: h1,
          tl: accu
        };
        _l1 = l1.tl;
        continue ;
      }
      _accu = {
        hd: h2,
        tl: accu
      };
      _l2 = l2$1.tl;
      continue ;
    };
  };
  var rev_sort = function (n, l) {
    if (n !== 2) {
      if (n === 3 && l) {
        var match = l.tl;
        if (match) {
          var match$1 = match.tl;
          if (match$1) {
            var x3 = match$1.hd;
            var x2 = match.hd;
            var x1 = l.hd;
            if (Curry._2(cmp, x1, x2) > 0) {
              if (Curry._2(cmp, x2, x3) > 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x2,
                          tl: {
                            hd: x3,
                            tl: /* [] */0
                          }
                        }
                      };
              } else if (Curry._2(cmp, x1, x3) > 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x3,
                          tl: {
                            hd: x2,
                            tl: /* [] */0
                          }
                        }
                      };
              } else {
                return {
                        hd: x3,
                        tl: {
                          hd: x1,
                          tl: {
                            hd: x2,
                            tl: /* [] */0
                          }
                        }
                      };
              }
            } else if (Curry._2(cmp, x1, x3) > 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x1,
                        tl: {
                          hd: x3,
                          tl: /* [] */0
                        }
                      }
                    };
            } else if (Curry._2(cmp, x2, x3) > 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x3,
                        tl: {
                          hd: x1,
                          tl: /* [] */0
                        }
                      }
                    };
            } else {
              return {
                      hd: x3,
                      tl: {
                        hd: x2,
                        tl: {
                          hd: x1,
                          tl: /* [] */0
                        }
                      }
                    };
            }
          }
          
        }
        
      }
      
    } else if (l) {
      var match$2 = l.tl;
      if (match$2) {
        var x2$1 = match$2.hd;
        var x1$1 = l.hd;
        if (Curry._2(cmp, x1$1, x2$1) > 0) {
          return {
                  hd: x1$1,
                  tl: {
                    hd: x2$1,
                    tl: /* [] */0
                  }
                };
        } else {
          return {
                  hd: x2$1,
                  tl: {
                    hd: x1$1,
                    tl: /* [] */0
                  }
                };
        }
      }
      
    }
    var n1 = (n >> 1);
    var n2 = n - n1 | 0;
    var l2 = chop(n1, l);
    var s1 = sort(n1, l);
    var s2 = sort(n2, l2);
    var _l1 = s1;
    var _l2 = s2;
    var _accu = /* [] */0;
    while(true) {
      var accu = _accu;
      var l2$1 = _l2;
      var l1 = _l1;
      if (!l1) {
        return rev_append(l2$1, accu);
      }
      if (!l2$1) {
        return rev_append(l1, accu);
      }
      var h2 = l2$1.hd;
      var h1 = l1.hd;
      if (Curry._2(cmp, h1, h2) <= 0) {
        _accu = {
          hd: h1,
          tl: accu
        };
        _l1 = l1.tl;
        continue ;
      }
      _accu = {
        hd: h2,
        tl: accu
      };
      _l2 = l2$1.tl;
      continue ;
    };
  };
  var len = length_aux(0, l);
  if (len < 2) {
    return l;
  } else {
    return sort(len, l);
  }
}

function sort_uniq(cmp, l) {
  var sort = function (n, l) {
    if (n !== 2) {
      if (n === 3 && l) {
        var match = l.tl;
        if (match) {
          var match$1 = match.tl;
          if (match$1) {
            var x3 = match$1.hd;
            var x2 = match.hd;
            var x1 = l.hd;
            var c = Curry._2(cmp, x1, x2);
            if (c === 0) {
              var c$1 = Curry._2(cmp, x2, x3);
              if (c$1 === 0) {
                return {
                        hd: x2,
                        tl: /* [] */0
                      };
              } else if (c$1 < 0) {
                return {
                        hd: x2,
                        tl: {
                          hd: x3,
                          tl: /* [] */0
                        }
                      };
              } else {
                return {
                        hd: x3,
                        tl: {
                          hd: x2,
                          tl: /* [] */0
                        }
                      };
              }
            }
            if (c < 0) {
              var c$2 = Curry._2(cmp, x2, x3);
              if (c$2 === 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x2,
                          tl: /* [] */0
                        }
                      };
              }
              if (c$2 < 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x2,
                          tl: {
                            hd: x3,
                            tl: /* [] */0
                          }
                        }
                      };
              }
              var c$3 = Curry._2(cmp, x1, x3);
              if (c$3 === 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x2,
                          tl: /* [] */0
                        }
                      };
              } else if (c$3 < 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x3,
                          tl: {
                            hd: x2,
                            tl: /* [] */0
                          }
                        }
                      };
              } else {
                return {
                        hd: x3,
                        tl: {
                          hd: x1,
                          tl: {
                            hd: x2,
                            tl: /* [] */0
                          }
                        }
                      };
              }
            }
            var c$4 = Curry._2(cmp, x1, x3);
            if (c$4 === 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x1,
                        tl: /* [] */0
                      }
                    };
            }
            if (c$4 < 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x1,
                        tl: {
                          hd: x3,
                          tl: /* [] */0
                        }
                      }
                    };
            }
            var c$5 = Curry._2(cmp, x2, x3);
            if (c$5 === 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x1,
                        tl: /* [] */0
                      }
                    };
            } else if (c$5 < 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x3,
                        tl: {
                          hd: x1,
                          tl: /* [] */0
                        }
                      }
                    };
            } else {
              return {
                      hd: x3,
                      tl: {
                        hd: x2,
                        tl: {
                          hd: x1,
                          tl: /* [] */0
                        }
                      }
                    };
            }
          }
          
        }
        
      }
      
    } else if (l) {
      var match$2 = l.tl;
      if (match$2) {
        var x2$1 = match$2.hd;
        var x1$1 = l.hd;
        var c$6 = Curry._2(cmp, x1$1, x2$1);
        if (c$6 === 0) {
          return {
                  hd: x1$1,
                  tl: /* [] */0
                };
        } else if (c$6 < 0) {
          return {
                  hd: x1$1,
                  tl: {
                    hd: x2$1,
                    tl: /* [] */0
                  }
                };
        } else {
          return {
                  hd: x2$1,
                  tl: {
                    hd: x1$1,
                    tl: /* [] */0
                  }
                };
        }
      }
      
    }
    var n1 = (n >> 1);
    var n2 = n - n1 | 0;
    var l2 = chop(n1, l);
    var s1 = rev_sort(n1, l);
    var s2 = rev_sort(n2, l2);
    var _l1 = s1;
    var _l2 = s2;
    var _accu = /* [] */0;
    while(true) {
      var accu = _accu;
      var l2$1 = _l2;
      var l1 = _l1;
      if (!l1) {
        return rev_append(l2$1, accu);
      }
      if (!l2$1) {
        return rev_append(l1, accu);
      }
      var t2 = l2$1.tl;
      var h2 = l2$1.hd;
      var t1 = l1.tl;
      var h1 = l1.hd;
      var c$7 = Curry._2(cmp, h1, h2);
      if (c$7 === 0) {
        _accu = {
          hd: h1,
          tl: accu
        };
        _l2 = t2;
        _l1 = t1;
        continue ;
      }
      if (c$7 > 0) {
        _accu = {
          hd: h1,
          tl: accu
        };
        _l1 = t1;
        continue ;
      }
      _accu = {
        hd: h2,
        tl: accu
      };
      _l2 = t2;
      continue ;
    };
  };
  var rev_sort = function (n, l) {
    if (n !== 2) {
      if (n === 3 && l) {
        var match = l.tl;
        if (match) {
          var match$1 = match.tl;
          if (match$1) {
            var x3 = match$1.hd;
            var x2 = match.hd;
            var x1 = l.hd;
            var c = Curry._2(cmp, x1, x2);
            if (c === 0) {
              var c$1 = Curry._2(cmp, x2, x3);
              if (c$1 === 0) {
                return {
                        hd: x2,
                        tl: /* [] */0
                      };
              } else if (c$1 > 0) {
                return {
                        hd: x2,
                        tl: {
                          hd: x3,
                          tl: /* [] */0
                        }
                      };
              } else {
                return {
                        hd: x3,
                        tl: {
                          hd: x2,
                          tl: /* [] */0
                        }
                      };
              }
            }
            if (c > 0) {
              var c$2 = Curry._2(cmp, x2, x3);
              if (c$2 === 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x2,
                          tl: /* [] */0
                        }
                      };
              }
              if (c$2 > 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x2,
                          tl: {
                            hd: x3,
                            tl: /* [] */0
                          }
                        }
                      };
              }
              var c$3 = Curry._2(cmp, x1, x3);
              if (c$3 === 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x2,
                          tl: /* [] */0
                        }
                      };
              } else if (c$3 > 0) {
                return {
                        hd: x1,
                        tl: {
                          hd: x3,
                          tl: {
                            hd: x2,
                            tl: /* [] */0
                          }
                        }
                      };
              } else {
                return {
                        hd: x3,
                        tl: {
                          hd: x1,
                          tl: {
                            hd: x2,
                            tl: /* [] */0
                          }
                        }
                      };
              }
            }
            var c$4 = Curry._2(cmp, x1, x3);
            if (c$4 === 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x1,
                        tl: /* [] */0
                      }
                    };
            }
            if (c$4 > 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x1,
                        tl: {
                          hd: x3,
                          tl: /* [] */0
                        }
                      }
                    };
            }
            var c$5 = Curry._2(cmp, x2, x3);
            if (c$5 === 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x1,
                        tl: /* [] */0
                      }
                    };
            } else if (c$5 > 0) {
              return {
                      hd: x2,
                      tl: {
                        hd: x3,
                        tl: {
                          hd: x1,
                          tl: /* [] */0
                        }
                      }
                    };
            } else {
              return {
                      hd: x3,
                      tl: {
                        hd: x2,
                        tl: {
                          hd: x1,
                          tl: /* [] */0
                        }
                      }
                    };
            }
          }
          
        }
        
      }
      
    } else if (l) {
      var match$2 = l.tl;
      if (match$2) {
        var x2$1 = match$2.hd;
        var x1$1 = l.hd;
        var c$6 = Curry._2(cmp, x1$1, x2$1);
        if (c$6 === 0) {
          return {
                  hd: x1$1,
                  tl: /* [] */0
                };
        } else if (c$6 > 0) {
          return {
                  hd: x1$1,
                  tl: {
                    hd: x2$1,
                    tl: /* [] */0
                  }
                };
        } else {
          return {
                  hd: x2$1,
                  tl: {
                    hd: x1$1,
                    tl: /* [] */0
                  }
                };
        }
      }
      
    }
    var n1 = (n >> 1);
    var n2 = n - n1 | 0;
    var l2 = chop(n1, l);
    var s1 = sort(n1, l);
    var s2 = sort(n2, l2);
    var _l1 = s1;
    var _l2 = s2;
    var _accu = /* [] */0;
    while(true) {
      var accu = _accu;
      var l2$1 = _l2;
      var l1 = _l1;
      if (!l1) {
        return rev_append(l2$1, accu);
      }
      if (!l2$1) {
        return rev_append(l1, accu);
      }
      var t2 = l2$1.tl;
      var h2 = l2$1.hd;
      var t1 = l1.tl;
      var h1 = l1.hd;
      var c$7 = Curry._2(cmp, h1, h2);
      if (c$7 === 0) {
        _accu = {
          hd: h1,
          tl: accu
        };
        _l2 = t2;
        _l1 = t1;
        continue ;
      }
      if (c$7 < 0) {
        _accu = {
          hd: h1,
          tl: accu
        };
        _l1 = t1;
        continue ;
      }
      _accu = {
        hd: h2,
        tl: accu
      };
      _l2 = t2;
      continue ;
    };
  };
  var len = length_aux(0, l);
  if (len < 2) {
    return l;
  } else {
    return sort(len, l);
  }
}

var u = List.length;

var append = Pervasives.$at;

var concat = flatten;

var filter = find_all;

var sort = stable_sort;

var fast_sort = stable_sort;

exports.u = u;
exports.length_aux = length_aux;
exports.length = length;
exports.hd = hd;
exports.tl = tl;
exports.nth = nth;
exports.append = append;
exports.rev_append = rev_append;
exports.rev = rev;
exports.flatten = flatten;
exports.concat = concat;
exports.map = map;
exports.mapi = mapi$1;
exports.rev_map = rev_map;
exports.iter = iter;
exports.iteri = iteri;
exports.fold_left = fold_left;
exports.fold_right = fold_right;
exports.map2 = map2;
exports.rev_map2 = rev_map2;
exports.iter2 = iter2;
exports.fold_left2 = fold_left2;
exports.fold_right2 = fold_right2;
exports.for_all = for_all;
exports.exists = exists;
exports.for_all2 = for_all2;
exports.exists2 = exists2;
exports.mem = mem;
exports.memq = memq;
exports.assoc = assoc;
exports.assq = assq;
exports.mem_assoc = mem_assoc;
exports.mem_assq = mem_assq;
exports.remove_assoc = remove_assoc;
exports.remove_assq = remove_assq;
exports.find = find;
exports.find_all = find_all;
exports.filter = filter;
exports.partition = partition;
exports.split = split;
exports.combine = combine;
exports.merge = merge;
exports.chop = chop;
exports.stable_sort = stable_sort;
exports.sort = sort;
exports.fast_sort = fast_sort;
exports.sort_uniq = sort_uniq;
/* No side effect */
