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
  async fetchLists ({ commit, state }) {
    const apiUrl = apiPrefix + `${state.boardId}/lists`
    const response = await axios.get(apiUrl, {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    })
    if (response.data.message === 'ok') {
      commit('setLists', response.data.lists)
    }
  },
  async addList ({ commit, state }, listName) {
    const apiUrl = apiPrefix + `${state.boardId}/lists`
    axios.post(apiUrl, {
      uid: localStorage.getItem('uid'),
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      name: listName
    }).then((response) => {
      commit('newList', response.data)
    })
  },
  async deleteList ({ commit, state }, id) {
    const apiUrl = apiPrefix + `${state.boardId}/lists`
    axios.delete(apiUrl + `/${id}`, {
      headers: {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client')
      }
    })

    commit('removeList', id)
  },
  async dragList ({ commit, state }, event) {
    const position = event.moved.oldIndex
    let rawListsObj = null
    if (isProxy(state.lists)) {
      rawListsObj = toRaw(state.lists)
    } else {
      rawListsObj = state.lists
    }
    const url = apiPrefix + `${state.boardId}/lists/${rawListsObj[position].id}/drag`
    axios.put(url, {
      uid: localStorage.getItem('uid'),
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      position: event.moved.newIndex + 1
    })

    commit('setListPosition', position)
  },
  async dragCard ({ commit, state }, { event, listId }) {
    const cardEvent = event.added || event.moved
    if (cardEvent) {
      const cardId = cardEvent.element.id
      const url = apiPrefix + `${state.boardId}/cards/${cardId}/drag`
      axios.put(url, {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        list_id: listId,
        position: cardEvent.newIndex + 1
      }).then((response) => {
        commit('setCardPosition', response)
      })
    }
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
  removeList: (state, id) => {
    state.lists = state.lists.filter((list) => list.id !== id)
  },
  setListPosition: (idx) => {
    console.log(idx)
  },
  setCardPosition: (response) => {
    console.log(response)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
