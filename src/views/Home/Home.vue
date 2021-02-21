<template>
  <div id="home">
    <nav-bar class="home-nar"><div slot="center">购物街</div></nav-bar>
    <tab-control class = "tab-control1" :titles = "['流行','新款','精选']" 
    @itemclick = 'itemclick'
    v-show="isTabFixed"
    ref = 'tabControl2'
    ></tab-control>

    
    <scroll class = "scroll" ref = "scroll" 
    :probe-type = 3 
    @scroll = 'contentScroll'
    :pull-up-load = 'true'
    @pullingUp = 'loadMore'>
    <home-swiper :banners = 'banners' @swiperImageLoad = 'swiperImageLoad'></home-swiper>
    <recommend-views :recommends = 'recommends'></recommend-views>
    <feature-views></feature-views>
    <tab-control class = "tab-control" :titles = "['流行','新款','精选']" 
    @itemclick = 'itemclick'
    ref = 'tabControl1'></tab-control>
    <goods-list :goods = "goods[currentType].list"></goods-list>
    </scroll>
    <back-top v-show = "isshow" @click.native = 'backclick' class="backtop" ></back-top>

  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import FeatureViews from './childComps/FeatureViews'
import RecommendViews from './childComps/RecommendViews'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'
import Scroll from 'components/common/scroll/Scroll'
// import {Swiper,SwiperItem} from 'components/common/swiper' 单独封装了
import {getHomeMultidata,getHomeGoods } from 'network/home'
import {debounce} from 'common/utils'

export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommendViews,
    FeatureViews,
    TabControl,
    GoodsList,
    BackTop,
    Scroll
    // Swiper,    单独封装了
    // SwiperItem
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods:{
        'pop': { page:0, list:[]},
        'new': { page:0, list:[]},
        'sell':{ page:0, list:[]},
      },
      currentType: 'pop',
      isshow :false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY : 0
    }
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata()

    //2.请求商品数据
    this.getHomeGoods('pop'),
    this.getHomeGoods('new'),
    this.getHomeGoods('sell')

  },
  mounted() {
      //3.监测图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh,50)
    this.$bus.$on ('itemImageLoad', () => {
      // console.log('------')
      //判断this.scroll是否有值，有才能刷新，可能scroll还没加载出来的情况
      // this.scroll && this.$refs.scroll.scroll.refresh()
      refresh()
    })
      
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // console.log(this.saveY)
    this.saveY = this.$refs.scroll.scroll.y
  },
  methods: {
    /*
    *时间监听的相关方法
    */
    itemclick(index) {
      switch(index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
      }
      this.$refs.tabControl1.activeindex = index;
      this.$refs.tabControl2.activeindex = index
        },
      backclick() {
        // console.log(this.$refs.scroll.message)
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contentScroll(position) {
        //1.判断backtop是否显示
        // console.log(position)
        if(-position.y > 800) {
          this.isshow = true
        }else {
          this.isshow = false
        }
         //2.判断tabcontrol是否显示
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        // console.log('上拉加载更多！')
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        //4.获取taboffsetTop的时间监听
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
      // console.log(this.tabOffsetTop)
      },
         //封装了在utils.js里
    // debounce(func,delay){
    //   let timer = null
    //   return function(...args) {
    //     if(timer) clearTimeout (timer)
    //     timer = setTimeout(() => {
    //       func(args)
    //     }, delay);
    //   }
    // },


    /*
    * 网络请求相关的方法 
    */  
    getHomeMultidata() {
      getHomeMultidata().then(res => {
      // console.log(res)
      // this.result = res
      this.banners = res.data.banner.list,
      this.recommends = res.data.recommend.list
    })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        // console.log(res.data.list)
      this.goods[type].list.push(...res.data.list),
      this.goods[type].page += 1
      // 刷新上拉加载更多
      this.$refs.scroll.scroll.finishPullUp()
      // 刷新滚动页面的高度，不然不会向下滚动 老师视频没说
      //老师用的是在上面每一张图片加载完成调用一次刷新
      this.$refs.scroll.scroll.refresh()
  })
    }
  },

}
</script>

<style scoped>
#home{
  /* 使下面的内容不被tabbar挡住 */
  /* position: absolute; */
  /* padding-top: 44px; */
  height: 100vh; 
}
.home-nar {
  background-color: var(--color-tint);
  color: rgb(255, 255, 233);
/* 
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/* .tab-control{ */
  /* position: sticky;失效了，不能滞留了，在better scroll里不起作用 */
  /* top: 43px; */
  /* z-index: 7; */
  /* background-color:beige; */
/* } */
.scroll{
  overflow: hidden;
  /* 还有一种方法，就是开启相对定位，在home中开启绝对定位 */
  /* height: calc(100% - 44px);   */
  position: absolute;
  top: 43px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* background-color: red; */
  z-index: 100;
}
.tab-control1{
  position: relative;
  z-index: 99999;
  background-color: white;
  margin-top: -1px;
}

</style>