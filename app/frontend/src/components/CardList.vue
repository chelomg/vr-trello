<template>
  <draggable v-model="cards" item-key="id" group="list" @change="this.drag">
    <template #item="{element}">
      <Card :card="element" />
    </template>
  </draggable>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'CardList',
  props: ['list'],
  data: function () {
    return {
      cards: JSON.parse(JSON.stringify(this.list)).cards
    }
  },
  methods: {
    ...mapActions(['dragCard']),
    drag (event) {
      const listId = this.list.id
      this.dragCard({ event, listId })
    }
  }
}
</script>
