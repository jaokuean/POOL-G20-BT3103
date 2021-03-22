import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from "./store";
//import PoolSidebar from './components/PoolSidebar.vue'

Vue.config.productionTip = false;
//Vue.component('poolSidebar', PoolSidebar)
const config = {
  apiKey: "AIzaSyDDIm2Qkh5suaWll769SwbPLXuvMLE-ts4",
  authDomain: "pooldb-b6390.firebaseapp.com",
  projectId: "pooldb-b6390",
  storageBucket: "pooldb-b6390.appspot.com",
  messagingSenderId: "190157167499",
  appId: "1:190157167499:web:5ff619af63db1df751ed8e",
  measurementId: "G-6CESK7X59P"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");