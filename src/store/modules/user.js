import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { reqGetUserInfo, reqLogin } from '@/api/request'

const LOGGED = 1, NOT_LOGGED = 0

const state = {
  status: NOT_LOGGED,
  id: '',
  name: '',
  role: '',
  mobile: '',
  secretMobile: '未绑定',
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
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile
    if (mobile.length === 11) {
      state.secretMobile = mobile.slice(0, 6) + 'XXXXX'
    } else {
      state.secretMobile = '未绑定'
    }
  }
}

const actions = {
  // user login
  login() {
    return new Promise((resolve, reject) => {
      reqLogin().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      reqGetUserInfo().then(response => {
        const { data } = response.data
        // for test
        data.role = 'manager/c3j.experts/测评中心'
        const { id, name, role, mobile } = data
        // commit user state
        commit('SET_STATUS', LOGGED)
        commit('SET_ID', id)
        commit('SET_NAME', name)
        commit('SET_ROLE', role)
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
      resolve()
    })
  },

  // bind mobile
  bindMobile({ commit }, mobile) {
    return new Promise(resolve => {
      commit('SET_MOBILE', mobile)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}