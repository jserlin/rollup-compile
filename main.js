
import utils from '../lib/utils'

import ajax from '../lib/ajax'

/**
 *
 * 埋点页面配置项
 * @returns {Object} pageTrack
 */


const getPageTrack =  ()  => {

  const pageTrack = {
    '/index.html': {
      pageId:1
    }
  }

  return pageTrack

}

/**
 *
 * 获取埋点公用参数
 * @param opt
 * @return {Object} params
 */


const getTrackParams = (opt) => {

  const getTime = new Date().getTime()

  let areaInfo = null
  let uid = ''
  let ut = ''
  let pid = ''
  let ev = ''

  if (window.localStorage) {   //处理safari 无痕浏览器
    areaInfo = Vue.localStorage.getItem('areaInfo')
    uid = Vue.localStorage.getItem('lyfuid') || ''
    ut =  utils.getCookie('ut') || ''
    pid = opt.pid || ''
    ev = opt.ev || ''
  }


  let area = ''

  if (areaInfo) {
    area = areaInfo.city.name
  }

  const data = JSON.stringify({
    "area": area
  })

  const params = {
    bt: opt.bt || 'pv',
    cha: 'H5',
    ct: getTime,
    data,
    ev,
    inf: '',
    of: '',
    pid,
    tv: '1.0',
    uid,
    ut
  }

  return params

}




/**
 *
 * 获取页面埋点日志统计
 *
 * @return null
 *
 */

const sendTrack = () => {

  if (!utils.isApp) {
     return
  }

  const pathname = location.pathname

  const pageTrack = getPageTrack()

  if (pageTrack[pathname]) {

    const pid = item.pageId

    const opt = { pid }

    const trackParams = getTrackParams(opt)

    ajax(trackParams)
  }
}

sendTrack()
