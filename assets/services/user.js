import request from '../utils/request';

const prefix = '/wechat';

// 获取access_token
export const accessToken = (params)=>{
  return request({
    url:`${prefix}/accessToken`,
    method:'GET',
    data:params
  })
}

// 通过token获取信息
export const token = ()=>{
  return request({
    url:`${prefix}/token`,
    method:'GET'
  })
}

// 登录
export const loginApi = (params) => {
  return request({
    url: `${prefix}/login`,
    method: 'POST',
    data: params,
  })
}

// 修改昵称
export const retsetName = (params) => {
  return request({
    url: `${prefix}/retsetName`,
    method: 'POST',
    data: params,
  })
}

// 修改密码
export const retsetPassword = (params) => {
  return request({
    url: `${prefix}/retsetPassword`,
    method: 'POST',
    data: params,
  })
}

// 获取用户地址列表
export const getAddress = (params) => {
  return request({
    url: `${prefix}/getAddress`,
    method: 'GET',
    data: params,
  })
}

// 获取用户地址
export const getAddAddressById = (params) => {
  return request({
    url: `${prefix}/getAddAddressById`,
    method: 'GET',
    data: params,
  })
}

// 添加用户地址
export const addAddress = (params) => {
  return request({
    url: `${prefix}/addAddress`,
    method: 'POST',
    data: params,
  })
}


// 发送验证码
export const sendSms = (params) =>{
  return request({
    url: `/snoUser/sendSms`,
    method: 'GET',
    data: params,
  })
}

// 绑定手机号
export const bingPhone = (params) =>{
  return request({
    url: `/snoUser/bindPhone`,
    method: 'GET',
    data: params,
  })
}

// 获取用户手机号
export const getMobileInfo = (params) =>{
  return request({
    url: `/snoUser/getMobileInfo`,
    method: 'GET',
    data: params,
  })
}