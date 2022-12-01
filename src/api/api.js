import { request } from './request.js'
// const { tokenUrl, hasLogin, testUrl } = store.state

let hostUrl = 'https://runjava.1lesson.cn/'
/**
 * 登录
 * 解绑
 */
export const getUserInfo = (params) => request(false, hostUrl + '/getInfo', null, 'GET')