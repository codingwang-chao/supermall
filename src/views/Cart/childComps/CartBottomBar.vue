<template>
  <div class="bottom-bat">
    <div class="content">
    <check-button class="button"></check-button>
    <span id="span">全选</span>
    </div>
    <div class="total">
      合计:{{totalPrice}}
    </div>
    <div class="cacl">
      去计算:{{$store.state.cartList.length}}
    </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton.vue'
export default {
  components: { 
    CheckButton 
  },
  computed: {
    //计算商品价格
    totalPrice() {
        // console.log('jjjj')
        const cartList = this.$store.state.cartList;
        return cartList.filter(item => {
          return true
        }).reduce((preValue, item) => {
          return preValue + item.count * item.nowPrice
        }, 0).toFixed(2)
      },
  },
}
</script>

<style scoped>
.bottom-bat{
  display: flex;
  height: 40px;
  background-color:rgb(235, 201, 207);
  position: relative;
  bottom: 0px;
  z-index: 100;
  font-weight: 700;
  /* justify-content: center; 
  align-items: center;  */
}
.content{
  width: 100px;
  padding-top: 10px;
  padding-left: 15px;
  display: flex;
}
.button{
  flex: 1;
  width: 17px;
  height: 17px;
  display: inline-block;
}
#span{
  flex: 4.5;
  margin-left: 8px;
  display: inline-block;
}
.total{
  display: inline;
  width: 130px;
  padding-top: 11px;
}
.cacl{
  padding-top: 11px;
  padding-right: 2px;  
}
</style>