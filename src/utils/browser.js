
const UA = navigator.userAgent
export function isApp() {
    return UA.indexOf('ody') > -1;
}
export function weixin() {
    return UA.indexOf('MicroMessenger') > -1;
}