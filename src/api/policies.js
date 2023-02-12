import request from '@/utils/request'

// 修改策略信息
export function updateScene(form) {
    return request({
      url: '/devicepolicies/updateScene',
      method: 'post',
      data:form
    })
}  


// 添加策略信息
export function addScene(form) {
  return request({
    url: '/devicepolicies/addScene',
    method: 'post',
    data:form
  })
}

// 删除策略信息
export function delScene(id) {
  return request({
    url: '/devicepolicies/delRules/'+id,
    method: 'post',
  })
}


// 删除勾选的策略信息
export function delChecksRules(ids) {
  return request({
    url: '/devicepolicies/delChecksRules',
    method: 'post',
    data:ids
  })
}


// 获取所有策略信息
export function getAllList(params) {
  return request({
    url: '/devicepolicies/getAllList',
    method: 'get',
    params: params
  })
}

// 通过id获取规则
export function getSceneById(id) {
  return request({
    url: '/devicepolicies/getSceneById/'+id,
    method: 'get',
  })
}

export function exportMemberList(){
  return request({
    url: '/devicepolicies/exportMemberList',
    method: 'get',
    responseType: 'blob',
    header: {
      headers: {
        'Content-Type': 'application/x-download'
      }
    },
  })
}

// export function exportMemberList() {
//   return axios({
//     url: '/api/devicepolicies/exportMemberList',
//     method: 'get',
//     header: {
//       headers: {
//         'Content-Type': 'application/x-download'
//       }
//     },
//     responseType: 'blob' //指明返回格式
//   })
// }

// //下载接口
// export var downLoadRulesFrom = () => exportMemberList()