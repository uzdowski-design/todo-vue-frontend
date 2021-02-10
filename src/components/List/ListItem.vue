<template>
  <v-list-item :to="'/lists/' + list.id" link>
    <v-list-item-icon class="my-auto pa">
      <v-icon>mdi-format-list-checks</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title>{{ list.name }}</v-list-item-title>
    </v-list-item-content>

    <v-list-item-action>
      <div>
        <v-btn icon @click.prevent="deleteList(list.id)">
          <v-icon color="primary lighten-1">mdi-delete-outline</v-icon>
        </v-btn>
      </div>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  props: ["list", "deleteList"],
};
</script>

<style>
</style>