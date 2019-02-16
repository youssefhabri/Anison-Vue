import Vue from 'vue';
import App from './App.vue';
import router from './router';

import firebase from 'firebase';
import VueFire from 'vuefire';
import firecreds from '../firecreds.json';

import 'uikit';
import 'uikit/dist/css/uikit.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min.js';

Vue.config.productionTip = false;
Vue.use(VueFire);

let app = '';

firebase.initializeApp(firecreds);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});

export const db = firebase.firestore();