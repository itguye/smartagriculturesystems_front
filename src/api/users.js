import request from '@/utils/request'

// 分页获取用户信息
export function getAllUsers(keyword, pageSize, pageNum) {
    return request({
        url: '/admin/list',
        method: 'get',
        data: {
            keyword,
            pageSize,
            pageNum
        }
    })
}


export function getUserInfoByName(name) {
    return request({
      url: '/admin/getUserInfoByName',
      method: 'get',
      params:{
        name:name
      }
    })
}


export function updateUserById(id,from) {
  return request({
    url: '/admin/update/'+id,
    method: 'post',
    data:from
  })
}



export function updatePwd(from) {
  return request({
    url: '/admin/updatePassword',
    method: 'post',
    data:from
  })
}

