<template>
  <img alt="Vue logo" src="./assets/logo.png">

  <Foot v-bind:author="name" v-on:emitPractice="eP"/>

</template>

<script>
import Foot from './components/Foot.vue'
import Todos from './components/Todos.vue'
import Receiver from './components/Receiver.vue'
import Sender from './components/Sender.vue'

export default {
  name: 'App',
  data: function () {
    return {
      name: '',
      todos: []
    }
  },
  methods: {
    thankyou () {
      alert(`${this.name}, alert success!`)
    },
    eP () {
      console.log('receive child component emit')
    },
    addTodo (todo) {
      this.todos.push(todo)
    },
    deleteTodo (todo) {
      const todoIndex = this.todos.indexOf(todo)
      if (todoIndex >= 0) {
        this.todos.splice(todoIndex, 1)
      }
    }
  },
  components: {
    Foot,
    Todos,
    Sender,
    Receiver
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
