<template>
  <nav class="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg">
    <div class="container-fluid w-full flex flex-wrap items-center justify-between px-6">
      <a href="/" class="text-xl text-black font-semibold">
        vr-trello
      </a>
      <div>
        <a v-if="!isLogin" href="/login" type="button" class="user-button">登入</a>
        <a v-if="!isLogin" href="/signup" type="button" class="user-button">註冊</a>
        <p v-if="isLogin"> {{ userEmail }} </p>
        <input v-if="isLogin" @click="signout" type="button" class="user-button" value="登出">
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['isLogin', 'userEmail'])
  },
  methods: {
    ...mapActions(['signout'])
  }
}
</script>
<style scoped>

</style>
