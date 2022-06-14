<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div class="content-form">
    <div class="field is-horizontal">
      <div class="field-body">
        <div class="field">
          <p class="control">
            <input class="input" type="text" placeholder="你的暱稱" v-bind:nickname="name" v-model="name">
          </p>
        </div>
      </div>
    </div>
    <button class="button is-primary is-light" v-on:click="thankyou">送出</button>
  </div>
  <Foot v-bind:author="name" v-on:emitPractice="eP"/>

</template>

<script>
import Foot from './components/Foot.vue'

export default {
  name: 'App',
  data: function () {
    return {
      name: ''
    }
  },
  methods: {
    thankyou () {
      alert(`${this.name}, alert success!`)
    },
    eP () {
      console.log('receive child component emit')
    }
  },
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
