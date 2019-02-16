import firebase from 'firebase';
import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/views/Home';
import Login from '@/views/Login';
import Register from '@/views/Register';
import Admin from '@/views/Admin';

Vue.use(Router);

const admins = [
  'deterimo@gmail.com'
];

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
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  var requiresAdmin = false;
  var isAdmin = false;

  if (currentUser) {
    requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
    isAdmin = admins.includes(currentUser.email);
  }

  if (requiresAuth && !currentUser) next('login');
  else if (requiresAuth && requiresAdmin && isAdmin) next('admin');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

export default router;