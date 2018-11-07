import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login/Login';
import Dashboard from '@/components/Dashboard/Dashboard';
import DetailEvent from '@/components/Event/DetailEvent';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/event/:id',
      name: 'DetailEvent',
      component: DetailEvent
    }
  ]
});
