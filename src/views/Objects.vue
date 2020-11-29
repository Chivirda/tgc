<template>
  <div class="objects">
    <h2 class="system-heading">Объекты учёта</h2>
    {{objects}}
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
  computed: {
    objects() {
      return this.$store.getters.getObjectsInfo
    }
  }
}
</script>