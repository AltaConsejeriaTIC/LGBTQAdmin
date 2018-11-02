// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { sync } from 'vuex-router-sync'
import store from './store'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = 'http://localhost:8080/'
sync(store, router)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
