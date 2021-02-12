// Component displaying list of all tasks
<template>
  <v-list flat class="pt-0">
    <draggable v-model="tasks" handle=".handle">
      <task
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :doneTask="doneTask"
        :deleteTask="deleteTask"
      />
    </draggable>
  </v-list>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    task: require("@/components/Todo/Task.vue").default,
    draggable,
  },
  computed: {
    tasks: {
      get() {
        return this.$store.getters.tasksFiltered;
      },
      set(value) {
        this.$store.dispatch("orderTasks", value);
      },
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