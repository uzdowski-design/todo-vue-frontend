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
    <v-list flat class="pt-0">
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
  </div>
</template>

<script>
import axios from "axios";
const listURL = "http://127.0.0.1:8000/lists/";
const taskURL = "http://127.0.0.1:8000/tasks/";

export default {
  name: "Home",
  data() {
    return {
      id: this.$route.params.id,
      newTaskTitle: "",
      tasks: [
        // {
        //   id: 1,
        //   title: "Wake up",
        //   done: false,
        // },
        // {
        //   id: 2,
        //   title: "Do stuff",
        //   done: false,
        // },
        // {
        //   id: 3,
        //   title: "Go to sleep",
        //   done: false,
        // },
      ],
    };
  },
  methods: {
    async getTasks() {
      const res = await axios.get(listURL + this.id + "/");
      this.tasks = [...res.data.children];
    },
    async addTask() {
      if (!this.newTaskTitle) return;
      const data = {
        name: this.newTaskTitle,
        parent_id: this.id,
      };
      await axios.post(taskURL, data);
      this.newTaskTitle = "";
      this.getTasks();
    },
    async doneTask(id) {
      let task = this.tasks.filter((task) => task.id == id)[0];
      const data = {
        done: !task.done,
      };
      await axios.patch(taskURL + id + "/", data);
      this.getTasks();
    },
    async deleteTask(id) {
      // this.tasks = this.tasks.filter((task) => task.id != id);
      await axios.delete(taskURL + id + "/");
      this.getTasks();
    },
  },
  mounted() {
    try {
      this.getTasks();
    } catch (e) {
      console.error(e);
    }
  },
};
</script>
