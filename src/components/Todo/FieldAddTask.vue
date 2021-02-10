<template>
  <v-text-field
    v-model="newTaskTitle"
    @keyup.enter="addTask"
    class="pa-3"
    outlined
    label="Add Task"
    hide-details
    clearable
  >
    <template v-slot:append>
      <v-icon @click="addTask" color="primary" :disabled="newTaskTitleInvalid"
        >mdi-plus</v-icon
      >
    </template>
  </v-text-field>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      newTaskTitle: "",
    };
  },
  computed: {
    newTaskTitleInvalid() {
      return !this.newTaskTitle;
    },
  },
  methods: {
    addTask() {
      if (this.newTaskTitleInvalid) return;
      const data = {
        name: this.newTaskTitle,
        parent_id: this.id,
      };
      this.$store.dispatch("addTask", data);
      this.newTaskTitle = "";
    },
  },
};
</script>