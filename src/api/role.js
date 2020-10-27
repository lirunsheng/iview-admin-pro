import axios from '@/libs/api.request'

export const getRoleList = (pageNum, pageSize) => {
  if (!pageNum) pageNum = 1
  if (!pageSize) pageSize = 10

  return axios.request({
    url: 'role/list',
    params: {
      pageNum,
      pageSize
    },
    method: 'get'
  })
}

export const getRoleByName = (pageNum, pageSize, roleName) => {
  if (!pageNum) pageNum = 1
  if (!pageSize) pageSize = 10

  return axios.request({
    url: 'role/roleNameList',
    params: {
      pageNum,
      pageSize,
      roleName
    },
    method: 'get'
  })
}

export const updateRole = (role) => {
  const data = role
  return axios.request({
    url: 'role/updateRole',
    data,
    method: 'post'
  })
}

export const insertRole = (role) => {
  const data = role
  return axios.request({
    url: 'role/insertRole',
    data,
    method: 'post'
  })
}

export const deleteRole = (id) => {
  return axios.request({
    url: 'role/deleteRole',
    params: {
      id
    },
    method: 'get'
  })
}
