// Dialog for setting due date for a task
<template>
  <v-dialog
    ref="dialog"
    :value="true"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <v-date-picker v-model="date" scrollable>
      <v-spacer></v-spacer>
      <v-btn text @click="$emit('close')"> Cancel </v-btn>
      <v-btn text color="primary darken-1" @click="editDate"> OK </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  props: ["task"],
  data() {
    return {
      date: null,
    };
  },
  methods: {
    editDate() {
      let data = {
        id: this.task.id,
        payload: {
          due_date: this.date,
        },
      };
      this.$store.dispatch("editDate", data);
      this.$emit("close");
    },
  },
  mounted() {
    if (this.task.due_date) this.date = this.task.due_date;
  },
};
</script>

<style>
</style>