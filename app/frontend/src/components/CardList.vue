<template>
  <draggable v-model="cards" item-key="id" group="list" @change="this.drag">
    <template #item="{element}">
      <Card :card="element" />
    </template>
  </draggable>
  <form @submit="onSubmit">
    <input type="text" class="text-gray-700 text-base mb-4" v-model="cardName" placeholder="type list name ... " />
    <input type="submit" value="+"
      class="inline-block mx-4 px-3.5 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" />
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
