<template>
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
</template>

<script>
export default {
  name: 'Navigation',
  data: () => ({
    links: [
      {title: 'Профиль', url: '/'},
      {title: 'Объекты учёта', url: '/objects'}
    ]
  }),
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/'))
    }
  }
}
</script>