import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { BootstrapVue, BootstrapVueIcons   } from 'bootstrap-vue'

Vue.config.productionTip = false
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(BootstrapVueIcons )

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
