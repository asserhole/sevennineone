import {getCookie} from "../assets/utils/util";


export default {

    IS_RELEASE: false, // true线上，false测试

    // BASE_URL: 'http://localhost:3000/api', // 测试

    // BASE_URL: 'http://www.djtp.com/api', // 生产

    // IMG_URL: 'http://localhost:9000/', // 测试

    IMG_URL: '', // 生产（使用码云Gitee Pages 服务）

    HEADERS: {
        'Content-Type': 'application/json;charset=UTF-8',
        'token': getCookie("token")
    },

    // APPID:'wxda38bb8a650afb21', //生产
    // APPID:'wx582bf42c28be84d2',   // 测试
    APPSECRET:'0a4bf7eded33e4a96a70b39ec009ca23',

    TIMEOUT: 12000, // api超时时间

}