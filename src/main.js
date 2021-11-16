import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import common from '@/assets/css/common.css'
import style from '@/assets/css/style.css'

Vue.config.productionTip = false
Vue.use(common);
Vue.use(style);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
