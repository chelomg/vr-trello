<template>
  <draggable v-model="cards" item-key="id" group="list" @change="this.dragCard">
    <template #item="{element}">
      <Card :card="element" />
    </template>
  </draggable>
</template>

<script>
import axios from 'axios'
const apiUrlPrefix = 'http://localhost:3000/api/v1/boards/'
export default {
  name: 'CardList',
  props: ['list'],
  data: function () {
    return {
      cards: JSON.parse(JSON.stringify(this.list)).cards
    }
  },
  methods: {
    dragCard (event) {
      const cardEvent = event.added || event.moved
      if (cardEvent) {
        const cardId = cardEvent.element.id
        const url = apiUrlPrefix + `${this.list.board_id}/cards/${cardId}/drag`
        axios.put(url, {
          uid: localStorage.getItem('uid'),
          'access-token': localStorage.getItem('access-token'),
          client: localStorage.getItem('client'),
          list_id: this.list.id,
          position: cardEvent.newIndex + 1
        }).then((response) => {
          console.log(response)
        })
      }
    }
  }
}
</script>
