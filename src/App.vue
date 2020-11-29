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
  }
}
</script>
