import request from '~/assets/utils/request'

const prefix = '/snoReply'

export const getMyReplyByMId = (params) =>{
    return request({
        url: `${prefix}/getMyReplyByMId`,
        method: 'GET',
        data: params,
    })
}

export const listReplyByAidAndMid = (params) =>{
    return request({
        url: `${prefix}/listReplyByAidAndMid`,
        method: 'GET',
        data: params,
    })
}

// 报名
export const saveReply = (params) =>{
    return  request({
        url: `${prefix}/reply`,
        method: 'POST',
        data: params,
    })
}

// 报名信息
export const getReplyDetail = (params) =>{
    return request({
        url: `${prefix}/getReplyDetail`,
        method: 'GET',
        data: params,
    })
}

// 统一下单
export const wechatPay = (params) => {
    return request({
        url: `/wechat/unifiedorder`,
        method: 'POST',
        data: params,
    })
}

// 礼物列表
export const listGiftRecordByReplyId = (params)=>{
    return request({
        url: `/snoReplyDonation/listDonationByReplyId`,
        method: 'GET',
        data: params,
    })
}

// 我的报名列表
export const listReplyByUser = (params) =>{
    return request({
        url: `${prefix}/listReplyByUser`,
        method: 'GET',
        data: params,
    })
}

// 我的助学记录列表
export const listDonateListByUser = (params) =>{
    return request({
        url: `/snoReplyDonation/listDonationByUser`,
        method: 'GET',
        data: params,
    })
}

// 可预约试课列表
export const listAppointmentA = (params) =>{
    return request({
        url: `${prefix}/listAppointmentA`,
        method: 'GET',
        data: params,
    })
}

// 预约试课
export const submitAppoint = (params) =>{
    return request({
        url: `snoAppointment/save`,
        method: 'POST',
        data: params,
    })
}

// 我的预约试课
export const listMyAppointment = (params) =>{
    return request({
        url: `snoAppointment/listByUserId`,
        method: 'GET',
        data: params,
    })
}

// 取消预约
export const cancelAppointment = (params) =>{
    return request({
        url: `snoAppointment/cancelAppointment`,
        method: 'GET',
        data: params,
    })
}

// 查看手机号
export const getMobile = (params) =>{
    return request({
        url: `snoAppointment/getMobile`,
        method: 'GET',
        data: params,
    })
}

// 商家报名记录
export const listMerchantReply = (params) =>{
    return request({
        url: `${prefix}/listMerchantReply`,
        method: 'GET',
        data: params,
    })
}