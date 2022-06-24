<template>
  <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
    <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
      <form @submit="onSubmit">
        <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">Add List</h5>
        <input type="text" class="text-gray-700 text-base mb-4" v-model="name" placeholder="type list name ... " />
        <input type="submit" value="Create New List"
          class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"/>
      </form>
    </div>
    <div v-for="list in lists" :key="list.id">
      <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        <i @click="deleteList(list.id)" class="flex flex-row-reverse">X</i>
        <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">{{ list.name }}</h5>
        <p class="text-gray-700 text-base mb-4">
          {{ list.description }}
        </p>
        <a :href="'/lists/'+list.id+'/lists'" type="button"
          class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Create New Card</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
const apiUrlPrefix = 'http://localhost:3000/api/v1/boards/'

export default {
  name: 'HomeView',
  data: function () {
    return {
      lists: [],
      name: '',
      apiUrl: ''
    }
  },
  computed: {
    ...mapGetters(['isLogin']),
    boardId () {
      return this.$route.params.boardId
    }
  },
  methods: {
    fetchlists () {
      axios.get(this.apiUrl, {
        headers: {
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        }
      }).then((response) => {
        if (response.data.message === 'ok') {
          this.lists = response.data.lists
        }
      })
    },
    onSubmit (event) {
      event.preventDefault()
      axios.post(this.apiUrl, {
        uid: localStorage.getItem('uid'),
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        name: this.name
      }).then((response) => {
        const list = response.data
        this.lists.unshift(list)
      })
      this.name = ''
    },
    deletelist (id) {
      axios.delete(this.apiUrl + `/${id}`, {
        headers: {
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client')
        }
      })
      this.lists = this.lists.filter((list) => list.id !== id)
    }
  },
  created () {
    if (this.isLogin) {
      this.apiUrl = apiUrlPrefix + `${this.boardId}/lists`
      this.fetchlists()
    }
  },
  watch: {
    isLogin: async function (val) {
      if (val === false) {
        this.$router.push({ path: '/login' })
      }
    },
    boardId: async function (val) {
      this.apiUrl = apiUrlPrefix + `${val}/lists`
    }
  }
}
</script>
