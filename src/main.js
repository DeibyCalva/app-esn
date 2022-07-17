import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'


import VueImg from 'v-img';
 
Vue.use(VueImg);

window.Buffer = window.Buffer || require("buffer").Buffer;



Vue.use(VueToast);
Vue.use(VueAxios, axios)
Vue.use(Vuelidate)


Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
