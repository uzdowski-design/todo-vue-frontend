// Field to create new list
<template>
  <v-text-field
    v-model="newListTitle"
    @keyup.enter="addList"
    class="pa-3"
    outlined
    label="New List"
    hide-details
    clearable
  >
    <template v-slot:append>
      <v-icon @click="addList" color="primary" :disabled="newListTitleInvalid"
        >mdi-plus</v-icon
      >
    </template>
  </v-text-field>
</template>

<script>
export default {
  data: () => ({
    newListTitle: "",
  }),
  computed: {
    newListTitleInvalid() {
      return !this.newListTitle;
    },
  },
  methods: {
    addList() {
      if (this.newListTitleInvalid) return;
      const data = {
        name: this.newListTitle,
      };
      this.$store.dispatch("addList", data);
      this.newListTitle = "";
    },
  },
};
</script>

<style>
</style>