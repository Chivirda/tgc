<template>
  <div class="about">
    <nav class="navigation">
      <ul class="navigation-list">
        <li class="navigation-item" title="Профиль">Профиль</li>
        <li class="navigation-item" title="Объекты учёта">Объекты учёта</li>
      </ul>
      <span v-if="isLoggedIn" @click="logout" class="logout" title="Logout">Logout</span>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data: () => ({
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
  }
}
</script>