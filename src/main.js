import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import  '@/assets/css/base.css'
import store from "./store";
import axios from 'axios'
import MyBread from "./components/common/MyBread";

Vue.prototype.$axios=axios;

Vue.use(ElementUI,{ size: 'small', zIndex: 3000 });

Vue.config.productionTip = false;

Vue.component(MyBread.name,MyBread);

new Vue({
  render: h => h(App),
  router,
  store,
  axios,
}).$mount('#app');
