<template>
  <draggable v-model="this.allLists" item-key="id" @change="this.dragList"
    class="p-10 grid items-start grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">

    <template #item="{element}">
      <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
        <i @click="DeleteList(element.id)" class="flex flex-row-reverse">X</i>
        <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">{{ element.name }}</h5>
        <p class="text-gray-700 text-base mb-4">
          {{ element.description }}
        </p>
        <CardList :list="element" />
      </div>
    </template>
  </draggable>
  <div class="block grid-auto-rows m-10 p-6 rounded-lg shadow-lg bg-white max-w-sm">
    <form @submit="onSubmit">
      <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">New List</h5>
      <input type="text"
        class="my-2 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        v-model="name" placeholder="Type List Name" />
      <input type="submit" value="Create List"
        class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" />
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
      name: ''
    }
  },
  components: {
    CardList
  },
  computed: {
    ...mapGetters(['isLogin', 'allLists']),
    allLists: {
      get () {
        return this.$store.state.list.lists
      },
      set (val) {
        this.$store.commit('updateList', val)
      }
    },
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
    },
    DeleteList (id) {
      if (confirm('Are you sure?')) {
        this.deleteList(id)
      }
    }
  },
  created () {
    if (this.isLogin) {
      this.initialBoardId(this.boardId)
      this.fetchLists()
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
    }
  }
}
</script>
