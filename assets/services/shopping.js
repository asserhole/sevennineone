import request from '../utils/request';

const prefix = '/snoMerchant';

export const listMerchant = (params) => {
  return request({
    url: `${prefix}/listMerchant`,
    method: 'GET',
    data: params,
  })
}

export const seller = (params) => {
  return request({
    url: `${prefix}/seller`,
    method: 'GET',
    data: params,
  })
}

export const listSubject = (params) => {
  return request({
    url: `${prefix}/listSubject`,
    method: 'GET',
    data: params,
  })
}
// 查找商家参加活动
export const listByMerchantId = (params) => {
  return request({
    url: `/snoAlliance/listByMerchantId`,
    method: 'GET',
    data: params,
  })
}
// 活动页列表
export const listActivity = (params) =>{
  return request({
    url: `/snoAlliance/listActivity`,
    method: 'GET',
    data: params,
  })
}

// 商家入驻
export const saveMerchant = (params)=>{
  return request({
    url: `${prefix}/save`,
    method: 'POST',
    data: params,
  })
}

//入驻历史信息查找
export const getMerchantJoinInfo = (params)=>{
  return request({
    url: `${prefix}/getMerchantJoinInfo`,
    method: 'GET',
    data: params,
  })
}

//通过token查找用户课程
export const listSubjectByToken = (params)=>{
  return request({
    url: `${prefix}/listSubjectByToken`,
    method: 'GET',
    data: params,
  })
}

// 保存课程
export const saveSubjectBatch = (params)=>{
  return request({
    url: `${prefix}/saveBatch`,
    method: 'POST',
    data: params,
  })
}

// 修改课程
export const updateSubject = (params)=>{
  return request({
    url: `${prefix}/updateSubject`,
    method: 'POST',
    data: params,
  })
}

// 保存详细地址
export const updateAddressInfo = (params)=>{
  return request({
    url: `${prefix}/updateAddressInfo`,
    method: 'GET',
    data: params,
  })
}

// 获取商家的图片
export const getMerchantImageList = (params) =>{
  return request({
    url: `${prefix}/getImageList`,
    method: 'GET',
    data: params,
  })
}

// 后台审核列表
export const listMerchantForAudit = (params)=>{
  return request({
    url: `${prefix}/listMerchantForAudit`,
    method: 'GET',
    data: params,
  })
}

// 审核接口
export const auditMerchant = (params)=>{
  return request({
    url: `${prefix}/auditMerchant`,
    method: 'GET',
    data: params,
  })
}