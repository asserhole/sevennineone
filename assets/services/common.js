import request from '~~/assets/utils/request.js'

const prefix = '/common';

export const getHomeData = (params) => {
    return request({
        url: `${prefix}/getHomeData`,
        method: 'GET',
        data: params,
    })
}

// 图片上传
export const uploadImg = (params)=>{
    return request({
        url: `/image/upload`,
        method: 'POST',
        data: params,
    })
}

// 礼物接口
export const listGift = (params)=>{
    return request({
        url: `/gift/listGift`,
        method: 'GET',
        data: params,
    })
}

//