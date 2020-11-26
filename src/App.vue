<template>
  <div id="app">
    <router-view/>
    <span v-if="isLoggedIn">Logout</span>
  </div>
</template>

<style lang="css">
@import 'assets/style.css';
</style>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/login'))
    }
  }
}
</script>
