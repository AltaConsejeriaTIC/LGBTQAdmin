import Vue from 'vue';
import * as constants from '@/store/constants';
import { resolve } from 'url';
import { rejects } from 'assert';

const state = {
  highlights: []
};

const actions = {
  [constants.HIGHLIGHT_GET_HIGHLIGHT]: ({ commit }) => {
    return new Promise((resolve,reject) => {
      Vue.axios
      .get(`/highlights`)
      .then((response) => response.data)
      .then((highlights) => {
        commit(constants.HIGHLIGHT_SET_HIGHLIGHTS, highlights);
        resolve()
      })
      .catch((e) => {
        console.error(e);
        reject();
      });
    })     
  },
  [constants.HIGHLIGHT_CREATE_HIGHLIGHT]: ({commit}, highlight) => {
    return Vue.axios
      .post('/highlights', highlight, { headers: { token: sessionStorage.getItem('token') }})
      .then(response => {
        highlight.id = response.data.id
        commit(constants.HIGHLIGHT_ADD_HIGHLIGHT, highlight);
      })
      .catch((e) => console.log(e));
  },
  [constants.HIGHLIGHT_DELETE_HIGHLIGHT]: ({commit}, highlightId) => {
    return Vue.axios
      .delete(`/highlights/${highlightId}`,  { headers: { token: sessionStorage.getItem('token') }})
      .then(response => {
        commit(constants.HIGHLIGHT_UPDATE_DELETE_HIGHLIGHT, highlightId);
      })
      .catch((e) => console.log(e));
  },
};

const mutations = {
  [constants.HIGHLIGHT_SET_HIGHLIGHTS]: (state, highlights) => {
    state.highlights = highlights;
  },
  [constants.HIGHLIGHT_ADD_HIGHLIGHT]: (state, highlight) => {
    state.highlights.push(highlight);
  },
  [constants.HIGHLIGHT_UPDATE_DELETE_HIGHLIGHT]: (state, highlightId) => {
    state.highlights = state.highlights.filter(function( current ){ return current.id != highlightId });
  }
};

const getters = {
  [constants.HIGHLIGHTS]: (state) => {
    return state.highlights;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
