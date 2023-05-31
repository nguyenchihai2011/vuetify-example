import { apiClient } from "../../config/httpRequest";
import project from "./auth";

const state = {
  users: [],
};

const getters = {
  getUsers: (state) => {
    const filt = project.state.userInfo;
    return state.users
      .filter((user) => user._id !== filt._id)
      .sort((a, b) => (a.username > b.username ? 1 : -1));
  },
};

const mutations = {
  setUsers: (state, payload) => {
    state.users = payload;
  },
};

const actions = {
  fetchAPIUsers: async ({ commit }) => {
    try {
      const response = await apiClient.get("users");
      commit("setUsers", response.data);
    } catch (error) {
      console.log(error);
    }
  },
};

export default { state, getters, mutations, actions };
