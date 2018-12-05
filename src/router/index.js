import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login/Login';
import Dashboard from '@/components/Dashboard/Dashboard';
import store from '@/store';
import { Alliance,DetailAlliance,NewAlliance } from '@/components/Alliance';
import { Event,DetailEvent,NewEvent } from '@/components/Event';
import { News,DetailNews,NewNews } from '@/components/News';

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
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: {
            autentificado: true
          },
          children: [
            {
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
              path: '/alliance',
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
          ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    let isLogged = store.getters['session/IS_LOGGED'];
    let autorizacion = to.matched.some(record => record.meta.autentificado);

    if (autorizacion && !isLogged) {
        next('login')
    } else {
        next()
    }
})

export default router;
