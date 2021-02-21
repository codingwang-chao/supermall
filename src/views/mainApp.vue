<template>
<tab-bar>
  <tab-bar-item path = "/home" activeColor = 'pink'>
  <img slot="item-icon" src="../assets/img/home.jpg" alt="">
  <img slot="item-active-icon" src="../assets/img/01.jpg" alt="">
  <div slot="item-text">首页</div>
</tab-bar-item>
<tab-bar-item path = "/category" activeColor = 'pink'> 
<img slot="item-icon" src="../assets/img/category.jpg" alt="">
<img slot="item-active-icon" src="../assets/img/02.jpg" alt="">
       <div slot="item-text">分类</div>
</tab-bar-item>
<tab-bar-item path = "/cart" activeColor = 'pink'>
   <img slot="item-icon" src="../assets/img/shopcart.jpg" alt="">
    <img slot="item-active-icon" src="../assets/img/03.jpg" alt="">
        <div slot="item-text">购物车</div>
</tab-bar-item>
<tab-bar-item path = "/profile" activeColor = 'pink'>
   <img slot="item-icon" src="../assets/img/profile.jpg" alt="">
  <img slot="item-active-icon" src="../assets/img/04.jpg" alt="">
        <div slot="item-text">我的</div>
</tab-bar-item>
 </tab-bar>
</template>

<script>
import TabBar from '../components/tabbar/TabBar'
import TabBarItem from '../components/tabbar/TabBarItem'
export default {
   components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>