<template>
  <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
    <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
      <form @submit="onSubmit">
        <h5 class="my-2 text-gray-900 text-xl leading-tight font-medium mb-2">New Board</h5>
        <input type="text"
          class="my-2 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          v-model="name" placeholder="Type Board Name" />
        <input type="text"
          class="my-2 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          v-model="description" placeholder="Type Board Description" />
        <input type="submit" value="Create New Board"
          class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" />
      </form>
    </div>
    <div v-for="board in boards" :key="board.id">
      <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        <i @click="deleteBoard(board.id)" class="flex flex-row-reverse">X</i>
        <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">{{ board.name }}</h5>
        <p class="text-gray-700 text-base mb-4">
          {{ board.description }}
        </p>
        <router-link :to="`/boards/${board.id}`" type="button"
          class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
          See
          More</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
const apiUrl = 'http://localhost:3000/api/v1/boards'

export default {
  name: 'HomeView',
  data: function () {
    return {
      boards: [],
      name: '',
      description: ''
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    fetchBoards () {
      axios.get(apiUrl, {
        headers: {
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        }
      }).then((response) => {
        if (response.data.message === 'ok') {
          this.boards = response.data.boards
        }
      })
    },
    onSubmit (event) {
      event.preventDefault()
      axios.post(apiUrl, {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        name: this.name,
        description: this.description
      }).then((response) => {
        const board = response.data
        this.boards.unshift(board)
      })
      this.name = ''
      this.description = ''
    },
    deleteBoard (id) {
      axios.delete(apiUrl + `/${id}`, {
        headers: {
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        }
      })
      this.boards = this.boards.filter((board) => board.id !== id)
    }
  },
  created () {
    if (this.isLogin) {
      this.fetchBoards()
    }
  },
  watch: {
    isLogin: async function (val) {
      if (val === false) {
        this.$router.push({ path: '/login' })
      }
    }
  }
}
</script>
