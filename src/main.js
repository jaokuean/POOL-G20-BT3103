import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store";
import database from './firebase.js'

Vue.config.productionTip = false;

database.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");