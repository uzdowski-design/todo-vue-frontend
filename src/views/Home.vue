<template>
  <div container clas="home">
    <v-card class="mx-auto">
      <v-card-title class="text-uppercase text-center justify-center text-h5"
        >Manage your lists</v-card-title
      >
    </v-card>
    <field-add-list />
    <v-list flat class="pt-0">
      <div v-for="list in lists" :key="list.id">
        <list-item :showEdit="true" :list="list" />
        <v-divider></v-divider>
      </div>
    </v-list>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    newListTitle: "",
  }),
  components: {
    "field-add-list": require("@/components/List/FieldAddList.vue").default,
    "list-item": require("@/components/List/ListItem.vue").default,
    search: require("@/components/Tools/Search.vue").default,
    snackbar: require("@/components/Global/Snackbar.vue").default,
  },
  computed: {
    lists() {
      return this.$store.getters.listsFiltered;
    },
  },
  mounted() {
    this.$store.dispatch("fetchLists");
  },
};
</script>