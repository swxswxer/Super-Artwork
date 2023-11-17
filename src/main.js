import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  beforeCreate() {
    // 尽量早的执行挂载全局事件总线对象的操作
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#app')
