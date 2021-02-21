<template>
  <div class='tab-bar-item' @click="itemClick">
    <div v-if="!isactive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-active-icon"></slot></div>
   <div :style="activeStyle"><slot name="item-text"></slot></div> 
    <!-- <img src="../../assets/img/home.jpg" alt="">
    <div>首页</div>  -->
      </div>
</template>

<script>

export default {
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
data() {
  return {
    // isactive:ture
  }
},
    computed: {
      isactive(){
        return this.$route.path==this.path
      },
      activeStyle(){
        return this.isactive ? {color:this.activeColor,fontSize:18+'px'} :{}
      }
    },
methods: {
  itemClick(){
    this.$router.push(this.path)
  }
},
}
</script>

<style>
 .tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
 }
img{
width: 24px;
height: 24px;
}
.active{
  color: activeColor;
}
</style>
    //    <div id="tab-bar">
    //   <div class='tab-bar-item'>
    //     <img src="./assets/img/home.jpg" alt="">
    //     <div>首页</div> 
    //     </div>
    //   <div class='tab-bar-item'>
    //     <img src="./assets/img/home.jpg" alt="">
    //    <div>分类</div> 
    //     </div>
    //   <div class='tab-bar-item'>
    //     <img src="./assets/img/home.jpg" alt="">
    //     <div>购物车</div> 
    //     </div>
    //   <div class='tab-bar-item'>
    //     <img src="./assets/img/home.jpg" alt="">
    //     <div>我的</div> 
    //     </div>
    // </div>