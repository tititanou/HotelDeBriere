import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import BootstrapVue from 'bootstrap-vue';
import firebase from "firebase";
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  created(){
    firebase.initializeApp({
      apiKey: "AIzaSyCccFIiCeayuKmI-p1JJE005FNmMCxCaCU",
      authDomain: "hotel-de-briere.firebaseapp.com",
      databaseURL: "https://hotel-de-briere.firebaseio.com",
      projectId: "hotel-de-briere",
      storageBucket: "hotel-de-briere.appspot.com",
      messagingSenderId: "1033408620032",
      appId: "1:1033408620032:web:0b848445eb219bdbad5ae5",
      measurementId: "G-WCREGXL300"
    })
},
}).$mount('#app')