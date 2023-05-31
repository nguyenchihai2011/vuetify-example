import Vue from "vue";
import App from "./components/App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { store } from "@/store";
import { apiClient } from "@/config/httpRequest";

import VueAxios from "vue-axios";
import VueAuthenticate from "vue-authenticate";
import axios from "axios";

Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, {
  baseUrl: "http://localhost:8081", // Your API domain

  providers: {
    google: {
      clientId:
        "656890104634-i6i9s9vqen2cm0mvpu7pnvblssmtm7qv.apps.googleusercontent.com",
      redirectUri: "http://localhost:8080", // Your callback URL
      url: "/auth/google", // Your OAuth endpoint URL
      responseType: "token", // Response type: 'token' for Implicit Grant flow
    },
    // facebook: {
    //   clientId: "763396508664712",
    //   redirectUri: "http://localhost:5173", // Đường dẫn chuyển hướng của bạn
    //   url: "/auth/facebook", // Đường dẫn OAuth endpoint của Facebook
    //   authorizationEndpoint: "https://www.facebook.com/v12.0/dialog/oauth",
    //   scope: ["email"], // Phạm vi yêu cầu cho xác thực Facebook
    // },
    github: {
      clientId: "14866fb3f2db9c675bff",
      redirectUri: "http://localhost:8080", // Đường dẫn chuyển hướng của bạn
      url: "/auth/github", // Đường dẫn OAuth endpoint của GitHub
      authorizationEndpoint: "https://github.com/login/oauth/authorize",
      scope: ["user:email"], // Phạm vi yêu cầu cho xác thực GitHub
    },
  },
});

Vue.config.productionTip = false;

// Kiểm tra xem token đăng nhập có tồn tại trong localStorage hay không
const token = localStorage.getItem("token");
const google_token = localStorage.getItem("vue-authenticate.vueauth_token");

if (token) {
  // Gửi token đến máy chủ để xác thực
  try {
    const res = await apiClient.get("auth/user", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    // Nếu xác thực thành công và nhận được thông tin người dùng
    if (res.status === 200) {
      const userInfo = res.data;
      // Lưu trạng thái đăng nhập vào Vuex
      store.commit("SET_USER_INFO", userInfo);
      // router.push("/dashboard");
    }
  } catch (err) {
    if (err.response.status === 401) {
      const response = await apiClient.post("auth/refresh");
      const res = await apiClient.get("auth/user", {
        headers: {
          Authorization: "Bearer " + response.data.access_token,
        },
      });

      // Nếu xác thực thành công và nhận được thông tin người dùng
      if (res.status === 200) {
        localStorage.setItem("token", response.data.access_token);
        const userInfo = res.data;
        // Lưu trạng thái đăng nhập vào Vuex
        store.commit("SET_USER_INFO", userInfo);
        router.push("/dashboard");
      }
    }
  }
} else if (google_token) {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${google_token}`,
        },
      }
    );
    if (google_token) {
      const userInfo = {
        email: response.data.email,
        username: response.data.name,
        avatar: response.data.picture,
      };
      store.commit("SET_USER_INFO", userInfo);
      // router.push("/dashboard");
    }
  } catch (err) {
    console.log(err);
  }
}

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
