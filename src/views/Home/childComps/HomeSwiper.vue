<template>
    <swiper class="Homeswiper">
    <swiper-item v-for = "(item, index) in banners" :key = "index">
      <a :href = "item.link"> 
        <img :src = "item.image" alt = "" id="img" @load = 'imageLoad'>
      </a>
    </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      isload: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      // console.log('-jj-----')
      //使一张图片加载完成就可以完成高度的确认
      if(!this.isload){
        this.$emit('swiperImageLoad')
        this.isload = true
      }
    }
  },
}
</script>

<style scoped>
#img{
  height: 180px;
}
/* .Homeswiper{
  padding-top: 44px;
} */
</style>