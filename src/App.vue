<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Task Lists </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
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
      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon class="my-auto">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click.stop="deleteList(item.id)">
              <v-icon color="primary lighten-1">mdi-delete-outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark src="storm.jpeg" prominent>
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Your Todos</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <!--  -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    newListTitle: "",
    items: [
      { title: "List 1", icon: "mdi-format-list-checks", to: "/1" }, // zamienic to na :to="'/'+this.id" w atrybucie
      { title: "List 2", icon: "mdi-format-list-checks", to: "/2" },
      { title: "About", icon: "mdi-help-box", to: "/about" },
    ],
  }),
  methods: {
    addList() {
      if (!this.newListTitle) return;
      let newList = {
        id: Date.now(),
        title: this.newListTitle,
        icon: "mdi-format-list-checks",
        to: "/",
      };
      this.items.push(newList);
      this.newListTitle = "";
    },
    deleteList(id) {
      this.items = this.items.filter((item) => item.id != id);
    },
  },
};
</script>