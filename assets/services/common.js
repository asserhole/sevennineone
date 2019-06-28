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

// 发表文章
export const saveArticle = (params)=>{
    return request({
        url: `/snoArticle/save`,
        method: 'POST',
        data: params,
    })
}

// 文章详情
export const getArticleDetail = (params)=>{
    return request({
        url: `/snoArticle/getById`,
        method: 'GET',
        data: params,
    })
}

//我的文章列表
export const listMyArticle = (params)=>{
    return request({
        url: `/snoArticle/listMyArticle`,
        method: 'GET',
        data: params,
    })
}


// 保存链接
export const saveActivityLink = (params)=>{
    return request({
        url: `/snoActivityLink/save`,
        method: 'POST',
        data: params,
    })
}
// 删除链接
export const deleteLink = (params)=>{
    return request({
        url: `/snoActivityLink/delete`,
        method: 'get',
        data: params,
    })
}
