import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login/Login';
import Dashboard from '@/components/Dashboard/Dashboard';
import DetailEvent from '@/components/Event/DetailEvent';
import DetailNews from '@/components/News/DetailNews';
import NewEvent from '@/components/Event/NewEvent';
import NewNews from '@/components/News/NewNews';

Vue.use(Router);

// export default new Router({
//     routes: [{
//             path: '*',
//             redirect: '/login'
//         },
//         {
//             path: '/',
//             redirect: '/login'
//         },
//         {
//             path: '/login',
//             name: 'Login',
//             component: Login
//         },
//         {
//             path: '/dashboard',
//             name: 'Dashboard',
//             component: Dashboard
//         },
//         {
//             path: '/event/:id',
//             name: 'DetailEvent',
//             component: DetailEvent
//         }
//     ]
// });

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
            }

        },
        {
            path: '/event/:id',
            name: 'DetailEvent',
            component: DetailEvent
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
    let user = true;
    let autorizacion = to.matched.some(record => record.meta.autentificado);

    if (autorizacion && !user) {
        next('login')
    } else {
        next()
    }
})

export default router;
