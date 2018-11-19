import Vue from 'vue';
import Vuex from 'vuex';
import Session from './modules/session';
import Event from './modules/event';
import News from './modules/news'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Session,
    Event,
    News
  }
});
