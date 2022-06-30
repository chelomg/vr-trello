<template>
  <draggable v-model="cards" item-key="id" group="list" @change="this.drag">
    <template #item="{element}">
      <Card :card="element" />
    </template>
  </draggable>
  <form @submit="onSubmit" class="flex justify-between">
    <input type="text"
      class="my-2 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      v-model="cardName" placeholder="Type Card Name" />
    <input type="submit" value="+"
      class="inline-block my-2 mx-1 px-3 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" />
  </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'CardList',
  props: ['list'],
  data: function () {
    return {
      cardName: ''
    }
  },
  computed: {
    cards: {
      get () {
        return JSON.parse(JSON.stringify(this.list)).cards
      },
      set (val) {
        const payload = {
          listId: this.list.id,
          cards: val
        }
        this.$store.commit('updateCards', payload)
      }
    }
  },
  methods: {
    ...mapActions(['dragCard', 'addCard']),
    drag (event) {
      const listId = this.list.id
      this.dragCard({ event, listId })
    },
    onSubmit (event) {
      event.preventDefault()
      if (this.cardName !== '') {
        const cardName = this.cardName
        const listId = this.list.id
        this.addCard({ listId, cardName })
      }
      this.cardName = ''
    }
  }
}
</script>
