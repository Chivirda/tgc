<template>
  <div class="container">
    <div class="login-wrap">
      <form class="login-form">
        <span class="login-form-title">
          Sign In
        </span>

        <div class="input-wrap">
          <input type="text" class="form-input" name="name" placeholder="Username">
        </div>

        <div class="input-wrap">
          <input type="password" name="password" id="password" class="form-input" placeholder="Password">
        </div>

        <div class="button-wrap">
          <button @click.prevent="onSubmitHandler" class="login-form-button">
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
  name: 'Home',
  methods: {
    onSubmitHandler() {
      console.log('Form submitted!')
    }
  }
}
</script>
