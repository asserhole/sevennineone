import request from '~/assets/utils/request'

const prefix = '/snoAlliance'

export const getActivityById = (params) =>{
    return request({
        url: `${prefix}/getActivityById`,
        method: 'GET',
        data: params,
    })
}