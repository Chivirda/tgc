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
    objects: [],
    objectInfo: [],
    currentObject: {
      id: localStorage.getItem('currentObjectId') || '',
      pointName: localStorage.getItem('currentObjectName') || ''
    }
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
    },
    setObjectIndications(state, data) {
      state.objectInfo = data
    },
    setCurrentObject(state, object) {
      state.currentObject = object
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
      return new Promise(resolve => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    },
    getUserInfo({commit}) {
      return new Promise(resolve => {
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
      return new Promise(resolve => {
        axios.get('http://aspt.tgc2-energo.ru/points', {
        headers: { 'Authorization' : `Bearer ${this.state.token}`}
        })
        .then(resp => {
          commit('setObjectsInfo', resp.data)
          resolve(resp.data)
        })
      })
    },
    getObjectIndications({commit}, objectId) {
      return new Promise(resolve => {
        axios.get(`http://aspt.tgc2-energo.ru/indication/${objectId}`, {
          headers: { 'Authorization' : `Bearer ${this.state.token}`}
        })
        .then(resp => {
          commit('setObjectIndications', resp.data)
          resolve(resp.data)
        })
      })
    },
    setCurrentObject({commit}, object) {
      localStorage.setItem('currentObjectId', object.id)
      localStorage.setItem('currentObjectName', object.pointName)
      commit('setCurrentObject', object)
    },
    addIndications(indications) {
      return new Promise(resolve => {
        axios.post(`http://aspt.tgc2-energo.ru/indication/${indications}`, {
          headers: { 
            'Authorization' : `Bearer ${this.state.token}`
          }
        })
        .then(resp => {
          resolve(resp.data)
        })
      })
    }
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status
  },
  modules: {
  }
})
