import Vue from 'vue';
import * as constants from '@/store/constants';

const state = {
  users: []
};

const actions = {
  [constants.PERSONALDATA_GET_USERS]: ({ commit }) => {
    return Vue.axios
      .get("/users")
      .then( response => commit(constants.PERSONALDATA_SET_USERS, response.data))
      .catch( e => console.error(e))    
  }
};

const mutations = {
  [constants.PERSONALDATA_SET_USERS]: (state, data) => {
    state.users = data;
  }
};

const getters = {
  [constants.USERS]: (state) => {
    return state.users;
  },
  [constants.PERSONALDATA_BY_ID]: (state) => (id) => {
    return state.users.find( user => user.id === id );
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}