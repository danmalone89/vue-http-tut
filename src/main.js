import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';

Vue.use(VueResource); // Adds a plugin to our core instance functionaility
Vue.http.options.root = "https://vue-http-tut.firebaseio.com";

new Vue({
  el: '#app',
  render: h => h(App)
})
