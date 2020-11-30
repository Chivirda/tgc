<template>
  <div class="indications">
    <h2 class="system-heading">{{ `Показания объекта ${currentObject.pointName}` }}</h2>
    <table class="table">
      <tr>
        <th class="first-column">Порядковый номер</th>
        <th>Период</th>
        <th>Показания</th>
      </tr>
      <tr v-for="indication in indications" :key="indication.id">
        <td class="first-column">
          {{ indication.id }}
        </td>
        <td>
          {{ indication.period }}
        </td>
        <td>
          {{ indication.value }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'indications',
  data: () => ({
    currentObject: {},
    indications: []
  }),
  async mounted() {
    this.currentObject = await this.$store.state.currentObject
    this.indications = await this.$store.dispatch('getObjectIndications', this.currentObject.id)
  }
}
</script>