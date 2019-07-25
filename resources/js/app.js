
import './bootstrap';
import './import';
import Vue from 'vue';
import store from './store';
import App from './components/App.vue';

import anime from 'animejs';
window.anime = anime;

import Typed from 'typed.js';
window.Typed = Typed;

// Vue Router
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import router from './router.js';

Vue.component( 'App', App );

window.width = window.innerWidth;
window.addEventListener('resize', () => {
    width = window.innerWidth;
});

// axios.defaults.headers.common['Authorization'] = 'Bearer ' + window.localStorage.getItem('JWT');
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'Access-Control-Allow-Methods';
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token';

const app = new Vue({
    el: '#app',
    router , store
});
