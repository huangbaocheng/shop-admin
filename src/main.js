import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueRouter from 'vue-router';
//导入vuex的store 可以省略store/index.js
import store from './store';
//导入组件
import Login from "./pages/Login.vue";
import Admin from './pages/Admin.vue';
import GoodsList from './pages/GoodsList.vue';
import CategoryList from './pages/CategoryList.vue';
import GoodsAdd from './pages/GoodsAdd.vue';
import GoodsEdit from './pages/GoodsEdit.vue'

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
          component:CategoryList,
          meta:'栏目列表'
        },
        {
          path:'goods-add',
          component:GoodsAdd,
          meta:'添加商品'
        },
        {
          path:'goods-edit/:id',
          component:GoodsEdit,
          meta:'编辑商品'
        }
      ]},
];
 
  //路由实例对象
  const router=new VueRouter({routes});

  // 路由守卫
// to: 去哪个页面
// from:页面的来源
// next：是函数可以接受参数，接收参数是`url`，并且可以跳转到该`url`，如果不传参数会跳转`to`的页面
// next()方法是必须要调用的
router.beforeEach((to, from, next) => {
  // console.log(to, from);
  //判断是否登陆
  axios({
    url: "http://localhost:8899/admin/account/islogin",
    method: "GET",
    //处理session的跨域
    withCredentials: true,
  }).then(res =>{
    const {code} =res.data;
    //访问的页面是登陆页
    if(to.path==='/login'){
      if(code=='logined'){
        next('/admin/goods-list')
      }else{
        //未登录
        next();
      }
    }else{//访问非登陆页
      if(code==='logined'){
        next()
      }else{//未登录
        next('/login')

      }
    }
  })
 
});



Vue.config.productionTip = false;
//绑定到原型
Vue.prototype.$axios=axios;

new Vue({
  render: h => h(App),
  //挂载路由
  router,
  //仓库对象
  store,
}).$mount('#app')//绑定控制区域相当于el  $mount


