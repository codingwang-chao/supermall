<template>
  <div class="cart-list">
    <scroll class="content" ref= "scroll">
    <cart-list-item v-for="(item,index) in $store.state.cartList" :key="index" 
    :product = 'item'>
    </cart-list-item>
    
    </scroll>
  </div>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem.vue'
export default {
  components: { 
    Scroll, 
    CartListItem 
  },
  activated() {
    console.log('-----')
    this.$refs.scroll.refresh()
  },
  updated() {
    this.$refs.scroll.refresh()
  },
}
</script>

<style scoped>
.cart-list{
  height: calc(100% - 44px - 49px - 40px);
}
.content{
  overflow: hidden;
  height: calc(100%);
  /* height: 100vh; */
}
</style>