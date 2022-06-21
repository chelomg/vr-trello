<template>
  <nav class="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg">
    <div class="container-fluid w-full flex flex-wrap items-center justify-between px-6">
      <a href="/pages/index" class="text-xl text-black font-semibold">
        vr-trello
      </a>
      <div>
        <input v-if="!isLogin && !signinPage" @click="jumpSigninPage(true)" type="button" class="user-button" value="登入">
        <input v-if="!isLogin && signinPage"  @click="jumpSigninPage(false)" type="button" class="user-button" value="註冊">
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
    ...mapGetters(['isLogin', 'signinPage', 'userEmail'])
  },
  methods: {
    ...mapActions(['signout', 'jumpSigninPage'])
  }
}
</script>
<style scoped>

</style>
