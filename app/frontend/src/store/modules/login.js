import axios from 'axios'
const rootPath = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000' : ''
const apiUrl = rootPath + '/api/v1/auth'

const state = {
  email: '',
  password: '',
  passwordConfirmation: '',
  uid: '',
  access_token: '',
  client: '',
  isLogin: false,
  authHeader: {},
  initFormDataWithAuthToken: null
}

const getters = {
  isLogin (state) {
    state.isLogin = (localStorage.getItem('uid') !== null)
    if (state.isLogin) {
      state.authHeader = {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
      state.initFormDataWithAuthToken = new FormData()
      state.initFormDataWithAuthToken.append('uid', localStorage.getItem('uid'))
      state.initFormDataWithAuthToken.append('access-token', localStorage.getItem('access-token'))
      state.initFormDataWithAuthToken.append('client', localStorage.getItem('client'))
    }
    return state.isLogin
  },
  userEmail (state) {
    state.uid = localStorage.getItem('uid')
    return state.uid
  }
}

const actions = {
  async signup ({ commit }, signupData) {
    const response = await axios.post(apiUrl, {
      email: signupData.email,
      password: signupData.password,
      password_confirmation: signupData.passwordConfirmation
    })
    commit('setLoginData', response)
  },
  async signin ({ commit }, signinData) {
    const response = await axios.post(apiUrl + '/sign_in', {
      email: signinData.email,
      password: signinData.password,
      password_confirmation: signinData.passwordConfirmation
    })
    commit('setLoginData', response)
  },
  async signout ({ commit, state }) {
    // TODO: need to redesign when token expired
    commit('deleteLoginData')
    await axios.delete(apiUrl + '/sign_out', {
      headers: state.authHeader
    })
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
