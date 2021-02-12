// Button that appears when sorting mode is enabled to exit sorting mode
<template>
  <v-btn
    @click="$store.commit('TOGGLE_SORTING')"
    class="button-done-sorting"
    color="primary"
  >
    Done Sorting
  </v-btn>
</template>

<script>
export default {};
</script>

<style lang="sass">
.button-done-sorting
  position: fixed
  bottom: 20px
  left: 50%
  transform: translateX(-50%)
</style>