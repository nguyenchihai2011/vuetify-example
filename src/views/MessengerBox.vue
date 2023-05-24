<template>
  <v-card class="messenger-box" elevation-5>
    <v-card-title class="subtitle-1 pa-2 messenger-box-title">
      <v-avatar> <img :src="user.avatar" :alt="user.avatar" /> </v-avatar>
      {{ user.name }}
      <v-spacer></v-spacer>
      <v-icon class="blue--text" @click="closeMessengerBox">mdi-close</v-icon>
    </v-card-title>
    <v-divider></v-divider>
    <div>
      <v-card height="330px" class="messenger-box-body">
        <v-card-subtitle v-for="(mess, i) in messages" :key="i" class="py-2">
          <b>{{ mess.userSend }}</b> : {{ mess.text }}
        </v-card-subtitle>
      </v-card>

      <v-card class="d-flex">
        <v-text-field
          v-model="message.text"
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
export default {
  data() {
    return {
      message: {
        text: "",
        userSend: "Member 1",
      },
      messages: [],
    };
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  methods: {
    closeMessengerBox() {
      this.$emit("close-messenger-box");
    },

    resetMess() {
      this.message = {
        text: "",
        userSend: "Member 1",
      };
    },

    sendMess() {
      // eslint-disable-next-line
      if (this.message.text) this.messages.push(this.message);
      this.resetMess();
    },
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
