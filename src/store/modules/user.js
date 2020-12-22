import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { reqGetUserInfo, reqLogin } from '@/api/request'

const state = {
  status: 'LOGOUT',

  id: '',
  mobile: '',
  secretMobile: '未绑定',

  name: '',
  department: '',
  position: '',
  email: '',
  auth: 0,
  
  role: '', 
}

const mutations = {
  SET_STATUS: (state, status) => {
    state.status = status
  },

  SET_ID: (state, id) => {
    state.id = id
  },
  SET_MOBILE: (state, mobile) => {
    state.mobile = mobile
    if (mobile.length === 11) {
      state.secretMobile = mobile.slice(0, 6) + 'XXXXX'
    } else {
      state.secretMobile = '未绑定'
    }
  },

  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_DEPARTMENT: (state, department) => {
    state.department = department
  },
  SET_POSITION: (state, position) => {
    state.position = position
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  CHECK_AUTH: (state) => {
    if (state.name && state.name != '' 
        && state.department && state.department != '' 
        && state.position && state.position != '') {
      state.auth = 1
    }
    else {
      state.auth = 0
    }
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  

}

const actions = {
  // user login
  login({ commit }) {
    return new Promise((resolve, reject) => {
      reqLogin().then(response => {
        commit('SET_STATUS', 'LOGIN')
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
        const { id, mobile, name, department, position, email, role } = response.data.data
        // commit user state
        commit('SET_ID', id)
        commit('SET_MOBILE', mobile)
        commit('SET_NAME', name)
        commit('SET_DEPARTMENT', department)
        commit('SET_POSITION', position)
        commit('SET_EMAIL', email)
        commit('CHECK_AUTH')
        commit('SET_ROLE', role)
        resolve(response.data.data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit }) {
    return new Promise(resolve => {
      resolve()
    })
  },

  // remove login status
  resetStatus({ commit }) {
    return new Promise(resolve => {
      commit('SET_STATUS', 'LOGOUT')
      commit('SET_ID', '')
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