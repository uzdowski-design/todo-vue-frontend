<template>
  <v-dialog :value="true" persistent max-width="290">
    <v-card>
      <v-card-title class="headline"> Delete Task? </v-card-title>
      <v-card-text
        >Are you sure you want to delete this task? This cannot be
        reversed.</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('close')"> Cancel </v-btn>
        <v-btn
          @click="$store.dispatch('deleteTask', task.id)"
          color="red darken-1"
          text
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["task"],
};
</script>

<style>
</style>