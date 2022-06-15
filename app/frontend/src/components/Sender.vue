<template>
  <div class="sender rounded-lg"> {{ msg }}</div>
</template>

<script>
export default {
  name: 'SenderBlock',
  data: function () {
    return {
      msg: 'I am sender.'
    }
  },
  created () {
    setTimeout(() => {
      this.$emitter.emit('newLetter', {
        msg: 'haha.',
        alert: 'please receive.'
      }, 3000)
    })
  }
}
</script>
