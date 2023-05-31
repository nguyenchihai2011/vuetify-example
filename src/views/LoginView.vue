<template>
  <v-container fluid>
    <v-row style="height: 100vh">
      <v-col md="3" class="signin-background d-flex justify-end align-center">
        <v-radio-group v-model="radioGroup">
          <v-radio
            v-for="item in items"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></v-radio>
        </v-radio-group>
      </v-col>
      <v-col md="9" align-self="center" class="d-flex justify-center">
        <div class="signin-form">
          <img
            class="signin-form-logo"
            src="//bizweb.dktcdn.net/100/117/632/themes/157694/assets/favicon.png?1564585558451"
            alt=""
          />
          <h2 class="text-center display-1">Welcome to TodoApp</h2>
          <v-form v-if="radioGroup === 'Signin'">
            <v-text-field v-model="user.email" label="Email"></v-text-field>

            <v-text-field
              v-model="user.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-form>
          <v-form v-else>
            <v-text-field
              v-model="userSignup.username"
              label="Username"
            ></v-text-field>
            <v-text-field
              v-model="userSignup.email"
              label="Email"
            ></v-text-field>
            <v-text-field
              v-model="userSignup.firstName"
              label="First name"
            ></v-text-field>
            <v-text-field
              v-model="userSignup.lastName"
              label="Last name"
            ></v-text-field>

            <v-text-field
              v-model="userSignup.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              label="Password"
              @click:append="show1 = !show1"
            ></v-text-field>
            <v-text-field
              v-model="userSignup.passwordConfirm"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show2 ? 'text' : 'password'"
              label="Password confirm"
              @click:append="show2 = !show2"
            ></v-text-field>
            <v-file-input
              ref="fileInput"
              v-model="userSignup.image"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Avatar"
            ></v-file-input>
          </v-form>

          <v-btn
            v-if="radioGroup === 'Signin'"
            elevation="2"
            block
            class="mt-4"
            @click="signIn()"
            >Sign in</v-btn
          ><v-btn v-else elevation="2" block class="mt-4" @click="signUp()"
            >Sign up</v-btn
          >
          <v-btn
            elevation="2"
            block
            class="mt-4"
            @click="authenticate('google')"
            >Sign in with google</v-btn
          >
          <v-btn
            elevation="2"
            block
            class="mt-4"
            @click="authenticate('github')"
            >Sign in with github</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { apiClient } from "@/config/httpRequest";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      userSignup: {
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        password: "",
        passwordConfirm: "",
        image: null,
      },
      show1: false,
      show2: false,
      radioGroup: "Signin",
      items: [
        { label: "Signin", value: "Signin" },
        { label: "Signup", value: "Signup" },
      ],
    };
  },

  methods: {
    ...mapActions(["setUserInfo"]),
    async signIn() {
      try {
        const response = await apiClient.post("auth/login", this.user);
        const res = await apiClient.get("auth/user", {
          headers: {
            Authorization: "Bearer " + response.data.access_token,
          },
        });
        if (res.status === 200) {
          this.setUserInfo(res.data);
          localStorage.setItem("token", response.data.access_token);
          this.$router.push("/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async signUp() {
      let fd = new FormData();
      fd.append("username", this.userSignup.username);
      fd.append("email", this.userSignup.email);
      fd.append("first_name", this.userSignup.firstName);
      fd.append("last_name", this.userSignup.lastName);
      fd.append("password", this.userSignup.password);
      fd.append("password_confirm", this.userSignup.passwordConfirm);
      fd.append("image", this.userSignup.image);

      try {
        const response = await apiClient.post("auth/register", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.data === "Created") {
          this.user = {
            email: this.userSignup.email,
            password: this.userSignup.password,
          };
          this.signIn();
        }
      } catch (error) {
        console.log(error);
      }
    },

    authenticate: async function (provider) {
      try {
        const res = await this.$auth.authenticate(provider);
        const access_token = res.access_token;
        const response = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        if (access_token) {
          this.setUserInfo({
            email: response.data.email,
            username: response.data.name,
            avatar: response.data.picture,
          });
          this.$router.push("/dashboard");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
.signin-background {
  background-image: url(https://img.lovepik.com/photo/40167/7075.jpg_wh300.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.signin-form {
  width: 60%;
}

.signin-form-logo {
  width: 100px;
  display: block;
  margin: 0 auto;
}
</style>
