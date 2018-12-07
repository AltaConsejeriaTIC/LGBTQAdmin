import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login/Login';
import Dashboard from '@/components/Dashboard/Dashboard';
import DetailEvent from '@/components/Event/DetailEvent';
import store from '@/store';
import DetailNews from '@/components/News/DetailNews';
import NewEvent from '@/components/Event/NewEvent';
import NewNews from '@/components/News/NewNews';
import DetailAlliance from '@/components/Alliance/DetailAlliance';
import NewAlliance from '@/components/Alliance/NewAlliance';
import DetailOrganization from '@/components/Organization/DetailOrganization';
import NewOrganization from '@/components/Organization/NewOrganization';
import PersonalData from '@/components/PersonalData/PersonalData';
import DetailUser from '@/components/PersonalData/DetailUser';
import Complaint from '@/components/Complaint/Complaint';
import DetailComplaint from '@/components/Complaint/DetailComplaint';

Vue.use(Router);


const router = new Router({
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
            path: '/dashboard/:component',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                autentificado: true
            }

        },
        {
            path: '/event/:id',
            name: 'DetailEvent',
            component: DetailEvent,
            meta: {
                autentificado: true
            }
        },
        {
            path: '/createevent',
            name: 'NewEvent',
            component: NewEvent
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
            path: '/user/:id',
            name: 'DetailUser',
            component: DetailUser
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
        }
    ]
})

router.beforeEach((to, from, next) => {
    let isLogged = store.getters['session/IS_LOGGED'];
    console.log('===========', store.getters['session/IS_LOGGED']);
    let autorizacion = to.matched.some(record => record.meta.autentificado);

    if (autorizacion && !isLogged) {
        next('login')
    } else {
        next()
    }
})

export default router;