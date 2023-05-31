<template>
  <v-card class="messenger-box" elevation-5>
    <v-card-title class="subtitle-1 pa-2 messenger-box-title">
      <v-avatar> <img :src="user.avatar" :alt="user.avatar" /> </v-avatar>
      {{ user.username }}
      <v-spacer></v-spacer>
      <v-icon class="blue--text" @click="closeMessengerBox">mdi-close</v-icon>
    </v-card-title>
    <v-divider></v-divider>
    <div>
      <v-card height="330px" class="messenger-box-body">
        <v-card-subtitle
          v-for="(mess, i) in messagesFilled"
          :key="i"
          class="py-2"
        >
          <b>{{ mess.userSend }}</b> : {{ mess.text }}
        </v-card-subtitle>
      </v-card>

      <v-card class="d-flex">
        <v-text-field
          v-model="message"
          label="Send mess"
          solo
          outlined
          dense
          @keyup.enter="sendMess"
        ></v-text-field>
        <v-btn depressed class="px-0" height="40px" @click="sendMess">
          <v-icon class="mx-2">mdi-send</v-icon>
        </v-btn>
      </v-card>
    </div>
  </v-card>
</template>
<script>
import auth from "@/store/modules/auth";
import io from "socket.io-client";
export default {
  data() {
    return {
      message: "",

      messages: [],
    };
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  computed: {
    messagesFilled() {
      return this.messages.filter((mess) => mess.id === this.user.email);
    },
  },

  methods: {
    closeMessengerBox() {
      this.$emit("close-messenger-box");
    },

    resetMess() {
      this.message = "";
    },

    sendMess() {
      if (this.message) {
        this.messages.push({
          text: this.message,
          userSend: auth.state.userInfo.username,
          id: this.user.email,
        });

        const privateMessage = {
          from: auth.state.userInfo.username,
          to: this.user.username,
          message: this.message,
        };

        // Gửi tin nhắn riêng tới server
        this.socketInstance.emit("privateMessage", privateMessage);
        console.log(`Private message sent to ${this.user.username}`);
      }

      this.resetMess();
    },
  },

  created() {
    this.socketInstance = io("http://localhost:8081");
    this.socketInstance.emit("authenticate", auth.state.userInfo.username);
    // Listen for private messages
    this.socketInstance.on("privateMessage", (data) => {
      // Handle received private message
      this.messages.push({
        text: data.message,
        userSend: data.from,
        id: this.user.email,
      });
    });
  },
};
</script>

<style>
.messenger-box {
  position: absolute;
  bottom: 0;
  right: 60px;
  width: 330px;
}

.v-text-field__details {
  display: none;
}

.messenger-box-body {
  overflow-y: scroll;
}
</style>
