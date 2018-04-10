export const commonParams = {
    v: '', //version 客户端版本号
    ut: '', // token
    uid: '', // 用户uid
    pid: '', // 页面ID
    inf: '', // inFrom 内部来源
    cha: 'H5', // channel 所属渠道编码：IOS／ANDROID／H5/APPLET（小程序）／WEBSITE（官网）
    ct: '', // curTime 当前时间戳毫秒
    bt: '', //businessType 业务类型：init/pv/event
  }

  export const config = {
    '/my/home.html': {
        p_id: 15,
        p_name: 'userCenter'
    },
    'index.html': {
        p_id: 1,
        p_name: 'home'
    }
}
