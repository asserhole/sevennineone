// 转跳到需要用户授权的页面
import config from '~/config/config'
import {getJssdk} from "../services/wechat";

export const wechat_authorize_userinfo = (redirect_url)=>{
    redirect_url = encodeURI(redirect_url);
    let userinfoUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.APPID}&redirect_uri=${redirect_url}&response_type=code&scope=snsapi_userinfo&state=dugaomin#wechat_redirect`;
    window.location.href = userinfoUrl;
}

// 静默调用，只获取openid
export const wechat_arthorize_base = (redirect_url)=>{ // 静默调用，只获取openid
    redirect_url = encodeURI(redirect_url);
    let baseUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.APPID}&redirect_uri=${redirect_url}&response_type=code&scope=snsapi_base&state=dugaomin#wechat_redirect`;
    window.location.href = baseUrl;
}

// 判断是否是微信浏览器
export const isWeixin = ()=>{
    return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1
}

// 微信jssdk初始化
export const wxJssdkInit = async (url,apiList,callback) =>{
    let res = await getJssdk({
        url:url
    })
    let wx = require('weixin-js-sdk');
    wx.config(
        {
            debug: false,
            appId: config.APPID,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,
            jsApiList: apiList
        }
    )
    wx.ready(function(){
        window.wx = wx;
        callback(wx)
    })
}