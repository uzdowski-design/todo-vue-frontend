<template>
  <v-snackbar v-model="$store.state.snackbar.show" :timeout="timeout">
    {{ $store.state.snackbar.text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="primary lighten-4"
        text
        v-bind="attrs"
        @click="$store.commit('CLOSE_SNACKBAR')"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    timeout: 2000,
  }),
};
</script>

<style>
</style>