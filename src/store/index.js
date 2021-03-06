import Vue from 'vue';
import Vuex from 'vuex';
import Session from './modules/session';
import Event from './modules/event';
import Notification from './modules/notification';
import Highlight from './modules/highlight'
import News from './modules/news';
import Alliance from './modules/alliance';
import Organization from './modules/organization';
import PersonalData from './modules/personalData';
import Complaint from './modules/complaint';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Session,
        Event,
        News,
        Alliance,
        Organization,
        PersonalData,
        Complaint,
        Highlight,
        Notification
    }
});
