import request from '@/utils/request'

// 获取后台传感器数据
export function getChartSensorData(name,startTime,endTime) {
    return request({
      url: '/datapresentaion/getChartData',
      method: 'post',
      data: {
        name,
        startTime,
        endTime
      }
    })
}  

// 从后台获取传感器的数据
export function getDataList() {
  return request({
    url: '/datapresentaion/getDataList',
    method: 'get',
  })
}  

// 获取设备集合
export function getDeviceList(name,symbol,type,ruleName) {
  return request({
    url: '/datapresentaion/getDeviceList',
    method: 'post',
    data: {
      name,
      symbol,
      type,
      ruleName
    }
  })
}  

// 添加设备
export function addDevice(form) {
  return request({
    url: '/datapresentaion/addDevice',
    method: 'post',
    data:form
  })
}  


