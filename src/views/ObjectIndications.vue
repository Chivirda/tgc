<template>
  <div class="indications">
    <h2 class="system-heading">{{ `Показания объекта ${currentObject.pointName}` }}</h2>
    <div class="sort-wrap">
      <span>Отсортировано по </span>
      <select v-model="sortBy" class="sorted">
        <option
          v-for="sort in sorted"
          :key="sort.id"
          :value="sort.value"
        >
          {{ sort.title }}
        </option>
      </select>
    </div>
    <table class="table">
      <tr>
        <th class="first-column">Порядковый номер</th>
        <th>Период</th>
        <th>Показания</th>
      </tr>
      <tr v-for="indication in sortedIndications" :key="indication.id">
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
      <div class="btn-remove" @click="showRemoveModal=true" title="Удалить показания">-</div>
      <div class="btn-add" @click="showAddModal=true" title="Добавить показания">+</div>
    </div>

    <Modal v-model="showAddModal" title="Добавить показания">
      <form @submit.prevent="addIndication">
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

    <Modal v-model="showRemoveModal" title="Удалить показания">
      <form @submit.prevent="removeIndications">
        <div class="input-wrap">
          <select v-model="toRemove">
            <option disabled value="">Выберите показания для удаления</option>
            <option
              v-for="indication in indications"
              :key="indication.id"
              :value="indication.id"
            >
              {{ indication.value }}
            </option>
          </select>
        </div>
        <div class="button-wrap">
          <button type="submit" class="login-form-button">
            Удалить
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
    showAddModal: false,
    showRemoveModal: false,
    toRemove: '',
    period: '',
    value: '',
    sorted: [
      { title: 'порядковому номеру', value: 'id' },
      { title: 'периоду ', value: 'period' },
      { title: 'показаниям ', value: 'value' }
    ],
    sortBy: 'id'
  }),
  async mounted() {
    this.currentObject = await this.$store.state.currentObject
    this.indications = await this.$store.dispatch('getObjectIndications', this.currentObject.id)
  },
  computed: {
    sortedIndications() {
      return this.indications.sort((a, b) => a[this.sortBy] - b[this.sortBy])
    }
  },
  methods: {
    async addIndication() {
      const period = this.period
      const value = +this.value
      const ownerId = +this.currentObject.id
      await this.$store.dispatch('addIndications', {ownerId, period, value})
      setTimeout(() => {
        location.href = location.href
      }, 100);
    },
    async removeIndications() {
      await this.$store.dispatch('removeIndications', this.toRemove)
      setTimeout(() => {
        location.href = location.href
      }, 100);
    }
  },
  components: {
    'Modal': VueModal
  }
}
</script>