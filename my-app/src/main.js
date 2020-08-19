import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import BootstrapVue from 'bootstrap-vue';
import firebase from "firebase";
import store from '@/store/store';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from "axios";

Vue.use(BootstrapVue)

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;


const configOptions = {
  apiKey: "AIzaSyCccFIiCeayuKmI-p1JJE005FNmMCxCaCU",
  authDomain: "hotel-de-briere.firebaseapp.com",
  databaseURL: "https://hotel-de-briere.firebaseio.com",
  projectId: "hotel-de-briere",
  storageBucket: "hotel-de-briere.appspot.com",
  messagingSenderId: "1033408620032",
  appId: "1:1033408620032:web:0b848445eb219bdbad5ae5",
  measurementId: "G-WCREGXL300"
};

firebase.initializeApp(configOptions);

let app;

firebase.auth().onAuthStateChanged(user => {
  console.log("user", user);
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});

/*
firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
*/

/*
new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    firebase.initializeApp({
      
    })
},
}).$mount('#app')

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

import store from "./store";

Vue.config.productionTip = false;
*/