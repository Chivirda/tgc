<template>
  <div class="objects">
    <h2 class="system-heading">Объекты учёта</h2>
    <table class="table">
      <tr>
        <th class="first-column">Порядковый номер</th>
        <th>Наименование объекта</th>
      </tr>
      <tr v-for="object in objects" :key="object.id">
        <td class="first-column">{{ object.id }}</td>
        <td>{{ object.pointName }}</td>
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