import { request } from './request.js'
// const { tokenUrl, hasLogin, testUrl } = store.state

let hostUrl = 'http://192.168.1.158:8080'
/**
 * 登录
 * 解绑
 */
export const getUserInfo = (params) => request(false, hostUrl + '/getInfo', null, 'GET')