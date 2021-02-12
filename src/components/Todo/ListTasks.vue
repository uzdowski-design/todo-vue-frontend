<template>
  <v-list flat class="pt-0">
    <task
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      :doneTask="doneTask"
      :deleteTask="deleteTask"
    />
  </v-list>
</template>

<script>
export default {
  components: {
    task: require("@/components/Todo/Task.vue").default,
  },
  computed: {
    tasks() {
      return this.$store.getters.tasksFiltered;
    },
  },
  methods: {
    doneTask(id) {
      let task = this.tasks.filter((task) => task.id == id)[0];
      const data = {
        id: id,
        payload: {
          done: !task.done,
        },
      };
      this.$store.dispatch("doneTask", data);
    },
    deleteTask(id) {
      this.$store.dispatch("deleteTask", { id: id });
    },
  },
};
</script>