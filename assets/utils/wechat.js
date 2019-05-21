// 转跳到需要用户授权的页面
import config from '~/config/config'

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