<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div class="main-counter">
    <p>Root component: Vue Counter</p>
    <p class="display-count"> {{ counterCount }}</p>
    <p>
      <button class="counter-button" @click="increaseCounter">+</button>
      <button class="counter-button" @click="decreaseCounter">-</button>
    </p>
  </div>
  <Counter />
  <Foot v-bind:author="authorName"/>

</template>

<script>
import Foot from './components/Foot.vue'
import Counter from './components/Counter.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'App',
  data: function () {
    return {
      authorName: 'chelong'
    }
  },
  computed: {
    ...mapGetters(['counterCount'])
  },
  methods: {
    ...mapActions(['increaseCounter', 'decreaseCounter'])
  },
  components: {
    Foot,
    Counter
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
