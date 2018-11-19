import Vue from 'vue';
import * as constants from '@/store/constants';

const state = {
  events: []
};

const actions = {
  [constants.EVENT_GET_EVENTS]: ({ commit }) => {
    console.log("llamando back");
    Vue.axios
      .get(`/events`)
      .then((response) => response.data)
      .then((events) => commit(constants.EVENT_SET_EVENTS, events))
      .catch((e) => console.log(e));
  },
  [constants.EVENT_UPDATE]: ({commit}, event) => {
    Vue.axios
      .put(`/events/${event.id}`, event)
      .then(response => commit(constants.EVENT_SET_EVENT, event))
      .catch((e) => console.log(e));
  },
  [constants.EVENT_CHANGE_STATE]: ({commit}, event) => {
    event.state = !event.state;
    Vue.axios
      .put(`/events/${event.id}`, event)
      .then(response => commit(constants.EVENT_SET_EVENT, event) )
      .catch((e) => console.log(e));
  },
  [constants.EVENT_CREATE_EVENT]: ({commit}, event) => {
    console.log("----------------",event);
    Vue.axios
      .post('/events', event)
      .then(response => {
        event.id = response.data.id
        commit(constants.EVENT_ADD_EVENT, event);
        console.log(response);
      })
      .catch((e) => console.log(e));
  },

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
  },
  [constants.EVENT_ADD_EVENT]: (state, event) => {
    state.events.push(event);
  },
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
