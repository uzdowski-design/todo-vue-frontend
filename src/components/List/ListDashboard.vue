// Component for displaying Home tab on the list panel
<template>
  <v-list-item :to="'/'" link>
    <v-list-item-icon class="my-auto">
      <v-icon>mdi-home</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title>Home</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {};
</script>

<style scoped lang="sass">
.v-list-item
  height: 60px
</style>