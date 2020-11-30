<template>
  <div class="objects">
    <h2 class="system-heading">Объекты учёта</h2>
    {{ objects }}
    <table>
      <tr>
        <th></th>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'objects',
  data: () => ({
    objects: []
  }),
  async mounted() {
    this.objects = await this.$store.dispatch('getObjectsInfo')
  }
}
</script>