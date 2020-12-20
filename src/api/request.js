import { get, post } from './axios.js'
import { convertRes2Blob } from '@/utils/util.js'


export const reqSendCode = (data) => post('/iadmin/sms/send_code', data)

export const reqCheckCode = (data) => post('/iadmin/sms/check_code', data)

export const reqGetUserInfo = () => get('/iadmin/user/info')

export const reqChangeUserInfo = (data) => post('/iadmin/user/change', data)

// 模拟登陆，set-cookie
export const reqLogin = () => get('/api/v1/cookie')



// ------------------------ 部门 --------------------------------
// 根据id获得提交推荐信息
export const reqGetRecMsg = (id) => get('/api/v1/recommend/getSubmit?submitID='+id)
// 获取推荐记录（简略）
export const reqGetRecList = () => get('/api/v1/recommend/records')
// 提交推荐记录
export const reqCommitRecMsg = (data) => post('/api/v1/recommend/commit', data)
// 上传文件
export const reqUploadRecFile = (id, data) => post('/api/v1/recommend/upload?submitID='+id, data, {type: 'file', 'Content-Type': 'application/x-www-form-urlencoded'})
// 下载推荐表
export const reqDownloadSampleFile = () => {
  get('/api/v1/recommend/download').then(res => {
    convertRes2Blob(res)
  })
}

// ------------------------ 专家 ---------------------------------
// 上传表格
export const reqUploadExpertFile = (data) => {new Promise(resolve => {resolve()})}
// 上传图片
export const reqUploadExpertImage = (data) => {new Promise(resolve => {resolve()})}