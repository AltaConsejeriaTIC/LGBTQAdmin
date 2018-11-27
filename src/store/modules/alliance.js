import Vue from 'vue';
import * as constants from '@/store/constants';

const state = {
  alliances: []
};

const actions = {
  [constants.ALLIANCE_GET_ALLIANCES]: ({ commit }) => {
    return Vue.axios
      .get(`/alliances`)
      .then((response) => response.data)
      .then((alliances) => commit(constants.ALLIANCE_SET_ALLIANCES, alliances))
      .catch((e) => console.log(e));
  },
  [constants.ALLIANCE_UPDATE]: ({commit}, alliance) => {
    return Vue.axios
      .put(`/alliance/${alliance.id}`, alliance, { headers: { token: sessionStorage.getItem('token') }})
      .then(response =>{
        commit(constants.ALLIANCE_SET_ALLIANCE, alliance);
        console.log("------Alianza Actualizada-------")
      })
      .catch((e) => console.log(e));
  },
  [constants.ALLIANCE_CHANGE_STATE]: ({commit}, alliance) => {
    alliance.state = !alliance.state;
    return Vue.axios
      .put(`/alliance/${alliance.id}`, alliance, { headers: { token: sessionStorage.getItem('token') }})
      .then(response => commit(constants.ALLIANCE_SET_ALLIANCE, alliance))
      .catch((e) => console.log(e));
  },
  [constants.ALLIANCE_CREATE_ALLIANCE]: ({commit}, alliance) => {
    return Vue.axios
      .post('/alliances', alliance, { headers: { token: sessionStorage.getItem('token') }})
      .then(response => {
        alliance.id = response.data.id
        console.log(alliance);
        commit(constants.ALLIANCE_ADD_ALLIANCE, alliance);
      })
      .catch((e) => console.log(e));
  }
};

const mutations = {
  [constants.ALLIANCE_SET_ALLIANCES]: (state, alliances) => {
    state.alliances = alliances;
  },
  [constants.ALLIANCE_SET_ALLIANCE]: (state, alliance) => {
    for (var i = 0; i < state.alliances.length; i++) {
      if (state.alliances[i].id === alliance.id){
        state.alliances[i] = alliance;
      }
    }
  },
  [constants.ALLIANCE_ADD_ALLIANCE]: (state, alliance) => {
    state.alliances.push(alliance);
  }
};

const getters = {
  [constants.ALLIANCES]: (state) => {
    return state.alliances;
  },
  [constants.ALLIANCE_BY_ID]: (state) => (id) => {
    return state.alliances.find(alliance => alliance.id === id);
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
