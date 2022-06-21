<template>
  <section class="h-screen">
    <div class="px-6 h-full text-gray-800">
      <div class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap g-6">
        <div class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="w-full"
            alt="Sample image" />
        </div>
        <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
          <form>

            <!-- Email input -->
            <div class="mb-6">
              <input type="email"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="user-email" placeholder="Email address" v-model="email"/>
            </div>

            <!-- Password input -->
            <div class="mb-6">
              <input type="password"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="user-password" placeholder="Password" v-model="password" />
            </div>

            <!-- Password Comfirmation input -->
            <div v-if="!signinPage" class="mb-6">
              <input type="password"
                class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="user-password-comfirmation" placeholder="Password Comfirmation" v-model="passwordComfimation" />
            </div>

            <div v-if="signinPage" class="text-center lg:text-left">
              <button type="button"
                @click='userSignin'
                class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Login
              </button>
              <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                Don't have an account?
                <a href="#!"
                  @click='jumpToSignup'
                  class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">Register</a>
              </p>
            </div>
            <div v-else class="text-center lg:text-left">
              <button type="button"
                @click='userSignup'
                class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'LogIn',
  data: function () {
    return {
      email: '',
      password: '',
      passwordComfimation: ''
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'signinPage']),
    userData () {
      return {
        email: this.email,
        password: this.password,
        passwordComfimation: this.passwordComfimation
      }
    }
  },
  methods: {
    ...mapActions(['signup', 'signin', 'jumpSigninPage']),
    userSignup () {
      this.signup(this.userData)
      this.removeUserData()
    },
    userSignin () {
      this.signin(this.userData)
      this.removeUserData()
    },
    removeUserData () {
      this.password = ''
      this.passwordComfirmation = ''
      this.email = ''
    },
    jumpToSignup ($event) {
      $event.preventDefault()
      this.jumpSigninPage(false)
    }
  }
}
</script>
<style scoped>
#login {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
