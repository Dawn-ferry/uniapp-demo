import { request } from './request.js'

let hostUrl = 'https://runjava.1lesson.cn'

export const getUserInfo = (params) => request(false, hostUrl + '/getInfo', null, 'GET')
export const getattendance = (params) => request(false, hostUrl + '/attendance/queryPunchInformation', null, 'GET')
export const getattendanceRecord = (params) => request(false, hostUrl + '/attendance/record', params, 'POST')
export const queryAttendanceCalendar = (params) => request(false, hostUrl + '/attendance/queryAttendanceCalendar?attendanceDate=' + params, null, 'get')


export const queryAttendanceSummary = (params) => request(false, hostUrl + '/attendance/queryAttendanceSummary?attendanceDate=' + params, null, 'get')