<template>
  <div class="home">
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
    <v-list flat class="pt-0" v-if="tasks.length">
      <div v-for="task in tasks" :key="task.id">
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
              <v-btn icon @click.stop="deleteTask(task.id)">
                <v-icon color="primary lighten-1">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
    <div v-else class="no-tasks">
      <v-icon size="100" color="primary"> mdi-check </v-icon>
      <div class="text-h5 primary--text">No tasks</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      id: this.$route.params.id,
      newTaskTitle: "",
    };
  },
  methods: {
    async addTask() {
      if (!this.newTaskTitle) return;
      const data = {
        name: this.newTaskTitle,
        parent_id: this.id,
      };
      this.$store.dispatch("addTask", data);
      this.newTaskTitle = "";
    },
    async doneTask(id) {
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
  computed: {
    tasks() {
      return this.$store.state.tasks;
    },
  },
  mounted() {
    this.$store.dispatch("fetchTasks", { id: this.$route.params.id });
  },
};
</script>

<style lang="sass">
.no-tasks
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-50%,-50%)
  opacity: .5
</style>