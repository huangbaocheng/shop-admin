import Vue from 'vue';
import App from './App.vue';

//导入组件
import ElementUI from 'element-ui';
// element的样式
import 'element-ui/lib/theme-chalk/index.css';
// element: 2.注册element插件
Vue.use(ElementUI);



Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
