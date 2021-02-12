// Menu on the task to edit name / edit due date / delete / sort
<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          @click="handleClick(i)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <dialog-delete-task
      :task="task"
      v-if="dialogs.delete"
      @close="dialogs.delete = false"
    />
    <dialog-due-date
      :task="task"
      v-if="dialogs.dueDate"
      @close="dialogs.dueDate = false"
    />
    <dialog-edit-task
      :task="task"
      v-if="dialogs.edit"
      @close="dialogs.edit = false"
    />
  </div>
</template>

<script>
export default {
  props: ["task"],
  data: () => ({
    dialogs: {
      edit: false,
      dueDate: false,
      delete: false,
    },
    items: [
      {
        title: "Edit",
        icon: "mdi-pencil",
        click() {
          this.dialogs.edit = true;
        },
      },
      {
        title: "Due date",
        icon: "mdi-calendar",
        click() {
          this.dialogs.dueDate = true;
        },
      },
      {
        title: "Delete",
        icon: "mdi-delete",
        click() {
          this.dialogs.delete = true;
        },
      },
      {
        title: "Sort",
        icon: "mdi-drag-horizontal-variant",
        click() {
          this.$store.commit("TOGGLE_SORTING");
        },
      },
    ],
  }),
  methods: {
    handleClick(index) {
      this.items[index].click.call(this);
    },
  },
  components: {
    "dialog-edit-task": require("@/components/Global/Dialogs/DialogEditTask.vue")
      .default,
    "dialog-delete-task": require("@/components/Global/Dialogs/DialogDeleteTask.vue")
      .default,
    "dialog-due-date": require("@/components/Global/Dialogs/DialogDueDate.vue")
      .default,
  },
};
</script>

<style>
</style>