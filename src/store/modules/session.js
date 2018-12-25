import Vue from 'vue';
import * as constants from '@/store/constants';

const state = {
  token: sessionStorage.getItem('token') || null,
  alert: false
};

const actions = {
  [constants.SESSION_LOGIN]: ({ commit }, params) => {
    Vue.axios
      .post('/login', params)
      .then((response) => {
        commit(constants.SESSION_SET_ALERT, false);
        commit(constants.SESSION_SET_TOKEN, response.data.token);
        sessionStorage.setItem('token', response.data.token);
      })
      .catch((error) => {
        console.error(error);
        commit(constants.SESSION_SET_ALERT, true);
      });
  },
  [constants.SESSION_LOGOUT]: ({ commit }) => {
    let id = sessionStorage.getItem('admin')
    Vue.axios
      .put('/deleteToken', {}, { headers: { token: sessionStorage.getItem('token') }})
      .then((response) => {
        commit(constants.SESSION_SET_TOKEN, null);
        sessionStorage.removeItem('token');
      })
      .catch((error) => {
        console.error(error);
      });
  }  
};

const mutations = {
  [constants.SESSION_SET_TOKEN]: (state, token) => {
    state.token = token;
  },
  [constants.SESSION_SET_ALERT]: (state, value) => {
    state.alert = value;
  }
};

const getters = {
  [constants.SESSION_IS_LOGGED]: (state) => {    
    return state.token != null && state.token != '';
  },
  [constants.SESSION_INVALID_LOGIN]: (state) => {    
    return state.alert;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
