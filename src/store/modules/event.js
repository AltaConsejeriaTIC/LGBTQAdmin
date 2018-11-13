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
  },
  [constants.EVENT_UPDATE]: ({commit}, event) => {
    Vue.axios
      .put(`/events/${event.id}`, event)
      .then(response => {
        console.log(response);
        commit(constants.EVENT_SET_EVENT, event)
      })
      .catch((e) => console.log(e));
  }
};

const mutations = {
  [constants.EVENT_SET_EVENTS]: (state, events) => {
    state.events = events;
  },
  [constants.EVENT_SET_EVENT]: (state, event) => {
    for (var i = 0; i < state.events.length; i++) {
      if (state.events[i].id === event.id){
        state.events[i] = event
      }
    }
  }
};

const getters = {
  [constants.EVENTS]: (state) => {
    return state.events;
  },
  [constants.EVENT_BY_ID]: (state) => (id) => {
    return state.events.find(event => event.id === id);
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
