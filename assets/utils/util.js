//获取cookie
export function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if(typeof(document)!="undefined"){
        if (arr = document.cookie.match(reg)){
            return (arr[2]);
        }else{
            return ''
        }
    }else{
        return ''
    }
}

//设置cookie,增加到vue实例方便全局调用
export function setCookie (c_name, value, expiredays) {
    if(value){
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";path=/;expires=" + exdate.toGMTString());
    }
};

//删除cookie
export function delCookie (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

// 频率计算
export const getRate = (rateType, rateNum) => {
    let result = '';
    switch (rateType) {
        case 1:
            result = '每天' + rateNum + '节';
            break;
        case 2:
            result = '每周' + rateNum + '节';
            break;
        case 3:
            result = '每月' + rateNum + '节';
            break;
        case 4:
            result = '每季' + rateNum + '节';
            break;
        case 5:
            result = '每半年' + rateNum + '节';
            break;
        case 6:
            result = '每年' + rateNum + '节';
            break;
        case 7:
            result = '每三年' + rateNum + '节';
            break;
    }
    return result;
}

// 频率名
export const getRateTypeName  = (rateType) =>{
    let result = '';
    switch (rateType) {
        case 1:
            result = '每天';
            break;
        case 2:
            result = '每周';
            break;
        case 3:
            result = '每月';
            break;
        case 4:
            result = '每季';
            break;
        case 5:
            result = '每半年';
            break;
        case 6:
            result = '每年';
            break;
        case 7:
            result = '每三年';
            break;
    }
    return result;
}