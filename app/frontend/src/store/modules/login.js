import axios from 'axios'
const apiUrl = 'http://localhost:3000/v1/auth'

const state = {
  email: '',
  password: '',
  passwordComfirmation: '',
  uid: '',
  access_token: '',
  client: '',
  isLogin: false,
  signinPage: true
}

const getters = {
  isLogin (state) {
    state.isLogin = (localStorage.getItem('uid') !== null)
    return state.isLogin
  },
  signinPage: (state) => (state.signinPage),
  userEmail: (state) => (state.uid)
}

const actions = {
  async signup ({ commit }, signupData) {
    const response = await axios.post(apiUrl, {
      email: signupData.email,
      password: signupData.password,
      password_comfirmation: signupData.passwordComfirmation
    })
    commit('setLoginData', response)
  },
  async signin ({ commit }, signinData) {
    const response = await axios.post(apiUrl + '/sign_in', {
      email: signinData.email,
      password: signinData.password,
      password_comfirmation: signinData.passwordComfirmation
    })
    commit('setLoginData', response)
  },
  async signout ({ commit }) {
    const response = await axios.delete(apiUrl + '/sign_out', {
      test: { test: 'test' },
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    })
    commit('deleteLoginData', response)
  },
  async jumpSigninPage ({ commit }, data) {
    commit('setPageStatus', data)
  }
}

const mutations = {
  setLoginData: (state, data) => {
    localStorage.setItem(
      'access-token',
      data.headers['access-token']
    )
    localStorage.setItem('client', data.headers.client)
    localStorage.setItem('uid', data.headers.uid)
    state.access_token = data.headers['access-token']
    state.client = data.headers.client
    state.uid = data.headers.uid
    state.isLogin = true
  },
  deleteLoginData: (state) => {
    state.access_token = ''
    state.client = ''
    state.uid = ''
    localStorage.removeItem('uid')
    localStorage.removeItem('access-token')
    localStorage.removeItem('client')
    state.isLogin = false
  },
  setPageStatus: (state, data) => {
    state.signinPage = data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
