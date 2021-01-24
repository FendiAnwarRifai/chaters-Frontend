import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.use(VueSweetalert2)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idUser: null || localStorage.getItem('id'),
    token: null || localStorage.getItem('token'),
    dataPersonal: {},
    dataAll: []
  },
  mutations: {
    SET_USER (state, payload) {
      state.user = payload
      state.token = payload.token
      state.idUser = payload.id
    },
    REMOVE_TOKEN (state) {
      state.token = null
    },
    SET_USER_ALL (state, payload) {
      state.dataAll = payload
    },
    SET_USER_BYLOGIN (state, payload) {
      state.dataPersonal = payload
    }
  },
  actions: {
    interceptorRequest (context) {
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        return config
      }, function (error) {
        return Promise.reject(error)
      })
    },
    interceptorResponse (context) {
      axios.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        if (error.response.status === 401) {
          if (error.response.data.message === 'Invalid Token') {
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            context.commit('REMOVE_TOKEN')
            Vue.swal.fire({
              title: 'Error!',
              text: `${error.response.data.message}`,
              icon: 'error',
              confirmButtonText: 'Relogin'
            })
            router.push('/')
          } else if (error.response.data.message === 'Token Expired') {
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            context.commit('REMOVE_TOKEN')
            Vue.swal.fire({
              title: 'Error!',
              text: `${error.response.data.message}`,
              icon: 'error',
              confirmButtonText: 'Relogin'
            })
            router.push('/')
          }
        }
        return Promise.reject(error)
      })
    },

    login (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/api/auth/login', payload)
          .then(res => {
            const result = res.data.result
            localStorage.setItem('token', result.token)
            localStorage.setItem('id', result.id)
            context.commit('SET_USER', result)
            context.dispatch('interceptorRequest')
            context.dispatch('expiredTokenProses', result.expiredToken)
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    register (context, payload) {
      return new Promise((resolve, reject) => {
        axios.post('http://localhost:5000/api/auth/register', payload)
          .then(res => {
            const result = res.data
            resolve(result)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getUsers (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:5000/api/chat/')
          .then((result) => {
            context.commit('SET_USER_ALL', result.data.result)
            resolve(result.data.result)
          })
          .catch((error) => {
            reject(error.response)
          })
      })
    },
    userByLogin (context, payload) {
      return new Promise((resolve, reject) => {
        axios.get(`http://localhost:5000/api/chat/personal/${context.state.idUser}`)
          .then(res => {
            context.commit('SET_USER_BYLOGIN', res.data.result[0])
            resolve(res.data.result[0])
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    updateUserLogin (context, payload) {
      return new Promise((resolve, reject) => {
        axios.patch(`http://localhost:5000/api/chat/edit-personal/${context.state.idUser}`, payload)
          .then((result) => {
            resolve(result)
          })
          .catch((error) => {
            reject(error.response)
          })
      })
    },
    updateImages (context, payload) {
      return new Promise((resolve, reject) => {
        axios.patch(`http://localhost:5000/api/chat/edit-personal/${context.state.idUser}`, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
          .then(res => {
            Vue.swal.fire({
              title: 'Success!',
              text: 'Photo Profile Changed Successfully',
              icon: 'success',
              confirmButtonText: 'Ok'
            })
            resolve(res)
          })
          .catch(err => {
            Vue.swal.fire({
              title: 'Error!',
              text: `${err.response.data.message}`,
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          })
      })
    }
  },
  modules: {
  },
  getters: {
    isLogin (state) {
      return state.token !== null
    },
    dataPersonal (state) {
      return state.dataPersonal
    },
    dataAll (state) {
      return state.dataAll
    }
  }
})
