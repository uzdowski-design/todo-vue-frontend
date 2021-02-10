<template>
  <div container clas="home">
    <v-card class="mx-auto">
      <v-card-title class="text-uppercase text-center justify-center"
        >Manage your lists</v-card-title
      >
    </v-card>
    <v-list flat class="pt-0">
      <div v-for="list in lists" :key="list.id">
        <v-list-item :to="'/lists/' + list.id" link>
          <template v-slot:default>
            <v-list-item-content>
              <v-list-item-title>{{ list.name }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click.prevent="deleteList(list.id)">
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

    deleteList(id) {
      try {
        this.$store.dispatch("deleteList", { id: id });
        if (id == this.$route.params.id) {
          this.$router.push("/");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    },
  },
  mounted() {
    this.$store.dispatch("fetchLists");
  },
  // async created() {
  //   try {
  //     this.getLists();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // },
};
</script>