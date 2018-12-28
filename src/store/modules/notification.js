import Vue from 'vue';
import * as constants from '@/store/constants';

const state = {
  events: [],
  currentEvents: []
};

const actions = {
  [constants.NOTIFICATION_SEND]: ({commit}, event) => {
    return new Promise((resolve, reject) => {
      Vue.axios
        .post('/send', event, { headers: { token: sessionStorage.getItem('token') }})
        .then(response => {
          resolve( response.data.result);
        })
        .catch((e) => {
          console.error(e);
          reject();
        });
    })
  }

};

export default {
  state,
  actions,
};
