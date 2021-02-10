<template>
  <v-text-field
    v-model="newTaskTitle"
    @click:append="addTask"
    @keyup.enter="addTask"
    class="pa-3"
    outlined
    label="Add Task"
    append-icon="mdi-plus"
    hide-details
    clearable
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      newTaskTitle: "",
    };
  },
  methods: {
    addTask() {
      if (!this.newTaskTitle) return;
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