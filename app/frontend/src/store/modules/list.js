import axios from 'axios'
import { isProxy, toRaw } from 'vue'
const apiPrefix = 'http://localhost:3000/api/v1/boards/'

const state = {
  boardId: null,
  lists: []
}

const getters = {
  boardId: (state) => state.boardId,
  allLists: (state) => state.lists
}

const actions = {
  async initialBoardId ({ commit }, id) {
    commit('setBoardId', id)
  },
  async fetchLists ({ commit, state, rootState }) {
    const apiUrl = apiPrefix + `${state.boardId}/lists`
    const response = await axios.get(apiUrl, {
      headers: rootState.login.authHeader
    })
    if (response.data.message === 'ok') {
      commit('setLists', response.data.lists)
    }
  },
  async addList ({ commit, state, rootState }, listName) {
    const apiUrl = apiPrefix + `${state.boardId}/lists`
    const formData = rootState.login.initFormDataWithAuthToken
    formData.append('list[name]', listName)
    axios.post(apiUrl, formData).then((response) => {
      commit('newList', response.data)
    })
  },
  async deleteList ({ commit, state, rootState }, id) {
    const apiUrl = apiPrefix + `${state.boardId}/lists`
    axios.delete(apiUrl + `/${id}`, {
      headers: rootState.login.authHeader
    }).then((response) => {
      if (response.data.message === 'delete_ok') {
        commit('removeList', id)
      }
    })
  },
  async dragList ({ commit, state, rootState }, event) {
    const position = event.moved.newIndex
    const rawListsObj = isProxy(state.lists) ? toRaw(state.lists) : state.lists
    const url = apiPrefix + `${state.boardId}/lists/${rawListsObj[position].id}/drag`
    const formData = rootState.login.initFormDataWithAuthToken
    formData.append('list[position]', event.moved.newIndex + 1)
    axios.put(url, formData)
  },
  async dragCard ({ commit, state, rootState }, { event, listId }) {
    const cardEvent = event.added || event.moved
    if (cardEvent) {
      const cardId = cardEvent.element.id
      const url = apiPrefix + `${state.boardId}/cards/${cardId}/drag`
      const formData = rootState.login.initFormDataWithAuthToken
      formData.append('card[position]', cardEvent.newIndex + 1)
      formData.append('card[list_id]', listId)
      axios.put(url, formData)
    }
  },
  async addCard ({ commit, state, rootState }, { listId, cardName }) {
    const apiUrl = apiPrefix + `${state.boardId}/cards`
    const formData = rootState.login.initFormDataWithAuthToken
    formData.append('card[name]', cardName)
    formData.append('card[list_id]', listId)
    axios.post(apiUrl, formData).then((response) => {
      commit('newCard', response.data)
    })
  },
  async deleteCard ({ commit, state, rootState }, card) {
    const id = card.id
    const apiUrl = apiPrefix + `${state.boardId}/cards`
    axios.delete(apiUrl + `/${id}`, {
      headers: rootState.login.authHeader
    }).then((response) => {
      const listId = card.list_id
      if (response.data.message === 'delete_ok') {
        commit('removeCard', { listId, id })
      }
    })
  }
}

const mutations = {
  setBoardId: (state, id) => {
    state.boardId = id
  },
  setLists: (state, data) => {
    state.lists = data
  },
  newList: (state, list) => {
    state.lists.push(list)
  },
  updateList: (state, list) => {
    state.lists = list
  },
  removeList: (state, id) => {
    state.lists = state.lists.filter((list) => list.id !== id)
  },
  newCard: (state, card) => {
    const index = state.lists.findIndex((list) => list.id === card.list_id)
    if (index !== -1) {
      const rawlistObj = JSON.parse(JSON.stringify(state.lists[index]))
      rawlistObj.cards.push(card)
      state.lists.splice(index, 1, rawlistObj)
    }
  },
  updateCards: (state, payload) => {
    const listId = payload.listId
    const cards = payload.cards
    const index = state.lists.findIndex((list) => list.id === listId)
    if (index !== -1) {
      const rawlistObj = JSON.parse(JSON.stringify(state.lists[index]))
      rawlistObj.cards = cards
      console.log(rawlistObj)
      state.lists.splice(index, 1, rawlistObj)
    }
  },
  removeCard: (state, { listId, id }) => {
    const index = state.lists.findIndex((list) => list.id === listId)
    if (index !== -1) {
      const rawlistObj = JSON.parse(JSON.stringify(state.lists[index]))
      rawlistObj.cards = rawlistObj.cards.filter((card) => card.id !== id)
      state.lists.splice(index, 1, rawlistObj)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
