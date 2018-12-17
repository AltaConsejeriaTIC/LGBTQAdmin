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
import * as ENV from './env'
import BootstrapVue from 'bootstrap-vue'
import JsonExcel from 'vue-json-excel'


 
Vue.component('downloadExcel', JsonExcel);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(Vuetify);
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = ENV.ENDPOINT;
sync(store, router);


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
