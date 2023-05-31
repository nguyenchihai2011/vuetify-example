<template>
  <div>
    <h1 class="h6 ma-6">Team</h1>
    <v-container>
      <v-row>
        <v-col sm="3" v-for="(member, i) in getUsers" :key="i">
          <v-card class="text-center">
            <v-avatar>
              <img :src="member.avatar" :alt="member.username" />
            </v-avatar>
            <v-card-title class="justify-center">
              {{ member.username }}
            </v-card-title>
            <v-card-subtitle> {{ member.job }} </v-card-subtitle>
            <v-btn depressed @click="sendMessenger(member)">
              <v-icon left> mdi-message-text-outline </v-icon>
              Message
            </v-btn>
          </v-card>
        </v-col>
      </v-row>

      <!-- MessengerBox -->
      <MessengerBox
        v-show="isShow"
        :user="user"
        :socketInstance="socketInstance"
        @close-messenger-box="isShow = false"
      />
    </v-container>
  </div>
</template>

<script>
import MessengerBox from "./MessengerBox.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      snackbar: false,
      user: {},
      isShow: false,
      socketInstance: null,
    };
  },

  components: {
    MessengerBox,
  },

  computed: {
    ...mapGetters(["getUsers"]),
  },

  methods: {
    ...mapActions(["fetchAPIUsers"]),

    sendMessenger(member) {
      this.user = member;
      this.isShow = true;
    },
  },

  created() {
    this.fetchAPIUsers();
  },
};
</script>
