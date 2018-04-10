
import utils from './utils'

export default (opt) => {

  return new Promise ((resolve,reject) => {

    var xhr = new XMLHttpRequest()

    xhr.open('POST','http://10.3.3.109:8080/tracker/post', true)

    xhr.setRequestHeader("If-Modified-Since","0")

    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")

    xhr.setRequestHeader("Cache-Control","no-cache")

    xhr.responseType = 'json'

    xhr.onreadystatechange = () => {

      if(xhr.readyState == 4){

        if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){

          resolve(xhr.response)

        } else {

          resolve(xhr.response)

        }
      }

    }

    const data = utils.queryStringify(opt)

    xhr.send(data)

  })

}
