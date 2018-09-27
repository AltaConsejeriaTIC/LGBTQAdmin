import Vue from 'vue'
import * as constants from '@/store/constants'

const state = {

}

const actions = {
    [constants.SESSION_LOGIN]: ({ commit }, params) => {
        Vue.axios.post('/login', params)
            .then(response => response.data)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            })
    }
}

const mutations = {

}

const getters = {

}

export default {
    state,
    actions,
    mutations,
    getters
}