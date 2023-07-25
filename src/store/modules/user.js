import { login, logout, getInfo, passwordMobileLogin, mobileLogin } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    userId: '',
    roles: [],
    type: '2'
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_TYPE: (state, type) => {
      state.type = type
    }
  },

  actions: {
    // 设置登录者的状态
    Type ({ commit }, type) {
      commit('SET_TYPE', type)
    },
    // 登录
    Login ({ commit }, userInfo) {
      // const username = userInfo.username
      return new Promise((resolve, reject) => {
        if (user.state.type === '1') {
          passwordMobileLogin(userInfo).then(response => {
            const data = response.data
            const tokenStr = data.tokenHead + data.token
            setToken(tokenStr)
            localStorage.setItem('timeOut', Date.parse(new Date()))
            commit('SET_TOKEN', tokenStr)
            resolve(data)
          }).catch(error => {
            reject(error)
          })
        } else if (user.state.type === '2') {
          // let picauthcode = userInfo.picauthcode
          login(userInfo).then(response => {
            const data = response.data
            const tokenStr = data.tokenHead + data.token
            setToken(tokenStr)
            localStorage.setItem('timeOut', Date.parse(new Date()))
            commit('SET_TOKEN', tokenStr)
            resolve(data)
          }).catch(error => {
            reject(error)
          })
        } else if (user.state.type === '3') {
          mobileLogin(userInfo).then(response => {
            const data = response.data
            const tokenStr = data.tokenHead + data.token
            setToken(tokenStr)
            localStorage.setItem('timeOut', Date.parse(new Date()))
            commit('SET_TOKEN', tokenStr)
            resolve(data)
          }).catch(error => {
            reject(error)
          })
        }
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            throw new Error('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.username)
          commit('SET_USERID', data.userId)
          commit('SET_AVATAR', data.icon)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
          localStorage.removeItem('timeOut')
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
        localStorage.removeItem('timeOut')
      })
    }
  }
}

export default user
