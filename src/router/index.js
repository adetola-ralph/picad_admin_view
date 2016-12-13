import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './../components/login';
import Dashboard from './../components/dashboard';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/dashboard',
    component: Dashboard,
  },
  {
    path: '/',
    redirect: '/login',
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
