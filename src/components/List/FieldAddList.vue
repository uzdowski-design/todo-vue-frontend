<template>
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
</template>

<script>
export default {
  data: () => ({
    newListTitle: "",
  }),
  methods: {
    addList() {
      if (!this.newListTitle) return;
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