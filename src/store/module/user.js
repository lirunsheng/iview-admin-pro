import { login, logout, getUserInfo } from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, {userName, password}) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          const data = res.data
          if (data.code && data.code === 200) {
            commit('setToken', data.data.token)
            commit('setUserName', data.data.username)
            commit('setUserId', data.data.id)
            if (data.data.avator) {
              commit('setAvator', data.data.avator)
            } else {
              commit('setAvator', 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png')
            }
            commit('setAccess', [])
          }
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        /* logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          resolve()
        }).catch(err => {
          reject(err)
        }) */
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(res => {
            const data = res.data
            if (data.code == 200) {
              commit('setAvator', 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png')
              /* commit('setUserName', data.name)
               commit('setUserId', data.user_id)
               commit('setAccess', data.access) */
              commit('setHasGetInfo', true)

              resolve({ access: true })
            } else {
              commit('setToken', '')
              commit('setAccess', [])
              this.$router.push('login')
            }
          }).catch(err => {
            resolve({ access: false })
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
