<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Your Task Lists </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <field-add-list />
      <v-divider></v-divider>

      <v-list dense nav>
        <list-dashboard />

        <list-item
          v-for="list in lists"
          :key="list.id"
          :list="list"
          :deleteList="deleteList"
        />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark src="@/assets/storm.jpeg" prominent>
      <!-- <v-app-bar app color="primary" dark src="storm.jpeg" prominent> -->
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase">
        {{
          this.$route.path == "/"
            ? "Your dashboard"
            : $store.state.lists.find((x) => x.id == this.$route.params.id)
            ? $store.state.lists.find((x) => x.id == this.$route.params.id)
                .name + " tasks"
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
      <snackbar />
      <!-- watch routes changing and refresh component -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
  }),
  components: {
    "field-add-list": require("@/components/List/FieldAddList.vue").default,
    "list-dashboard": require("@/components/List/ListDashboard.vue").default,
    "list-item": require("@/components/List/ListItem.vue").default,
    snackbar: require("@/components/Global/Snackbar.vue").default,
  },
  methods: {
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
};
</script>