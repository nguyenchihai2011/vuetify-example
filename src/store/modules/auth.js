const state = {
  userInfo: null,
};

const getters = {
  GET_USER_INFO(state) {
    return state.userInfo;
  },
};

const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  RESET_USER_INFO(state) {
    state.userInfo = null;
  },
};

const actions = {
  setUserInfo({ commit }, userInfo) {
    commit("SET_USER_INFO", userInfo);
  },
  resetUserInfo({ commit }) {
    commit("RESET_USER_INFO");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
