<template>
  <div>
    <h1 class="h6 ma-6">Team</h1>
    <v-container>
      <v-row>
        <v-col sm="3" v-for="(member, i) in members" :key="i">
          <v-card class="text-center">
            <v-avatar>
              <img :src="member.avatar" :alt="member.name" />
            </v-avatar>
            <v-card-title class="justify-center">
              {{ member.name }}
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
        @close-messenger-box="isShow = false"
      />
    </v-container>
  </div>
</template>

<script>
import io from "socket.io-client";
import { apiClient } from "@/config/httpRequest";
import MessengerBox from "./MessengerBox.vue";
export default {
  data() {
    return {
      members: [],
      snackbar: false,
      user: {},

      isShow: false,
    };
  },

  components: {
    MessengerBox,
  },

  methods: {
    async fetchAPIMembers() {
      try {
        const response = await apiClient.get("members");
        this.members = response.data;
      } catch (error) {
        console.error("Error:", error);
      }
    },

    sendMessenger(member) {
      this.user = member;
      this.isShow = true;
      this.socketInstance = io("http://localhost:8082");

      this.socketInstance.on("message:received", (data) => {
        this.messages = this.messages.concat(data);
      });
    },
  },

  created() {
    this.fetchAPIMembers();
  },
};
</script>
