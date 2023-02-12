import request from '@/utils/request'

// 获取后台传感器数据
export function sendMsg(msg) {
    return request({
      url: '/mqtt/sendMsg',
      method: 'get',
      params:{
        "msg":msg
      }
    })
}  