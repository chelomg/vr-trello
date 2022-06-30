<template>
  <div class="block flex justify-between border-2 rounded-lg bg-amber-100 my-3 px-4 py-2 border-yellow-900">
    <div>{{ card.name }}</div>
    <i @click="deleteCard(card)">x</i>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'CardBlock',
  props: ['card'],
  methods: {
    ...mapActions(['deleteCard'])
  }
}
</script>
