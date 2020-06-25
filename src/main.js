import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import { routes } from "./routes";
import ErrorsClass from './ErrorsClass';
import axios from 'axios';

Vue.use(VueRouter);
Vue.prototype.hostname = "http://127.0.0.1:8000/api";
Vue.prototype.$hostname = "http://127.0.0.1:8000";
Vue.prototype.$ErrorsClass = ErrorsClass;
Vue.prototype.$axios = axios;

// Set Bearer token if logged in
const authUser = JSON.parse(localStorage.getItem('authUser'));
if(authUser && authUser.accessToken) {
	Vue.prototype.$axios.defaults.headers.common = {'Authorization': `Bearer ${authUser.accessToken}`};
}

// Vue.prototype.hostname = "http://127.0.0.1/cms-php/api";
// Vue.prototype.$hostname = "http://127.0.0.1/cms-php";
// Vue.prototype.hostname = "http://thegimmickboxcms.000webhostapp.com";
// Vue.prototype.hostname = "https://continentalhrd.com";
// Vue.prototype.hostname = "";

const router = new VueRouter({ routes, mode: "hash" });

router.beforeEach( (to, from, next) => {

	const authUser = JSON.parse(localStorage.getItem('authUser'));

	// All routes in cms requires auth check Except login.
	if (to.path !== '/login' && !authUser) next({ name: 'Login' });
	else next();
});
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
