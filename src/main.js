import Vue from 'vue'
import App from './App.vue'
import PoolSidebar from './components/PoolSidebar.vue'

Vue.component('poolSidebar', PoolSidebar)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
