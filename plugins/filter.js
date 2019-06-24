import Vue from 'vue'
import { isNumber } from 'lodash';
// 时间格式化
var padDate=function(va){
    va=va<10?'0'+va:va;
    return va
}

export function formatDate (val) {
    var value=new Date(val);
    var year=value.getFullYear();
    var month=padDate(value.getMonth()+1);
    var day=padDate(value.getDate());
    var hour=padDate(value.getHours());
    var minutes=padDate(value.getMinutes());
    var seconds=padDate(value.getSeconds());
    return year+'-'+month+'-'+day+' '+hour+':'+minutes;
    //+':'+seconds
}

export function schoolInfoFilter(val){
    let result = '未知'
    switch (val) {
        case 0:
            result = '未入学';break;
        case 1:
            result = '幼儿园';break;
        case 2:
            result = '小学';break;
        case 3:
            result = '初中';break;
        case 4:
            result = '高中';break;
    }
    return result;
}

export function timeago(val){   //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
    var value = new Date(val.replace(/-/g, '/'));
    var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();   //获取当前时间毫秒
    var diffValue = now - value.getTime();//时间差

    if(diffValue < 0){
        return;
    }
    var minC = diffValue/minute;  //计算时间差的分，时，天，周，月
    var hourC = diffValue/hour;
    var dayC = diffValue/day;
    var weekC = diffValue/week;
    var monthC = diffValue/month;
    var result = '';
    if(monthC >= 1 && monthC <= 3){
        result = " " + parseInt(monthC) + "月前"
    }else if(weekC >= 1 && weekC <= 3){
        result = " " + parseInt(weekC) + "周前"
    }else if(dayC >= 1 && dayC <= 6){
        result = " " + parseInt(dayC) + "天前"
    }else if(hourC >= 1 && hourC <= 23){
        result = " " + parseInt(hourC) + "小时前"
    }else if(minC >= 1 && minC <= 59){
        result =" " + parseInt(minC) + "分钟前"
    }else if(diffValue >= 0 && diffValue <= minute){
        result = "刚刚"
    }else {
        var datetime = new Date();
        datetime.setTime(val);
        var Nyear = datetime.getFullYear();
        var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
        var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
        var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
        var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
        var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
        result = Nyear + "-" + Nmonth + "-" + Ndate
    }
    return result;
}

export const yuan = value =>
    isNumber(value) ? `¥${(value / 100).toFixed(2)}` : value;



let filters = {
    formatDate,schoolInfoFilter,timeago,yuan
}

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

export default filters
