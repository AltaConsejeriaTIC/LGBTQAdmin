import Vue from 'vue'
import * as constants from '@/store/constants'

const state = {
    events: []
}

const actions = {
    [constants.EVENT_GET_EVENTS]: ({ commit }, data) => {
        Vue.axios.get(`/events`)
            .then(response => response.data)
            .then(data => { console.log(data) })
            .catch(e => console.log(e))
    }
}

export default {
    state,
    actions
    // mutations,
    // getters
}