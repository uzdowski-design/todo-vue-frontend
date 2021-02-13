// Dialog for editing list name
<template>
  <v-dialog :value="true" persistent max-width="290">
    <v-card>
      <v-card-title class="headline"> Edit list </v-card-title>
      <v-card-text>
        Edit the title of this list:
        <v-text-field v-model="listTitle" @keyup.enter="editList" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="$emit('close')"> Cancel </v-btn>
        <v-btn
          :disabled="listTitleInvalid"
          @click="editList"
          color="primary darken-1"
          text
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["list"],
  data() {
    return {
      listTitle: null,
    };
  },
  computed: {
    listTitleInvalid() {
      return !this.listTitle || this.listTitle === this.list.name;
    },
  },
  methods: {
    editList() {
      if (this.listTitleInvalid) return;
      let data = {
        id: this.list.id,
        payload: {
          name: this.listTitle,
        },
      };
      this.$store.dispatch("editList", data);
      this.$emit("close");
    },
  },
  mounted() {
    this.listTitle = this.list.name;
  },
};
</script>