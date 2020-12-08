import { get, post } from './axios.js'
import { convertRes2Blob } from '@/utils/util.js'


export const reqSendCode = (data) => post('/iadmin/sms/send_code', data)

export const reqCheckCode = (data) => post('/iadmin/sms/check_code', data)

export const reqGetUserInfo = () => get('/iadmin/user/info')

export const reqChangeUserInfo = (data) => post('/iadmin/user/change', data)

export const reqSetCookie = () => get('/api/v1/cookie')

export const reqDownloadSampleFile = () => {
  get('/api/v1/recommend/download').then(res => {
    convertRes2Blob(res)
  })
}

export const reqUploadFile = (id, data) => post('/api/v1/recommond/upload?id='+id, data, {type: 'file', 'Content-Type': 'application/x-www-form-urlencoded'})
