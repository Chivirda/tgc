import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    loginInfo: {},
    user: {},
    objects: []
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading'
    },
    auth_success(state, token, loginInfo) {
      state.status = 'success',
      state.token = token,
      state.loginInfo = loginInfo
    },
    auth_error(state) {
      state.status = 'error'
    },
    logout(state) {
      state.status = '',
      state.token = ''
    },
    setUserInfo(state, data) {
      state.user = data
    },
    setObjectsInfo(state, data) {
      state.objects = [...data]
    }
  },
  actions: {
    login({commit}, loginInfo) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.post('http://aspt.tgc2-energo.ru/token', qs.stringify(loginInfo))
          .then(resp => {
            const token = resp.data.access_token
            const loginInfo = resp.data.loginInfo
            localStorage.setItem('token', token)
            commit('auth_success', token, loginInfo)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({commit}) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    getUserInfo({commit}) {
      return new Promise((resolve) => {
        axios.get('http://aspt.tgc2-energo.ru/user', {
        headers: { 'Authorization' : `Bearer ${this.state.token}`}
        })
        .then(resp => {
          commit('setUserInfo', resp.data)
          resolve(resp.data)
        })
      })
    },
    getObjectsInfo({commit}) {
      return new Promise((resolve) => {
        axios.get('http://aspt.tgc2-energo.ru/points', {
        headers: { 'Authorization' : `Bearer ${this.state.token}`}
        })
        .then(resp => {
          commit('setObjectsInfo', resp.data)
          resolve(resp.data)
        })
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    getUserInfo: state => state.user,
    getObjectsInfo: state => state.objects
  },
  modules: {
  }
})
