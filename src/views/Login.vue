<template>
  <div class="container">
    <div class="login-wrap">
      <form class="login-form" @submit.prevent="login">
        <span class="login-form-title">
          Sign In
        </span>

        <div class="input-wrap">
          <input required v-model="username" type="text" class="form-input" placeholder="Username">
        </div>

        <div class="input-wrap">
          <input required v-model="password" type="password" class="form-input" placeholder="Password">
        </div>

        <div class="button-wrap">
          <button type="submit" class="login-form-button">
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'login',
  data: () => ({
      username: '',
      password: ''
  }),
  methods: {
    login() {
      const { username, password } = this
      this.$store.dispatch('login', { username, password })
        .then(() => { this.$router.push('/about') })
        .catch(err => console.error(err.response.data.errorText))
    }
  }
}
</script>
