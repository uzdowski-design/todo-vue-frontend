<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Task Lists </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-text-field
        v-model="newListTitle"
        @click:append="addList"
        @keyup.enter="addList"
        class="pa-3"
        outlined
        label="New List"
        append-icon="mdi-plus"
        hide-details
        clearable
      ></v-text-field>
      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item :to="'/'" link>
          <v-list-item-icon class="my-auto">
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
              <v-icon>mdi-arrow-right-bold-circle</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item
          v-for="item in items"
          :key="item.id"
          :to="'/lists/' + item.id"
          link
        >
          <v-list-item-icon class="my-auto pa">
            <v-icon>mdi-format-list-checks</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click.stop="deleteList(item.id)">
              <v-icon color="primary lighten-1">mdi-delete-outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark src="storm.jpeg" prominent>
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        {{
          this.$route.path == "/dashboard"
            ? "Your dashboard"
            : items.find((x) => x.id == this.$route.params.id)
            ? items.find((x) => x.id == this.$route.params.id).name + " tasks"
            : "Pick a list to view tasks"
        }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <!--  -->
      <router-view :key="$route.name + ($route.params.id || '')"></router-view>
      <!-- watch routes changing and refresh component -->
    </v-main>
  </v-app>
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