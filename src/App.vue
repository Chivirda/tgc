<template>
  <div id="app">
    <MainLayout>
      <router-view />
    </MainLayout>    
  </div>
</template>

<style lang="css">
@import 'assets/style.css';
</style>

<script>
import MainLayout from '@/layouts/MainLayout.vue'

export default {
  components: {
    MainLayout
  },
  created: function() {
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
