import request from '@/utils/request'

// 修改设备对照表
export function updateDeviceSymbol(form) {
    return request({
      url: '/symbol/updateDeviceSymbol',
      method: 'post',
      data:form
    })
  }  

// 修改设备对照表
export function deleteDeviceSymbol(ruleName) {
  return request({
    url: '/symbol/deleteDeviceSymbol',
    method: 'post',
    params:{
      ruleName:ruleName
    }
  })
}  