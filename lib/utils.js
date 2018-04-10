
const utils = {
  /**
   * @param {Object} obj
   * @returns {string}
   * @example
   * util.queryStringify({name:'zhansan',age:23}) =>  'name=zhansan&age=23'
   *
   */

  queryStringify (obj) {
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

  },
  /**
   * 获取cookie
   * @param {String} name
   * @return {Strng | Null} 
   */
  getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
  },

 /**
  * 判断是否是app 环境
  * @return {Boolean}
  */
  isApp () {
       return navigator.userAgent.indexOf('ody') > -1;
   }()
}

export default utils
