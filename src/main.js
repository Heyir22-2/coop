import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import md5 from 'md5'
import milligram from 'milligram'


window.api = axios.create({
  baseURL: 'https://tools.sopress.net/iut/coop/api/',
  headers: { Authorization: 'a3627a7d2ae1a8ba803042b568a0141c23a79510' }
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
