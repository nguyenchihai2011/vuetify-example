import { apiClient } from "../../config/httpRequest";
import project from "./auth";

const state = {
  projects: [],
};

const getters = {
  getProjects: (state) => {
    return state.projects;
  },

  getProjectByUser: (state) => {
    const filt = project.state.userInfo;
    return state.projects.filter((project) => project.owner === filt.username);
  },
};

const mutations = {
  setProjects: (state, payload) => {
    state.projects = payload;
  },
};

const actions = {
  fetchAPIProjects: async ({ commit }) => {
    try {
      const response = await apiClient.get("projects");
      commit("setProjects", response.data);
    } catch (error) {
      console.log(error);
    }
  },
};

export default { state, getters, mutations, actions };
