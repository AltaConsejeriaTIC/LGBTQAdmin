import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login/Login';
import Notification from '@/components/Notification/Notification'
import Dashboard from '@/components/Dashboard/Dashboard';
import store from '@/store';
import { Alliance, DetailAlliance, NewAlliance } from '@/components/Alliance';
import { Event, DetailEvent, NewEvent } from '@/components/Event';
import { News, DetailNews, NewNews } from '@/components/News';
import { Organization, DetailOrganization, NewOrganization } from '@/components/Organization';
import { Complaint, DetailComplaint } from '@/components/Complaint';
import { PersonalData } from '@/components/PersonalData';
import Home from '@/components/home/Home';

Vue.use(Router);


const router = new Router({
    mode: 'history',
    routes: [{
            path: '*',
            redirect: '/login'
        },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                autentificado: true
            },
            children: [{
                    path: '/events',
                    component: Event,
                    name: "Event"
                },
                {
                    path: '/event/:id',
                    name: 'DetailEvent',
                    component: DetailEvent,
                },
                {
                    path: '/createevent',
                    name: 'NewEvent',
                    component: NewEvent
                },
                {
                  path: '/notification',
                  name: 'Notification',
                  component: Notification
                },
                {
                    path: '/news',
                    name: 'News',
                    component: News
                },
                {
                    path: '/news/:id',
                    name: 'DetailNews',
                    component: DetailNews
                },
                {
                    path: '/createnews',
                    name: 'NewNews',
                    component: NewNews
                },
                {
                    path: '/alliances',
                    name: 'Alliance',
                    component: Alliance
                },
                {
                    path: '/alliance/:id',
                    name: 'DetailAlliance',
                    component: DetailAlliance
                },
                {
                    path: '/createalliance',
                    name: 'NewAlliance',
                    component: NewAlliance
                },
                {
                    path: '/organizations',
                    name: 'Organization',
                    component: Organization
                },
                {
                    path: '/organization/:id',
                    name: 'DetailOrganization',
                    component: DetailOrganization
                },
                {
                    path: '/createorganization',
                    name: 'NewOrganization',
                    component: NewOrganization
                },
                {
                    path: '/personaldata',
                    name: 'PersonalData',
                    component: PersonalData
                },
                {
                    path: '/complaints',
                    name: 'Complaint',
                    component: Complaint
                },
                {
                    path: '/complaint/:id',
                    name: 'DetailComplaint',
                    component: DetailComplaint
                },
                {
                    path: '/homeCarousel',
                    name: 'Home',
                    component: Home
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    let isLogged = store.getters['session/IS_LOGGED'];
    let requireAuthorization = to.matched.some(record => record.meta.autentificado);
    
    if (requireAuthorization && !isLogged) {
        next('login')
    }
    else if(isLogged && to.name==="Login"){
        next('/homeCarousel')
    }
    else {
        next()
    }
})

export default router;
