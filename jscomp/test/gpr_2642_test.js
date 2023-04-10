'use strict';


function isfree(id, _x) {
  while(true) {
    var x = _x;
    switch (x.TAG) {
      case "Pident" :
          return id === x._0;
      case "Pdot" :
          _x = x._0;
          continue ;
      case "Papply" :
          if (isfree(id, x._0)) {
            return true;
          }
          _x = x._1;
          continue ;
      
    }
  };
}

exports.isfree = isfree;
/* No side effect */
