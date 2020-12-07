import axios from 'axios'

axios.defaults.withCredentials = true

const instance = axios.create({
  baseURL: '',
  timeout: 30000
})

// get
export function get (url, params) {
  return instance.get(url, {
    params
  })
}

// post
export function post (url, data, headers) {
  return instance.post(url, data, {headers: {accessToken: headers}})
}

// put
export function put (url, data) {
  return instance.put(url, data)
}

// delete
export function del (url) {
  return instance.delete(url)
}