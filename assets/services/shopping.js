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