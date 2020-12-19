const getters = {
  status: state => state.user.status,
  auth: state => state.user.auth,
  role: state => state.user.role,
}
export default getters