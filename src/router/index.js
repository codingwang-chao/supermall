import Vue from 'vue'
import Router from 'vue-router'
//下面都是路由懒加载的写法！正常的是，直接导入即可
const Home = ()=> import('views/Home/Home')
const Cart = ()=> import('views/Cart/Cart')
const Profile = ()=> import('views/Profile/Profile')
const Category = ()=> import('views/Category/Category')
const Detail = ()=> import('views/detail/Detail')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'',
      redirect:'/Home',
    },
    {
      path:'/Home',
      component:Home
    },
    {
      path:'/Cart',
      component:Cart
    },
    {
      path:'/Profile',
      component:Profile
    },
    {
      path:'/Category',
      component:Category
    },
    {
      path:'/Detail/:iid',
      component:Detail
    }
  ],
  mode:'history',
})
