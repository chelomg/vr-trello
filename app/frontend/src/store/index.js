import { createStore } from 'vuex'
import counter from './modules/counter.js'
import login from './modules/login.js'

export default createStore({
  modules: {
    counter,
    login
  }
})
