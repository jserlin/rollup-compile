
    /**
     * url参数格式化
     * 例：?param=1
     * 参数得到方式：paramsObj.param
     */
    export function paramsFormat(url) {
        let qInd = url.indexOf('?');
        let sharpInd = url.indexOf('#'); //路由
        let search = "";
        let paramsList = [];
        let paramsObj = {};

        if (qInd >= 0) {
            if (sharpInd > 0) {
                search = url.substring(qInd + 1, sharpInd);
            } else {
                search = url.substring(qInd + 1);
            }
            paramsList = search.split('&');
            for (let ind in paramsList) {
                let param = paramsList[ind];
                if(param) {
                    let pind = param.indexOf("=");
                    if (pind >= 0) {
                        paramsObj[param.substring(0, pind)] = param.substr(pind + 1);
                    } else {
                        paramsObj[param] = "";
                    }
                }

            }
        }
        return paramsObj;
    }
    /**
    * @param {Object} obj
    * @returns {string}
    * @example
    * util.queryStringify({name:'zhansan',age:23}) =>  'name=zhansan&age=23'
    *
    */
 
   export function queryStringify(obj) {
     function toQueryPair(key,value) {
 
       if (value==='') {
 
         return key;
 
       }
 
       return key + '=' + encodeURIComponent(value==='' ? '' : String(value));
 
     }
 
     var result = [];
 
     for (var key in obj) {
 
       key = encodeURIComponent(key);
 
       var values = obj[key];
 
       if (values && values.constructor == Array) {
 
         var queryValues = [];
 
         for (var i = 0, len = values.length; i < len; i++) {
 
           queryValues.push(toQueryPair(key, values[i]));
 
         }
 
         result = result.concat(queryValues);
 
       } else {
 
         result.push(toQueryPair(key,values));
 
       }
 
     }
 
 
     return result.join('&');
 
   }
