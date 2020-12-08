import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { reqGetUserInfo, reql } from '@/api/request'

const LOGGED = 1, NOT_LOGGED = 0

const state = {
  status: NOT_LOGGED,
  id: '',
  name: '',
  roles: [],
  mobile: '',
}

const mutations = {
  SET_STATUS: (state, status) => {
    state.status = status
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile
  }
}

const actions = {
  // user login
  login({ commit }) {
    return new Promise((resolve, reject) => {
      reqLogin().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      reqGetUserInfo().then(response => {
        const { data } = response

        if (!data) {
          reject('验证过期，请重新登录')
        }

        const { id, name, role, mobile } = data

        // roles justify
        if (!role || role.length <= 0) {
          reject('角色权限信息为空')
        }

        const roles = role.split('/')

        // commit user state
        commit('SET_STATUS', LOGGED)
        commit('SET_ID', id)
        commit('SET_NAME', name)
        commit('SET_ROLES', roles)
        commit('SET_MOBILE', mobile)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit }) {

  },

  // remove login status
  resetStatus({ commit }) {
    return new Promise(resolve => {
      commit('SET_STATUS', NOT_LOGGED)
      commit('SET_ID', '')
      commit('SET_NAME', '')
      commit('SET_ROLE', '')
      commit('SET_MOBILE', '')
    })
  }
}

export default {
  state,
  mutations,
  actions,
}