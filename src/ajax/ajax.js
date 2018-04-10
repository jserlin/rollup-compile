
import utils from '../utils/utils'
function ajax(url, options) {
    return new Promise ((resolve,reject) => {

        let xhr = new XMLHttpRequest()
    
        xhr.open('POST', url, true)
    
        xhr.setRequestHeader("If-Modified-Since","0")
    
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    
        xhr.setRequestHeader("Cache-Control","no-cache")
    
        xhr.responseType = 'json'
    
        xhr.onreadystatechange = () => {
    
          if(xhr.readyState == 4){
    
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
    
              resolve(xhr.response)
    
            } else {
    
              reject(xhr.response)
    
            }
          }
    
        }
    
        const data = utils.queryStringify(opt)
    
        xhr.send(data)
    
      })
}
export default ajax
