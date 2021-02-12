// Component to display all task lists
<template>
  <div>
    <v-list-item :to="'/lists/' + list.id" link>
      <v-list-item-icon class="my-auto pa">
        <v-icon>mdi-format-list-checks</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ list.name }}</v-list-item-title>
      </v-list-item-content>

      <v-list-item-action>
        <div>
          <!-- <v-btn icon @click.prevent="deleteList(list.id)"> -->
          <v-btn icon @click.prevent="handleClick()">
            <v-icon color="primary lighten-1">mdi-delete-outline</v-icon>
          </v-btn>
        </div>
      </v-list-item-action>
    </v-list-item>

    <dialog-delete-list
      :deleteList="deleteList"
      :list="list"
      v-if="dialogs.delete"
      @close="dialogs.delete = false"
    />
  </div>
</template>

<script>
export default {
  props: ["list", "deleteList"],
  data() {
    return {
      dialogs: {
        delete: false,
      },
    };
  },
  components: {
    "dialog-delete-list": require("@/components/Global/Dialogs/DialogDeleteList.vue")
      .default,
  },
  methods: {
    handleClick() {
      this.dialogs.delete = true;
    },
  },
};
</script>

<style>
</style>