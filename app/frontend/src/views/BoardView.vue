<template>
  <draggable v-model="lists" item-key="id" @change="this.dragList"
    class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">

    <template #item="{element}">
      <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        <i @click="deleteList(element.id)" class="flex flex-row-reverse">X</i>
        <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">{{ element.name }}</h5>
        <p class="text-gray-700 text-base mb-4">
          {{ element.description }}
        </p>
        <CardList :list="element" />
        <a :href="'/lists/'+element.id+'/lists'" type="button"
          class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Create
          New Card</a>
      </div>
    </template>
  </draggable>
  <div class="block m-10 p-6 rounded-lg shadow-lg bg-white max-w-sm">
    <form @submit="onSubmit">
      <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">Add List</h5>
      <input type="text" class="text-gray-700 text-base mb-4" v-model="name" placeholder="type list name ... " />
      <input type="submit" value="Create New List"
        class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" />
    </form>
  </div>
</template>

<script>
import CardList from '../components/CardList.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'HomeView',
  data: function () {
    return {
      name: '',
      lists: []
    }
  },
  components: {
    CardList
  },
  computed: {
    ...mapGetters(['isLogin', 'allLists']),
    boardId () {
      return this.$route.params.boardId
    }
  },
  methods: {
    ...mapActions(['addList', 'fetchLists', 'initialBoardId', 'dragList', 'deleteList']),
    onSubmit (event) {
      event.preventDefault()
      if (this.name !== '') {
        this.addList(this.name)
      }
      this.name = ''
    }
  },
  created () {
    if (this.isLogin) {
      this.initialBoardId(this.boardId)
      this.fetchLists()
      this.lists = this.allLists
    }
  },
  watch: {
    isLogin: async function (val) {
      if (val === false) {
        this.$router.push({ path: '/login' })
      }
    },
    boardId: async function (val) {
      this.initialBoardId(val)
      this.fetchLists()
    },
    allLists: async function (val) {
      this.lists = val
    }
  }
}
</script>
