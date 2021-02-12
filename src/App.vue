<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :mobile-breakpoint="768" app>
      <v-img
        class="pa-4 pt-5"
        src="@/assets/mountains.jpeg"
        height="170"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      >
        <v-avatar size="80" class="mb-2">
          <img src="@/assets/ud_min.png" alt="Michal Uzdowski" />
        </v-avatar>
        <div class="white--text text-subtitle-1 font-weight-bold">
          Michal Uzdowski
        </div>
        <div class="white--text text-subtitle-2">uzdowski.design</div>
      </v-img>
      <field-add-list />
      <!-- <v-divider></v-divider> -->

      <v-list dense nav>
        <list-dashboard />

        <list-item
          v-for="list in lists"
          :key="list.id"
          :list="list"
          :deleteList="deleteList"
        />
        <list-about />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="primary"
      dark
      src="@/assets/mountains.jpeg"
      prominent
      height="170"
    >
      <!-- <v-app-bar app color="primary" dark src="storm.jpeg" prominent> -->
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-container class="header-container pa-0">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <search />
        </v-row>
        <v-row>
          <v-toolbar-title class="text-h4 ml-4">
            {{
              this.$route.path == "/"
                ? getAppTitle()
                : $store.state.lists.find((x) => x.id == this.$route.params.id)
                ? $store.state.lists.find((x) => x.id == this.$route.params.id)
                    .name + " tasks"
                : "Pick a list to view tasks"
            }}
          </v-toolbar-title>
        </v-row>
        <v-row>
          <live-date-time />
        </v-row>
      </v-container>
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
    "list-about": require("@/components/List/ListAbout.vue").default,
    "list-item": require("@/components/List/ListItem.vue").default,
    search: require("@/components/Tools/Search.vue").default,
    "live-date-time": require("@/components/Tools/LiveDateTime.vue").default,
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
    getAppTitle() {
      return process.env.VUE_APP_TITLE;
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

<style lang="sass">
.header-container
  max-width: none !important
</style>