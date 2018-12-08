import Vue from 'vue';
import * as constants from '@/store/constants';

const state = {
    organizations: []
};

const actions = {
    [constants.ORGANIZATION_GET_ORGANIZATIONS]: ({ commit }) => {
        return Vue.axios
            .get(`/organizations`)
            .then((response) => response.data)
            .then((organizations) => commit(constants.ORGANIZATION_SET_ORGANIZATIONS, organizations))
            .catch((e) => console.log(e));
    },
    [constants.ORGANIZATION_UPDATE]: ({ commit }, organization) => {
      console.log(organization);
      return Vue.axios
          .put(`/organizations/${organization.id}`, organization, { headers: { token: sessionStorage.getItem('token') } })
          .then(response => {
              commit(constants.ORGANIZATION_SET_ORGANIZATION, organization);
              console.log("------Organizacion  Actualizada-------")
          })
          .catch((e) => console.log(e));
    },
    [constants.ORGANIZATION_CHANGE_STATE]: ({ commit }, organization) => {
        console.log('ORGANIZATION==', organization);
        organization.state = !organization.state;
        return Vue.axios
            .put(`/updateOrganizationState/${organization.id}`, organization, { headers: { token: sessionStorage.getItem('token') } })
            .then(response => commit(constants.ORGANIZATION_SET_ORGANIZATION, organization))
            .catch((e) => console.log(e));
    },
    [constants.ORGANIZATION_CREATE_ORGANIZATION]: ({ commit }, organization) => {
        return Vue.axios
            .post('/organizations', organization, { headers: { token: sessionStorage.getItem('token') } })
            .then(response => {
                organization.id = response.data.id
                console.log(organization);
                commit(constants.ORGANIZATION_ADD_ORGANIZATION, organization);
            })
            .catch((e) => console.log(e));
    }
};

const mutations = {
    [constants.ORGANIZATION_SET_ORGANIZATIONS]: (state, organizations) => {
        state.organizations = organizations;
    },
    [constants.ORGANIZATION_SET_ORGANIZATION]: (state, organization) => {
        for (var i = 0; i < state.organizations.length; i++) {
            if (state.organizations[i].id === organization.id) {
                state.organizations[i] = organization;
            }
        }
    },
    [constants.ORGANIZATION_ADD_ORGANIZATION]: (state, organization) => {
        state.organizations.push(organization);
    }
};

const getters = {
    [constants.ORGANIZATIONS]: (state) => {
        return state.organizations;
    },
    [constants.ORGANIZATION_BY_ID]: (state) => (id) => {
        return state.organizations.find(organization => organization.id === id);
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
