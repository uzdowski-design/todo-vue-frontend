<template>
  <v-list-item :to="'/about'" link>
    <v-list-item-icon class="my-auto">
      <v-icon>mdi-help-box</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title>About</v-list-item-title>
    </v-list-item-content>
    <!-- <v-list-item-action>
      <v-btn icon class="btn-hide">
        <v-icon>mdi-arrow-right-bold-circle</v-icon>
      </v-btn>
    </v-list-item-action> -->
  </v-list-item>
</template>

<script>
export default {};
</script>

<style scoped lang="sass">
.v-list-item
  height: 60px
</style>