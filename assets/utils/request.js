import axios from 'axios';
import config from '~~/config/config.js';
import { Toast } from 'mint-ui';
import store from '~/store/index'
import {getCookie} from "./util";

axios.defaults.baseURL = config.BASE_URL;
axios.defaults.timeout = config.TIMEOUT;
axios.defaults.headers = config.HEADERS;
axios.defaults.withCredentials = true

// 请求拦截器
axios.interceptors.request.use( request => {
    if(!axios.defaults.headers.token){
        axios.defaults.headers.token = store.openid?store.openid:getCookie('token')
        request.headers.token = axios.defaults.headers.token
    }
    if (!config.IS_RELEASE) {
        console.log(
            `${new Date().toLocaleString()}【 M=${request.url} 】P=`,
            request.params || request.data,
        );
    }
    return request;
}, error => {
    return Promise.reject(error);
});

export default async (options = { method: 'GET' }) => {
    let isdata = true;
    if (
        options.method.toUpperCase() !== 'POST'
        && options.method.toUpperCase() !== 'PUT'
        && options.method.toUpperCase() !== 'PATCH'
    ) {
        isdata = false;
    }
    const res = await axios({
        method: options.method,
        url: options.url,
        data: isdata ? options.data : null,
        params: !isdata ? options.data : null,
    });
    if (res.status >= 200 && res.status < 300) {
        if (!config.IS_RELEASE) {
            console.log(
                `${new Date().toLocaleString()}【接口响应：】`,
                res.data,
            );
        }
        // 浏览器环境弹出报错信息
        if(typeof window !== "undefined" && res.data.code !== 0) {
            Toast(res.data.msg);
        }
        return res.data;
    }else {
        if(typeof window !== "undefined" && res.data.code !== 0) {
            Toast('请求错误');
        }
    }

};
