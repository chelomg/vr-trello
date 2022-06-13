<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <Foot author="chelong" />
</template>

<script>
import Foot from './components/Foot.vue'

export default {
  name: 'App',
  components: {
    Foot
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
