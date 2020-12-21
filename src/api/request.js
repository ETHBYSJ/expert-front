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
export const reqUploadDeptFile = (id, data) => post('/api/v1/recommend/upload?submitID='+id, data, {type: 'file', 'Content-Type': 'application/x-www-form-urlencoded'})
// 下载推荐表
export const reqDownloadDeptFile = () => get('/api/v1/recommend/download')

// ------------------------ 专家 ---------------------------------
// 获取提交记录
export const reqGetPorfRecords = () => get('/api/v1/apply/records')
// 上传表格
export const reqUploadExpertFile = (data) => post('/api/v1/apply/upload', data, {type: 'file', 'Content-Type': 'application/x-www-form-urlencoded'})
// 下载推荐表
export const reqDownloadExpertFile = () => get('/api/v1/apply/download')
// 上传图片
export const reqUploadExpertImage = (data) => post('/api/v1/apply/uploadPhoto', data, {type: 'file', 'Content-Type': 'application/x-www-form-urlencoded'})
// 提交基本信息
export const reqCommitProfBaseMsg = (data) => post('/api/v1/apply/submitBase', data)
// 获取基本信息
export const reqGetProfBaseMsg = () => get('/api/v1/apply/getBase')
// 提交专业类别
export const reqCommitProfCate = (data) => post('/api/v1/apply/submitMajor', data)
// 获取专业类别
export const reqGetProfCate = () => get('/api/v1/apply/getMajor')
// 提交专攻领域
export const reqCommitProfField = (data) => post('/api/v1/apply/submitResearchField', data)
// 获取专攻领域
export const reqGetProfField = () => get('/api/v1/apply/getResearchField')
// 提交个人履历
export const reqCommitProfResume = (data) => post('/api/v1/apply/submitResume', data)
// 获取个人履历
export const reqGetProfResume = () => get('/api/v1/apply/getResume')
// 提交意见评价
export const reqCommitProfOpinion = (data) => post('/api/v1/apply/submitOpinion', data)
// 获取意见评价
export const reqGetProfOpinion = () => get('/api/v1/apply/getOpinion')