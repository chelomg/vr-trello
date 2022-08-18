<template>
  <div class="block flex justify-between border-2 rounded-lg bg-amber-100 my-3 px-4 py-2 border-yellow-900">
    <div class="break-all" v-html="formattedText"></div>
    <i @click="deleteCard(card)">x</i>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'CardBlock',
  props: ['card'],
  computed: {
    formattedText () {
      return this.linkify(this.card.name)
    }
  },
  methods: {
    ...mapActions(['deleteCard']),
    linkify (inputText) {
      const pattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim
      let text = inputText.replace(pattern1, '<a href="$1" class="text-blue-500 underline" target="_blank">$1</a>')

      const pattern2 = /(^|[^/])(www\.[\S]+(\b|$))/gim
      text = text.replace(pattern2, '$1<a href="http://$2" class="text-blue-500 underline" target="_blank">$2</a>')
      return text
    }
  }
}
</script>
