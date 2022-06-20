<template>
  <nav class="bg-teal-700 text-blue-100">
    <div class="font-thin flex justify-between item-center">
      <a href="/">
        <i class="fas fa-columns">
        </i>
        vr-trello
      </a>
      <div>
        <input v-if="!isLogin" type="button" class="user-button" value="登入">
        <input v-if="!isLogin" type="button" class="user-button" value="註冊">
        <input v-if="isLogin" @click="signout" type="button" class="user-button" value="登出">
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isLogin'])
  },
  methods: {
    ...mapActions(['signout'])
  }
}
</script>
<style scoped>

</style>
