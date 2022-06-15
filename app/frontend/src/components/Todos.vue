<template>
    <div class="todo-form">
        <label>新增代辦事項</label><i class="fas fa-pencil-alt"></i><hr>
        <input class="todo-input" type="text" @keyup.enter="createTodo" placeholder="請輸入待辦事項">
    </div>
</template>

<script>

export default {
  name: 'TodoInput',
  methods: {
    createTodo ($event) {
      this.$emit('addtodo', $event.target.value)
      $event.target.value = ''
    }
  }
}
</script>
