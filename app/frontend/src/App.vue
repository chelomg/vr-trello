<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div class="main-avatar" v-for="s in subscribers" :key="s">
    <img class="avatar" :src="s.url">
  </div>
  <br>
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
import axios from 'axios'

const cors = 'https://cors-anywhere.herokuapp.com/'
const apiUrl = 'https://tinyfac.es/api/users'
export default {
  name: 'App',
  data: function () {
    return {
      authorName: 'chelong',
      subscribers: []
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
  },
  mounted () {
    axios.get(`${cors}${apiUrl}`)
      .then((response) => {
        this.subscribers = response.data
      })
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
.avatar{
  float: left;
  margin-top: 1em;
  margin-right: 1em;
  position: relative;
  height: 50px;
  width: 50px;

  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
}
</style>
