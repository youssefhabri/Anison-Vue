import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';
import VueAnalytics from 'vue-ua';

import Home from '@/views/Home';
import Login from '@/views/Login';
import Register from '@/views/Register';
import Play from '@/views/Play';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/play/:songid',
      name: 'play',
      component: Play,
      props: true,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

Vue.use(VueAnalytics, {
  appName: 'Anison',
  appVersion: '1.0',
  trackingId: 'UA-83961889-5',
  vueRouter: router,
  trackPage: true, 
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

export default router;