<template>
  <div class="user-info">
    <h2 class="system-heading">{{ user.fullName }}</h2>
    <div>
      <b>Login: </b>
      <span>{{ user.login }}</span>
    </div>
    <div>
      <b>Role: </b>
      <span>{{ user.role }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data: () => ({
    user: {}
  }),
  async mounted() {
    this.user = await this.$store.dispatch('getUserInfo')
  }
}
</script>