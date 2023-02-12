
 export function format(value){
    var dt = new Date(value);
    let year = dt.getFullYear();
    let month = dt.getMonth() + 1;
    let date = dt.getDate();
    let hour = dt.getHours();
    let minute = dt.getMinutes();
    let second = dt.getSeconds();
    return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
  }
  
  
export  function timeTrans(time, type) {
    let date = new Date(new Date(time).getTime() + 8 * 3600 * 1000);
    date = date.toJSON();
    if (type === 1) {
      date = date.substring(0, 10);
    } else {
      date = date.substring(0, 19).replace("T", " ");
    }
    return date;
  }
    
    


export default {format,timeTrans}

  
  