import axios from 'axios'

const axiosInstance = axios.create({
  // baseURL: 'https://programsunisinuserver--jorgenr17.repl.co/api',
  baseURL: ''
})

// Add a response interceptor
axiosInstance.interceptors.request.use(
  config => {
    // let token = store.getters.getToken
    // if (token) {
    //   config.headers['Authorization'] = token
    // }
    return config
  },
  error => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  response => {
    // console.log(response)
    if (response.status === 200 || response.status === 201) {
      return response
    } else {
      return Promise.reject(new Error(response.data.error || 'Error'))
    }
  },
  error => {
    if (error.response.status === 401) {
      // store.dispatch('LOGOUT')
      // store.commit('setUserData', { image: null, firstName: null, lastName: null, email: null })
      // store.commit('setUserStatus', false)
      // router.push('/login').catch(err => err)
      // return false
    }
    return Promise.reject(error.response.data.error || error)
  }
)

export default axiosInstance
