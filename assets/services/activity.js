import request from '~/assets/utils/request'

const prefix = '/snoAlliance'

export const getActivityById = (params) =>{
    return request({
        url: `${prefix}/getActivityById`,
        method: 'GET',
        data: params,
    })
}

// 预约试课通过活动查找数据
export const listMerchantByActivityId = (params) =>{
    return request({
        url: `${prefix}/listMerchantByActivityId`,
        method: 'GET',
        data: params,
    })
}