// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import common from './assets/js/common.js';
import moment from 'moment'

Vue.prototype.$moment = moment
Vue.prototype.common = common;

Vue.config.productionTip = false

import VConsole from 'vconsole' //引入
new VConsole() //初始化


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
