// Single task component
<template>
  <div>
    <v-list-item
      @click="doneTask(task.id)"
      :class="{ 'blue lighten-5': task.done }"
      class="white"
    >
      <template v-slot:default>
        <v-list-item-action>
          <v-checkbox :input-value="task.done" color="primary"></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title
            :class="{ 'text-decoration-line-through': task.done }"
            >{{ task.name }}</v-list-item-title
          >
        </v-list-item-content>

        <v-list-item-action v-if="task.due_date">
          <v-list-item-action-text :class="{ overdue: isOverdue }">
            <v-icon :color="isOverdue" small>mdi-calendar</v-icon>
            {{ task.due_date | niceDate }}
          </v-list-item-action-text>
          <v-list-item-action-text v-if="isOverdue" class="overdue">
            Overdue
          </v-list-item-action-text>
        </v-list-item-action>

        <v-list-item-action>
          <task-menu :task="task" />
        </v-list-item-action>

        <v-list-item-action v-if="$store.state.sorting">
          <v-btn color="primary" class="handle" icon>
            <v-icon>mdi-drag-horizontal-variant</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  props: ["task"],
  filters: {
    niceDate(value) {
      return format(new Date(value), "MMM d");
    },
  },
  computed: {
    isOverdue() {
      if (this.task.done) return;
      let nowFormatted = format(new Date(), "yyyy-MM-dd");
      let dueDate = this.task.due_date;
      if (dueDate < nowFormatted) return "red";
    },
  },
  methods: {
    doneTask(id) {
      const data = {
        id: id,
        payload: {
          done: !this.task.done,
        },
      };
      this.$store.dispatch("doneTask", data);
    },
  },
  components: {
    "task-menu": require("@/components/Todo/TaskMenu.vue").default,
  },
};
</script>

<style scoped lang="sass">
.overdue
  color: red !important
.sortable-ghost
  opacity: 0
.sortable-drag
  box-shadow: 0 0 10px rgba(0,0,0,0.3)
</style>