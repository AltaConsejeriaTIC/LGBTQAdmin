import Vue from 'vue';
import * as constants from '@/store/constants';

const state = {
  token: null
};

const actions = {
  [constants.SESSION_LOGIN]: ({ commit }, params) => {
    Vue.axios
      .post('/login', params)
      .then((response) => response.data)
      .then((data) => {
        commit(constants.SESSION_SET_TOKEN, data.token);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

const mutations = {
  [constants.SESSION_SET_TOKEN]: (state, token) => {
    state.token = token;
  }
};

const getters = {
  [constants.SESSION_IS_LOGGED]: (state) => {
    return state.token != null && state.token != '';
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
