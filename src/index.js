import '../assets/less/style.less'

import Vue from 'vue'
import VueScrollTo from 'vue-scrollto';
import BootstrapVue from 'bootstrap-vue'

import router from './router'
import App from './App'

Vue.use(BootstrapVue);
Vue.use(VueScrollTo);

/* eslint-disable-next-line no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
