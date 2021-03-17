import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import md5 from 'md5'
import milligram from 'milligram'


window.api = axios.create({
  baseURL: 'https://allweb.fun/coop/api/',
  headers: { Authorization: 'd1d90f3f69acf3e2741d189ac8e18552daa83c2c' }
});
Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false
new Vue({
  beforeCreate(){
    api.interceptors.request.use(config => {
      if(this.$store.state.token){
        config.url += '?token='+this.$store.state.token;
      }
      return config;
    })
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
