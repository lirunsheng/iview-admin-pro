import axios from '@/libs/api.request'

export const login = ({userName, password}) => {
  const data = {
    username: userName,
    password
  }
  return axios.request({
    url: 'user/login',
    data,
    method: 'post'
  })
}

export const getUserList = (pageNum, pageSize) => {
  if (!pageNum) pageNum = 1
  if (!pageSize) pageSize = 10

  return axios.request({
    url: 'user/list',
    params: {
      pageNum,
      pageSize
    },
    method: 'get'
  })
}

export const queryUser = (pageNum, pageSize, username) => {
  if (!pageNum) pageNum = 1
  if (!pageSize) pageSize = 10

  return axios.request({
    url: 'user/query',
    params: {
      pageNum,
      pageSize,
      username
    },
    method: 'get'
  })
}

export const insertUser = (user) => {
  const data = user
  return axios.request({
    url: 'user/insertUser',
    data,
    method: 'post'
  })
}

export const updateUser = (user) => {
  const data = user
  return axios.request({
    url: 'user/saveUser',
    data,
    method: 'post'
  })
}

export const delUser = (id) => {
  return axios.request({
    url: 'user/delUser',
    params: {
      id
    },
    method: 'get'
  })
}

export const getUserInfo = () => {
  return axios.request({
    url: 'user/verify',
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
