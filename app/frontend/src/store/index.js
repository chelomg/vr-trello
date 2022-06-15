import { createStore } from 'vuex'
import counter from './modules/counter.js'

export default createStore({
  modules: {
    counter
  }
})
