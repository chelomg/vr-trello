<template>
  <div class="block my-3 px-6 py-2 border-2 border-gray-200">
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
