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
        <v-list-item-action>
          <task-menu :task="task" />
          <!-- <v-btn icon @click.stop="dialogs.delete = true">
            <v-icon color="primary lighten-1">mdi-delete</v-icon>
          </v-btn> -->
        </v-list-item-action>
      </template>
    </v-list-item>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  props: ["task", "doneTask", "deleteTask"],
  components: {
    "task-menu": require("@/components/Todo/TaskMenu.vue").default,
  },
};
</script>

<style>
</style>