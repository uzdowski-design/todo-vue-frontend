// Component for list deleting dialog

<template>
  <v-dialog :value="true" persistent max-width="290">
    <v-card>
      <v-card-title class="headline"> Delete List? </v-card-title>
      <v-card-text
        >Are you sure you want to permanently delete this list? This cannot be
        reversed.</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('close')"> Cancel </v-btn>
        <v-btn @click="deleteList(list.id)" color="red darken-1" text>
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["list"],
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
};
</script>
