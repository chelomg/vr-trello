<template>
    <div class="footer">
        <div class="footer-content"> {{ trademark }}</div>
        <button class="btn" @click="clickForEmitPractice"> emit 練習</button>
    </div>
</template>

<script>
export default {
  name: 'FootBlock',
  props: ['author'],
  data: function () {
    return {
      trademarkPrefix: 'created by'
    }
  },
  computed: {
    trademark () {
      return this.trademarkPrefix + ' ' + this.author + ' !'
    }
  },
  methods: {
    clickForEmitPractice () {
      this.$emit('emitPractice')
    }
  }
}
</script>
<style scoped>
  .footer{
    background-color: rgb(252, 252, 218);
    width: 100%;
    height: 20vh;
    position:absolute;
    bottom:0px;
    left:0px;
    font-size: 10px;
  }
  .footer-content{
    padding-top: 60px;
    text-align: center;
  }
</style>
