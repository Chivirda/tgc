<template>
  <div class="about" v-if="isLoggedIn">
    <nav class="navigation">
      <ul class="navigation-list">
        <router-link
          v-for="link in links"
          :key="link.url"
          tag="li"
          class="navigation-item"
          active-class="active"
          :to="link.url"
          exact
        >
          <a href="#" class="navigation-link">{{link.title}}</a>
        </router-link>
      </ul>
      <span @click="logout" class="logout">Logout</span>
    </nav>
    <div class="main">
      <router-view />
    </div>
  </div>
  <div v-else>
    <Login />
  </div>
</template>

<script>
import Login from '@/views/Login.vue'
import User from '@/views/User.vue'

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
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  },
  mounted() {
    this.$store.dispatch('getUserInfo', this.$store.token)
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/'))
    }
  },
  components: {
    Login, User
  }
}
</script>