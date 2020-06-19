import Vue from 'vue'
import App from './App.vue'
import router from "./router/router"
import less from "less"
import Vant from "vant"
import 'vant/lib/index.css';
Vue.config.productionTip = false
Vue.use(less)
Vue.use(Vant)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
