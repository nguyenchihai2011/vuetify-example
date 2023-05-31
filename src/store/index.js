import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";
import project from "./modules/projects";
import user from "./modules/users";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    project,
    user,
    auth,
  },
});
