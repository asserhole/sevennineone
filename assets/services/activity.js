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

// 商家排行榜
export const listLeaderBorder = (params)=>{
    return request({
        url: `${prefix}/listLeaderBorder`,
        method: 'GET',
        data: params,
    })
}

// 加入活动
export const joinActivity = (params) =>{
    return request({
        url: `${prefix}/joinActivity`,
        method: 'GET',
        data: params,
    })
}

// 查看商户是否加入某活动
export const getExistsByAidAndMid = (params)=>{
    return request({
        url: `${prefix}/getExistsByAidAndMid`,
        method: 'GET',
        data: params,
    })
}

// 新增活动
export const addActivity = (params)=>{
    return request({
        url: `${prefix}/addActivity`,
        method: 'POST',
        data: params,
    })
}

// 查找活动 审核
export const listActivityForAudit = (params)=>{
    return request({
        url: `${prefix}/listActivityForAudit`,
        method: 'GET',
        data: params,
    })
}

// 审核活动
export const auditActivity = (params)=>{
    return request({
        url: `${prefix}/auditActivity`,
        method: 'GET',
        data: params,
    })
}