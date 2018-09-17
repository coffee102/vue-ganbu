/**
 * Created by jiachenpan on 16/11/18.
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  if(!time){
    return ''
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth()+1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}
export function isEmpty(data){
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}
export function getfullyear(data){

    if(typeof data == "undefined" || data == null || data == ""){
        return ""
    }else{
      var datetime = new Date(data)
      return datetime.getFullYear()

    }
}
export function getmonth(data){
    if(typeof data == "undefined" || data == null || data == ""){
      return ""
    }else{
      var datetime = new Date(data)
      return datetime.getMonth()
    }

}
export function getdate(data){
    if(typeof data == "undefined" || data == null || data == ""){
      return ""
    }else{
      var datetime = new Date(data)
      return datetime.getDate()

    }

}
export function getYMDate(data){
    if(typeof data == "undefined" || data == null || data == ""){
      return ""
    }else{
      var d = new Date(data)
      var  resDate = d.getFullYear() + '-' + (d.getMonth() + 1) 
      return resDate
    }

}
export function DateFormat(data){
    if(typeof data == "undefined" || data == null || data == ""){
      return ""
    }else{
      var d = new Date(data)
      var  resDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
      return resDate
    }

}
export function convertDateFromString(dateString) {
  if (dateString) { 
    var date = new Date(dateString.replace(/-/,"/")) 
    return date;
  }
}
//计算年龄
/*根据出生日期算出年龄*/
export function GetAge(Birthday){
  if(!Birthday){
    return ""
  }
    var returnAge;
    var strBirthday = new Date(Birthday);
    var birthYear = strBirthday.getFullYear();
    var birthMonth = strBirthday.getMonth() + 1;
    var birthDay = strBirthday.getDate()       

    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();
    
    if(nowYear == birthYear){
        returnAge = 0;//同年 则为0岁
    }
    else{
        var ageDiff = nowYear - birthYear ; //年之差
        if(ageDiff > 0){
            if(nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay;//日之差
                if(dayDiff < 0)
                {
                    returnAge = ageDiff - 1;
                }
                else
                {
                    returnAge = ageDiff ;
                }
            }
            else
            {
                var monthDiff = nowMonth - birthMonth;//月之差
                if(monthDiff < 0)
                {
                    returnAge = ageDiff - 1;
                }
                else
                {
                    returnAge = ageDiff ;
                }
            }
        }
        else
        {
            returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
        }
    }
    
    return returnAge;//返回周岁年龄
    
}