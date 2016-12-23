import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './../components/login';
import Dashboard from './../components/dashboard';
import drivers from './../components/drivers';
import newDriver from './../components/newDriver';
import driverDetail from './../components/driverDetail';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      {
        path: '',
        component: drivers,
      },
      {
        path: 'new-driver',
        component: newDriver,
      },
      {
        path: 'driver/:did',
        name: 'viewDriver',
        component: driverDetail,
      },
    ],
  },
  {
    path: '/',
    redirect: '/login',
  },
];

const router = new VueRouter({
  // mode: 'history',
  routes,
});

export default router;
