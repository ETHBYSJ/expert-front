export default {
  login({commit}, userInfo) {
    //console.log(res.data.data)
    commit('save_userInfo', {userInfo})
    commit('displayMobile')
    commit('checkAuth')
  },

  bindMobile({commit}, mobile) {
    commit('bindMobile', mobile)
    commit('displayMobile')
    commit('checkAuth')
  },

  changeAuthInfo({commit}, data) {
    commit('change_authInfo', data.name, data.department, data.position, data.email)
    commit('checkAuth')
  }
}