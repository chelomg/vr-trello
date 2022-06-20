<template>
  <div id='login'>
    <h3>VR-Trello Login</h3>
    <div v-if="client === ''">
      <div>
        <h1>SignUp</h1>
        <label for='email'>email</label>
        <input id='signup-email' type='email' v-model='email' />
        <label for='password'>password</label>
        <input id='signup-password' type='password' v-model='password' />
        <label for='password'>password comfirmation</label>
        <input id='signup-password-comfirmation' type='password' v-model='passwordComfirmation' />
        <button @click='signup'>新規登録</button>
      </div>
      <div>
        <h1>SignIn</h1>
        <label for='email'>email</label>
        <input id='signin-email' type='email' v-model='email' />
        <label for='password'>password</label>
        <input id='signin-password' type='password' v-model='password' />
        <label for='password'>password comfirmation</label>
        <input id='signin-password-comfirmation' type='password' v-model='passwordComfirmation' />
        <button @click='signin'>SignIn</button>
      </div>
    </div>
    <div v-if="client !== ''">
      <div>
        <button @click="signout">SignOut</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'LogIn',
  data: function () {
    return {
      name: '',
      email: '',
      password: '',
      passwordComfirmation: '',
      uid: '',
      access_token: '',
      client: '',
      title: '',
      content: '',
      tasks: [],
      comment: '',
      posts: []
    }
  },
  methods: {
    signup () {
      axios
        .post('http://localhost:3000/v1/auth', {
          email: this.email,
          password: this.password,
          password_comfirmation: this.password
        })
        .then((response) => {
          localStorage.setItem(
            'access-token',
            response.headers['access-token']
          )
          localStorage.setItem('client', response.headers.client)
          localStorage.setItem('uid', response.headers.uid)
          this.access_token = response.headers['access-token']
          this.client = response.headers.client
          this.uid = response.headers.uid
        })
      this.email = ''
      this.password = ''
      this.passwordComfirmation = ''
    },
    signin () {
      console.log(this.email)
      console.log(this.password)
      axios
        .post('http://localhost:3000/v1/auth/sign_in', {
          email: this.email,
          password: this.password,
          password_confirmation: this.password
        })
        .then((response) => {
          console.log(response)
          localStorage.setItem(
            'access-token',
            response.headers['access-token']
          )
          localStorage.setItem('client', response.headers.client)
          localStorage.setItem('uid', response.headers.uid)
          this.access_token = response.headers['access-token']
          this.client = response.headers.client
          this.uid = response.headers.uid
        })
      this.email = ''
      this.password = ''
      this.passwordComfirmation = ''
    },
    signout () {
      console.log(this.uid)
      console.log(this.access_token)
      console.log(this.client)
      axios
        .delete('http://localhost:3000/v1/auth/sign_out', {
          test: { test: 'test' },
          headers: {
            uid: this.uid,
            'access-token': this.access_token,
            client: this.client
          }
        })
        .then((response) => {
          console.log(response)
          this.access_token = ''
          this.client = ''
          this.uid = ''
          localStorage.removeItem('uid')
          localStorage.removeItem('access-token')
          localStorage.removeItem('client')
        })
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
