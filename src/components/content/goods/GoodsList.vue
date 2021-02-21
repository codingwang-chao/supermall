<template>
  <div class="goods">
    <goods-list-item v-for = "(item,index) in goods" :key="index" 
    :goods-item = "item"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'
export default {
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsListItem
  }
}
</script>

<style>
.goods {
  display: flex;
  /* 包裹一行能容纳几个图片根据宽度来自动调整，不设置就所有图片都挤到一行
  然后设置里面图片的宽度，可以用百分比设置，这样就可以设置一行有几张图片了 */
  flex-wrap: wrap; 
  /* 使图片左右留白宽度一致，左边加右边的宽度等于中间的宽度 */
  justify-content: space-around; 
}
</style>