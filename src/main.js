import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App';
import Login from './components/login';
import Dashboard from './components/dashboard';

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
  routes,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
});


// new Vue({
//   el: '#app',
//   render: h => h(App),
// });
