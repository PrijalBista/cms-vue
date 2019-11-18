import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import { routes } from "./routes";

Vue.use(VueRouter);
// Vue.prototype.hostname = "http://localhost/jinmvc";
Vue.prototype.hostname = "http://thegimmickboxcms.000webhostapp.com/";

const router = new VueRouter({ routes, mode: "hash" });

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
