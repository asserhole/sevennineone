import {getCookie} from "../assets/utils/util";

export default {

    IS_RELEASE: false, // true线上，false测试

    BASE_URL: 'http://localhost:3000/api', // 测试

    // BASE_URL: 'https://www.duchengling.com/api', // 生产

    // IMG_URL: 'http://localhost:9000/', // 测试

    IMG_URL: '', // 生产（使用码云Gitee Pages 服务）

    HEADERS: {
        'Content-Type': 'application/json;charset=UTF-8',
        'token': getCookie("token")
    },

    APPID:'wx582bf42c28be84d2',
    APPSECRET:'62699c6d73fc1c43e36bf9a38b5365b7',
    // REDIRECT_URL:'https://www.duchengling.com/user',
    REDIRECT_URL:'http://127.0.0.1:3000/user',

    TIMEOUT: 12000, // api超时时间

}