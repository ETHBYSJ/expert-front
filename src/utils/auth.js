import Cookies from 'js-cookie'

const TokenKey = 'iadmin'

export function getToken() {
  //return Cookies.get(TokenKey)
  return 'testToken'
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}