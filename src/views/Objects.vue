<template>
  <div class="objects">
    <h2 class="system-heading">Объекты учёта</h2>
    <table class="table">
      <tr>
        <th class="first-column">Порядковый номер</th>
        <th>Наименование объекта</th>
      </tr>
      <tr v-for="object in objects" :key="object.id" @click="onTableClickHandler(object.id)">
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
    objects: [],
    objectInfo: []
  }),
  async mounted() {
    this.objects = await this.$store.dispatch('getObjectsInfo')
  },
  methods: {
    async onTableClickHandler(objectId) {
      this.objectInfo = await this.$store.dispatch('getObjectIndications', objectId)
      this.$store.dispatch('setCurrentObject', this.objects[objectId - 1])
      this.$router.push('/indications')
    }
  }
}
</script>