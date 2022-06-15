const state = {
  count: 0
}

const getters = {
  counterCount: (state) => (state.count)
}

const actions = {
  async increaseCounter ({ commit }) {
    commit('increment')
  },
  async decreaseCounter ({ commit }) {
    commit('decrement')
  }
}

const mutations = {
  increment: (state) => (state.count++),
  decrement: (state) => (state.count--)
}

export default {
  state,
  getters,
  actions,
  mutations
}
