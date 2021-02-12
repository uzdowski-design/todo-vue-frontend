// Dialog for editing task name
<template>
  <v-dialog :value="true" persistent max-width="290">
    <v-card>
      <v-card-title class="headline"> Edit task </v-card-title>
      <v-card-text>
        Edit the title of this task:
        <v-text-field v-model="taskTitle" @keyup.enter="editTask" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('close')"> Cancel </v-btn>
        <v-btn
          :disabled="taskTitleInvalid"
          @click="editTask"
          color="primary darken-1"
          text
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["task"],
  data() {
    return {
      taskTitle: null,
    };
  },
  computed: {
    taskTitleInvalid() {
      return !this.taskTitle || this.taskTitle === this.task.name;
    },
  },
  methods: {
    editTask() {
      if (this.taskTitleInvalid) return;
      let data = {
        id: this.task.id,
        payload: {
          name: this.taskTitle,
        },
      };
      this.$store.dispatch("editTask", data);
      this.$emit("close");
    },
  },
  mounted() {
    this.taskTitle = this.task.name;
  },
};
</script>

<style>
</style>