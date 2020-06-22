import Vue from 'vue'
import App from './App.vue'
import router from "./router/router"
import less from "less"
import Vant from "vant"
import 'vant/lib/index.css';
import store from "./store/vuex"
Vue.config.productionTip = false
Vue.use(less)
Vue.use(Vant)


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
