import Vue from 'vue';
import * as constants from '@/store/constants';
import { rejects } from 'assert';

const state = {
    organizations: []
};

const actions = {
    [constants.ORGANIZATION_GET_ORGANIZATIONS]: ({ commit }) => {
        return Vue.axios
            .get(`/allOrganizations`)
            .then((response) => response.data)
            .then((organizations) => commit(constants.ORGANIZATION_SET_ORGANIZATIONS, organizations))
            .catch((e) => console.log(e));
    },
    [constants.ORGANIZATION_CALL_BY_ID]: ({ commit }, id) => {
        return new Promise( (resolve,reject) => {
            Vue.axios
              .get(`/organizations/${id}`)            
              .then( organization => resolve(organization.data))
              .catch((e) => {
                console.log(e);
                reject();
              });
        })            
    },
    [constants.ORGANIZATION_UPDATE]: ({ commit }, organization) => {
      return new Promise((resolve,reject) => {
        Vue.axios
          .put(`/organizations/${organization.id}`, organization, { headers: { token: sessionStorage.getItem('token') } })
          .then(response => {
              commit(constants.ORGANIZATION_SET_ORGANIZATION, organization);
              resolve();
          })
          .catch((e) => {
              console.error(e);
              reject();
            });
      });
    },
    [constants.ORGANIZATION_CHANGE_STATE]: ({ commit }, organization) => {        
        organization.state = !organization.state;
        return Vue.axios
            .put(`/updateOrganizationState/${organization.id}`, organization, { headers: { token: sessionStorage.getItem('token') } })
            .then(response => commit(constants.ORGANIZATION_SET_ORGANIZATION, organization))
            .catch((e) => console.log(e));
    },
    [constants.ORGANIZATION_DELETE]: ({ commit }, organization) => {
        let id = organization.id;
        let index = state.organizations.indexOf(organization);
        return new Promise( (resolve, reject) => {
            Vue.axios
              .put(`/updateOrganizationDeleted/${id}`, {deleted: true}, { headers: { token: sessionStorage.getItem('token') } })
              .then(response => {
                  commit(constants.ORGANIZATION_DELETE_ORGANIZATION, index);
                  resolve();
              })
              .catch((e) => {
                  console.error(e);
                  reject();
              });
        })
    },
    [constants.ORGANIZATION_CREATE_ORGANIZATION]: ({ commit }, organization) => {
        return new Promise( (resolve,reject) => {
            Vue.axios
                .post('/organizations', organization, { headers: { token: sessionStorage.getItem('token') } })
                .then(response => {
                    organization.id = response.data.id                    
                    commit(constants.ORGANIZATION_ADD_ORGANIZATION, organization);
                    resolve();
                })
                .catch((e) => {
                    console.error(e);
                    reject();
                });
        })        
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
    },
    [constants.ORGANIZATION_DELETE_ORGANIZATION]: (state, organization) => {
        state.organizations.splice(organization, 1);
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
