import Vue from 'vue';
import * as constants from '@/store/constants';

const state = {
  events: []
};

const actions = {
  [constants.EVENT_GET_EVENTS]: ({ commit }) => {
    Vue.axios
      .get(`/events`)
      .then((response) => response.data)
      .then((events) => {
        commit(constants.EVENT_SET_EVENTS, events);
      })
      .catch((e) => console.log(e));
  }
};

const mutations = {
  [constants.EVENT_SET_EVENTS]: (state, events) => {
    state.events = events;
  }
};

const getters = {
  [constants.EVENTS]: (state) => {
    return state.events;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
