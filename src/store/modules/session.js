import Vue from 'vue';
import * as constants from '@/store/constants';

const state = {
  token: null
};

const actions = {
  [constants.SESSION_LOGIN]: ({ commit }, params) => {
    Vue.axios
      .post('/login', params)
      .then((response) => {            
        commit(constants.SESSION_SET_TOKEN, response.data.token);
        sessionStorage.setItem('token', response.data.token);
      })
      .catch((error) => {
        console.error(error);
      });
  },
  [constants.SESSION_LOGOUT]: ({ commit }) => {
    let id = sessionStorage.getItem('admin')
    Vue.axios
      .put('/deleteToken', {}, { headers: { token: sessionStorage.getItem('token') }})
      .then((response) => {
        commit(constants.SESSION_SET_TOKEN, null);
        sessionStorage.clear();
      })
      .catch((error) => {
        console.error(error);
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
