import Vue from 'vue';
import firebase from 'firebase';
import VueFire from 'vuefire';
import App from './App.vue';
import router from './router';
import 'uikit';
import 'uikit/dist/css/uikit.min.css';
import firecreds from '../firecreds.json';

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