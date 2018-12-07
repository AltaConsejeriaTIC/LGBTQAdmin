import Vue from 'vue';
import * as constants from '@/store/constants';

const state = {
  complaints: []
};

const actions = {
  [constants.COMPLAINT_GET_COMPLAINTS]: ({ commit }) => {
    return Vue.axios
      .get("/complaints")
      .then( response => commit(constants.COMPLAINT_SET_COMPLAINTS, response.data))
      .catch( e => console.error(e))    
  }
};

const mutations = {
  [constants.COMPLAINT_SET_COMPLAINTS]: (state, data) => {
    state.complaints = data;
  }
};

const getters = {
  [constants.COMPLAINTS]: (state) => {
    return state.complaints;
  },
  [constants.COMPLAINT_BY_ID]: (state) => (id) => {
    return state.complaints.find( complaint => complaint.id === id );
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}