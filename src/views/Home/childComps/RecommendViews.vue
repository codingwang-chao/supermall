<template>
<div class="recommend">
  <div v-for = "(item,index) in recommends" :key="index" class="recommenditem">
    <a :href = "item.link" >
    <img :src = "item.image" alt="">
    <div>{{item.title}}</div>
    </a>
  </div>
</div>
</template>

<script>
export default {
  props: {
    recommends: {
       type:Array,
      default(){
        return []
      }
    }
  }

}
</script>

<style>
.recommend{
  display: flex;
  font-size: 12px;
  padding-top: 10px;
  padding-bottom: 20px;
  border-bottom: 8px solid rgb(238, 224, 224);
}
.recommenditem{
  text-align: center;
   flex:1;
}
.recommenditem img {
  height: 60px;
  width: 60px;
  margin-bottom: 8px; 
   margin-top: 5px;
}
</style>