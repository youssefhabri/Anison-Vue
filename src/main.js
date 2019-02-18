import Vue from 'vue';
import App from './App.vue';
import router from './router';

import firebase from 'firebase';
import VueFire from 'vuefire';

import 'uikit';
import 'uikit/dist/css/uikit.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min.js';

import VueLazyload from 'vue-lazyload';

Vue.config.productionTip = false;
Vue.use(VueFire);
Vue.use(VueLazyload);

let app = '';

firebase.initializeApp({
  "apiKey": process.env.VUE_APP_FIREBASE_API_KEY,
  "authDomain": process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
  "databaseURL": process.env.VUE_APP_FIREBASE_DATABASE_URL,
  "projectId": process.env.VUE_APP_FIREBASE_PROJECT_ID,
  "storageBucket": process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  "messagingSenderId": process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
});

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});

export const db = firebase.firestore();