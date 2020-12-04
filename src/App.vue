<template>
  <div id="app">
    <MainLayout v-if="isLoggedIn">
      <router-view />
    </MainLayout>
    <login v-else/>
  </div>
</template>

<style lang="css">
@import 'assets/style.css';
</style>

<script>
import MainLayout from '@/layouts/MainLayout.vue'
import Login from '@/views/Login.vue'

export default {
  components: {
    MainLayout,
    Login
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  },
  mounted: function() {
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise((resolve, reject) => {
        if (err.status === 401 && err.config && !err.config._isRetryRequest) {
          this.$store.dispatch('logout')
        }
        throw err
      })
    })
  }
}
</script>
