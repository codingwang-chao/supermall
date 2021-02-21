<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
    <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      scroll: null,
      // message:'jjjjjjjjxxxxxx',
    }
  },
  props: {
    probeType:{
      type: Number,
      default: 0     
    },
    pullUpLoad: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
        // 1.创建bscroll的对象
	this.scroll = new BScroll(this.$refs.wrapper, {
    click: true,
    probeType: this.probeType,
    pullUpLoad: this.pullUpLoad
  }),
       //2.监听滚动的位置
       this.scroll.on('scroll',(position) => {
        //  console.log(position)
         this.$emit('scroll',position)
       }),
       //3.监听上拉刷新事件
       this.scroll.on('pullingUp',() => {
        //  console.log('上拉加载更多！')
        this.$emit('pullingUp')
       })
    },
methods:{
  scrollTo(x, y, time = 300) {
    this.scroll.scrollTo(x, y, time)
},
  refresh() {
    //封装刷新函数，使调用方便
    // console.log('----sdfsagsdf--')
      this.scroll && this.scroll.refresh()
  }
 }
}
</script>

<style>

</style>