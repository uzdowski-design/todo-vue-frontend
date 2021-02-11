<template>
  <div>
    <v-list-item
      @click="doneTask(task.id)"
      :class="{ 'blue lighten-5': task.done }"
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
          <v-list-item-action-text>
            <v-icon small>mdi-calendar</v-icon>
            {{ task.due_date | niceDate }}
          </v-list-item-action-text>
        </v-list-item-action>

        <v-list-item-action>
          <task-menu :task="task" />
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  props: ["task", "doneTask", "deleteTask"],
  filters: {
    niceDate(value) {
      return format(new Date(value), "MMM d");
    },
  },
  components: {
    "task-menu": require("@/components/Todo/TaskMenu.vue").default,
  },
};
</script>