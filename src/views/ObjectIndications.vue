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
    <div class="btn-wrapper">
      <div class="btn-add" @click="showModal=true">+</div>
    </div>

    <Modal v-model="showModal" title="Добавить показания">
      <form @submit.prevent="addIndication" class="add-indications-form">
        <div class="input-wrap">
          <input required v-model="period" class="form-input" type="datetime-local" placeholder="Период">
        </div>
        <div class="input-wrap">
          <input required v-model="value" class="form-input" type="number" placeholder="Показания">
        </div>
        <div class="button-wrap">
          <button type="submit" class="login-form-button">
            Добавить
          </button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script>
import VueModal from '@kouts/vue-modal'
import '@kouts/vue-modal/dist/vue-modal.css'

export default {
  name: 'indications',
  data: () => ({
    currentObject: {},
    indications: [],
    showModal: false,
    period: '',
    value: ''
  }),
  async mounted() {
    this.currentObject = await this.$store.state.currentObject
    this.indications = await this.$store.dispatch('getObjectIndications', this.currentObject.id)
  },
  methods: {
    addIndication() {
      const period = this.period
      const value = +this.value
      const ownerId = +this.currentObject.id
      this.$store.dispatch('addIndications', JSON.stringify({ownerId, period, value}))
      console.log('Indication object:', JSON.stringify({ownerId, period, value}))
    },
    setCurrentDate() {
      let dateInput = document.querySelector('input[type="datetime-local"]')
      dateInput.value = new Date()
    }
  },
  components: {
    'Modal': VueModal
  }
}
</script>