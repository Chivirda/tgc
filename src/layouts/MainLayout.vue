<template>
  <div class="main">
      <Navigation />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Login from '@/views/Login.vue'
import User from '@/views/User.vue'
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'Main',
  data: () => ({
    links: [
      {title: 'Профиль', url: '/'},
      {title: 'Объекты учёта', url: '/objects'}
    ]
  }),
  computed: {
    user() {
      return this.$store.getters.getUserInfo
    },
    
  },
  mounted() {
    this.$store.dispatch('getUserInfo', this.$store.token)
  },
  components: {
    Login, User, Navigation
  }
}
</script>