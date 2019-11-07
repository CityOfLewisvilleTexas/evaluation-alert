import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import SuiVue from 'semantic-ui-vue';
import moment from 'moment';
import 'semantic-ui-css/semantic.min.css';

Vue.config.productionTip = false;
Vue.use(SuiVue, moment);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
