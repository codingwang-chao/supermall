<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
      <i class="icon server"></i>
      <span class="text">客服</span>
      </div>
      <div>
      <i class="icon shop"></i>
      <span class="shop">店铺</span>
      </div>
      <div>
      <i class="icon select"></i>
      <span class="select">收藏</span>
      </div>
      </div>

      <div class="bar-item bar-right">
      <div class="cart" @click = "addtocart">加购物车</div>
      <div class="buy">购买</div>
      </div>

  </div>
</template>

<script>
export default {
  methods: {
    addtocart() {
      this.$emit('addcart')
    }
  },

}
</script>

<style scoped>
.bottom-bar{
  height: 49px;
  background-color:#fff;

  position: relative;
  bottom: 0px;
  z-index: 10;
  display: flex;
  text-align: center;
  /* 第二种写法两种都可以 */
  /* position: fixed;
  bottom:0px;
  left: 0;
  right: 0; */
}
  .bar-item {
    flex: 1;
    display: flex;
  }
  .bar-item>div {
    flex: 1;
  }
  .bar-left .text {
    font-size: 13px;
  }
  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 2px;
    background: url("~assets/images/detail/detail_bottom.png") 0 0/100%;
  }
  .bar-left .service {
    background-position:0 -54px;
  }
  .bar-left .shop {
    background-position:0 -98px;
  }
  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: 49px;
    text-align: center;
  }
  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }
  .bar-right .buy {
    background-color: #f69;
  }
</style>>
