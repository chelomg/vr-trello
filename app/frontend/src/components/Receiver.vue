<template>
    <div class="receiver rounded-lg">
        {{ msg }}
    </div>
</template>

<script>
export default {
  name: 'ReceiverBlock',
  data: function () {
    return {
      msg: 'lolz'
    }
  },
  created () {
    this.$emitter.on('newLetter', (event) => {
      this.msg = event.msg
      alert(event.alert)
      console.log(event)
    })
  }
}
</script>
