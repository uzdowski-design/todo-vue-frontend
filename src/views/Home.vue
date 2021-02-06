<template>
  <div container clas="home">
    <v-card class="mx-auto">
      <v-card-title class="text-uppercase text-center justify-center"
        >Manage your lists</v-card-title
      >
    </v-card>
    <v-list flat class="pt-0">
      <div v-for="item in items" :key="item.id">
        <v-list-item :to="'/lists/' + item.id" link>
          <template v-slot:default>
            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click.stop="deleteTask(item.id)">
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

export default {
  data: () => ({
    drawer: null,
    newListTitle: "",
    items: [],
  }),
  methods: {
    async getLists() {
      try {
        const res = await axios.get(listURL);
        this.items = res.data;
      } catch (e) {}
    },
    async addList() {
      if (!this.newListTitle) return;
      const data = {
        name: this.newListTitle,
      };
      await axios.post(listURL, data);
      this.newListTitle = "";
      this.getLists();
    },

    async deleteList(id) {
      try {
        axios.delete(listURL + id + "/");
      } catch (error) {
        console.error(error);
      }
      this.getLists();
    },
  },
  async created() {
    try {
      this.getLists();
    } catch (e) {
      console.error(e);
    }
  },
};
</script>