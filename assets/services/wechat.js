import request from '~~/assets/utils/request.js'

const prefix = '/wechat';

export const getJssdk = (params) => {
    return request({
        url: `${prefix}/getJssdk`,
        method: 'GET',
        data: params,
    })
}