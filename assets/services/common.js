import request from '~~/assets/utils/request.js'

const prefix = '/common';

export const getHomeData = (params) => {
    return request({
        url: `${prefix}/getHomeData`,
        method: 'GET',
        data: params,
    })
}
