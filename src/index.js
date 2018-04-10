import {commonParams, config} from './config/config'
import utils from './utils/utils'
import ajax from './ajax/ajax'

function pika(url, options) {
    let pathName = location.pathname   
    if (!config[pathName]) {
        return
    }
    let _obj = {
        v: '', //version 客户端版本号
        ut: '', // token
        uid: '', // 用户uid
        pid: config[pathName].p_id, // 页面ID
        inf: '', // inFrom 内部来源
        cha: 'H5', // channel 所属渠道编码：IOS／ANDROID／H5/APPLET（小程序）／WEBSITE（官网）
        ct: '', // curTime 当前时间戳毫秒
        bt: '', //businessType 业务类型：init/pv/event
    }
    ajax(url, Object.assign(commonParams, _obj))
}

export default pika