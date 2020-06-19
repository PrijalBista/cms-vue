import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import { routes } from "./routes";

Vue.use(VueRouter);
Vue.prototype.hostname = "http://127.0.0.1:8000/api";
Vue.prototype.$hostname = "http://127.0.0.1:8000";
// Vue.prototype.hostname = "http://127.0.0.1/cms-php/api";
// Vue.prototype.$hostname = "http://127.0.0.1/cms-php";
// Vue.prototype.hostname = "http://thegimmickboxcms.000webhostapp.com";
// Vue.prototype.hostname = "https://continentalhrd.com";
// Vue.prototype.hostname = "";

const router = new VueRouter({ routes, mode: "hash" });

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
