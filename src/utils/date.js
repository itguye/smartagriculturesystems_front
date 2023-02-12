// date.js
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

export function str2Date(dateStr, separator) {
  if (!separator) {
    separator = "-";
  }
  let dateArr = dateStr.split(separator);
  let year = parseInt(dateArr[0]);
  let month;
  //处理月份为04这样的情况
  if (dateArr[1].indexOf("0") == 0) {
    month = parseInt(dateArr[1].substring(1));
  } else {
    month = parseInt(dateArr[1]);
  }
  let day = parseInt(dateArr[2]);
  let date = new Date(year, month - 1, day);
  return date;
}


export function isDuringDate(beginDateStr, endDateStr) {
  var curDate = new Date(),
    beginDate = new Date(beginDateStr),
    endDate = new Date(endDateStr);
  if (curDate >= beginDate && curDate <= endDate) {
    return true;
  }
  return false;
}

export function dateLessThan30S(sensorTime,controllerTime) {
  var curTime = new Date();// 当前时间
 // var curTime_subtractMinute = new Date(curTime.setMinutes(curTime.getMinutes() - 1));// 当前时间减1分钟
  var curTime_SubSeconds = new Date(curTime.setSeconds(curTime.getSeconds() - 30));//当前时间减10s

  
  console.log("减1分钟后的分钟数"+curTime_SubSeconds.getMinutes())
 
  

  if(sensorTime != null){
    if(curTime_SubSeconds <= sensorTime){
      console.log("返回true")
      console.log("传感器的分钟数"+sensorTime)
        return true;
       
    }
  }

  if(controllerTime !=null)
  {
    if(curTime_SubSeconds <= controllerTime){
      console.log("返回true")
      console.log("控制器的分钟数"+controllerTime.getMinutes())
      return true;
    }
  }
  console.log("返回false")
  return false;
}