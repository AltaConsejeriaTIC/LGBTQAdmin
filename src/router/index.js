import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login/Login';
import Dashboard from '@/components/Dashboard/Dashboard';
import DetailEvent from '@/components/Event/DetailEvent';
import * as constants from '../store/constants';
import store from '@/store';
import DetailNews from '@/components/News/DetailNews';
import NewEvent from '@/components/Event/NewEvent';
import NewNews from '@/components/News/NewNews';
import Event from '@/components/Event/Event';
import News from '@/components/News/News';

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
