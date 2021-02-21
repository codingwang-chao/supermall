<template>
  <div class="cart">
    <!-- 顶部导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{$store.state.cartList.length}})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list></cart-list>

    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar.vue'
import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'
export default {
  components: { 
    NavBar,
    CartList,
    CartBottomBar 
    },

}
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar{
  background-color: rgb(248, 105, 105);
  color: #fff;
  font-weight: 530;
}
</style>