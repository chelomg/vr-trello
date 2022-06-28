import { createStore } from 'vuex'
import counter from './modules/counter.js'
import login from './modules/login.js'
import list from './modules/list.js'

export default createStore({
  modules: {
    counter,
    login,
    list
  }
})
