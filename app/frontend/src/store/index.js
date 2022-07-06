import { createStore } from 'vuex'
import login from './modules/login.js'
import list from './modules/list.js'

export default createStore({
  modules: {
    login,
    list
  }
})
