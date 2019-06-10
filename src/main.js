import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueRouter from 'vue-router';
//导入组件
import Login from "./pages/Login.vue";
import Admin from './pages/Admin.vue';
import GoodsList from './pages/GoodsList.vue';
import CategoryList from './pages/CategoryList.vue';

//导入组件
import ElementUI from 'element-ui';
// element的样式
import 'element-ui/lib/theme-chalk/index.css';
// element: 2.注册element插件
Vue.use(ElementUI);
//注册路由
Vue.use(VueRouter);

//配置路由
const routes = [
  { 
    path: "/login", 
    component: Login
   },
  {
     path: "/", 
     redirect:'/admin/goods-list',
     meta:'首页',
    }, 
  {
    path:'/admin',
    component:Admin,
    meta:'后台管理',
      children:[
        {
          path:'goods-list',
          component:GoodsList,
          meta:"商品列表",
        },
        {
          path:'category-list',
          componet:CategoryList,
          meta:'栏目列表'
        },
      ]},
];
 
  //路由实例对象
  const router=new VueRouter({routes});



Vue.config.productionTip = false;
//绑定到原型
Vue.prototype.$axios=axios;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')//绑定控制区域相当于el  $mount


