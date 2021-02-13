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
          <v-btn v-if="showEdit" icon @click.prevent="handleEdit()">
            <v-icon color="primary lighten-1">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click.prevent="handleDelete()">
            <v-icon color="primary lighten-1">mdi-delete-outline</v-icon>
          </v-btn>
        </div>
      </v-list-item-action>
    </v-list-item>

    <dialog-edit-list
      :list="list"
      v-if="dialogs.edit"
      @close="dialogs.edit = false"
    />
    <dialog-delete-list
      :list="list"
      v-if="dialogs.delete"
      @close="dialogs.delete = false"
    />
  </div>
</template>

<script>
export default {
  props: ["list", "showEdit"],
  data() {
    return {
      dialogs: {
        delete: false,
        edit: false,
      },
    };
  },
  components: {
    "dialog-delete-list": require("@/components/Global/Dialogs/DialogDeleteList.vue")
      .default,
    "dialog-edit-list": require("@/components/Global/Dialogs/DialogEditList.vue")
      .default,
  },
  methods: {
    handleDelete() {
      this.dialogs.delete = true;
    },
    handleEdit() {
      this.dialogs.edit = true;
    },
  },
};
</script>
