<template>
  <nav>
    <v-app-bar app color="grey lighten-4">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Todo App</v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Menus -->
      <v-menu transition="slide-y-transition" bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="grey lighten-2 black--text"
            dark
            v-bind="attrs"
            v-on="on"
            class="mr-8"
            @click="isIconDown = !isIconDown"
          >
            Menu
            <v-icon v-if="isIconDown" right> mdi-chevron-down </v-icon>
            <v-icon v-else right> mdi-chevron-up </v-icon>
          </v-btn>
        </template>
        <v-list class="py-0">
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            link
            :to="item.link"
            class="lighten-5 deep-purple--text text--accent-4"
            @click="isIconDown = true"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Logout button -->

      <v-btn color="grey lighten-2" @click="signOut()">
        Sign out <v-icon right> mdi-logout </v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Navigation drawer -->
    <v-navigation-drawer v-model="drawer" app>
      <v-list nav dense>
        <v-layout justify-center>
          <v-avatar color="indigo" size="100">
            <img :src="GET_USER_INFO.avatar" alt="Avatar" />
          </v-avatar>
        </v-layout>
        <v-layout justify-center class="pa-2 mb-4">{{
          GET_USER_INFO.username
        }}</v-layout>
        <popup-app />
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            link
            :to="item.link"
          >
            <v-list-item-title
              ><v-icon left> {{ item.icon }}</v-icon
              >{{ item.title }}</v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import { apiClient } from "@/config/httpRequest";
import PopupApp from "./PopupApp.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      items: [
        { title: "Dashboard", link: "/dashboard", icon: "mdi-view-dashboard" },
        { title: "My Project", link: "/my-projects", icon: "mdi-folder" },
        { title: "Team", link: "/team", icon: "mdi-account-group" },
      ],
      drawer: false,
      isIconDown: true,
    };
  },

  components: {
    PopupApp,
  },

  computed: {
    ...mapGetters(["GET_USER_INFO"]),
  },

  methods: {
    async signOut() {
      try {
        await apiClient.post("auth/logout");
        localStorage.clear();
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
