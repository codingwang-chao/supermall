<template>
  <div class="detail">
    <detail-nav-bar @titleClick = 'titleClick' ref= "nav"></detail-nav-bar>
    
    <scroll class="content" ref="scroll" :probeType = "3" @scroll="scroll">
    <detail-swiper :top-images = 'topImages'></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-images-info :images-info ='detailInfo'></detail-images-info>
    <detail-param-info :param-info = "paramInfo" ref = "params"></detail-param-info>
    <detail-comment-info ref = "comment"></detail-comment-info>
    <goods-list :goods = "recommends" ref = "recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addcart = 'addtocart'></detail-bottom-bar>
    <back-top v-show = "isshow" @click.native= "backClick"></back-top>
    <toast :message="message" :show= "show"></toast>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'

import {getDetail,Goods,Shop,GoodsParams,getRecommend} from 'network/detail'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import Scroll from '../../components/common/scroll/Scroll.vue'
import DetailImagesInfo from './childComps/DetailImagesInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import GoodsList from '../../components/content/goods/GoodsList.vue'
import {debounce} from 'common/utils'
import DetailBottomBar from './childComps/DetailBottomBar'
import BackTop from '../../components/content/backTop/BackTop.vue'
import Toast from '../../components/common/toast/Toast.vue'

export default {
  name: "Detail",
  components: { 
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailImagesInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    Toast
  },
  data() {
    return{
      iid :null,
      topImages : [],
      goods: {},
      shop:{},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      detailIndex: 0,
      isshow: false,
      show: false,
      message: ''
    }    
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid
    
    //2.根据iid请求详细的数据
    getDetail(this.iid).then(res => {
      console.log(res)
      const data = res.result
       //1。获取顶部的轮播图片
      this.topImages = data.itemInfo.topImages
       //2.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
       //3.创建店铺信息
      this.shop = new Shop(data.shopInfo)
       //4.获得商品详细信息
      this.detailInfo =  data.detailInfo 
       //5.获取详细信息
      this.paramInfo = new GoodsParams(data.itemParams.info,data.itemParams.rule)
       //6.取出评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
      this.$nextTick(() => {
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop),
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop),
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs)
      })     
    })
    //3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res)
      this.recommends = res.data.list
    })
  },
  mounted() {
    //监测图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh,50)
    this.$bus.$on ('itemImageLoad', () => {
      // console.log('------')
      //判断this.scroll是否有值，有才能刷新，可能scroll还没加载出来的情况
      // this.scroll && this.$refs.scroll.scroll.refresh()
      refresh()
    })
  },
  // updated() {       //也可以获取到对应组件的位置，但是会有多个值
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop),
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop),
    // this.themeTopYs.push(this.$refs.recommends.$el.offsetTop),
    // this.themeTopYs.push(Number.MAX_VALUE)
    // console.log(this.themeTopYs)
  // },
  methods: {
    titleClick(index) {
      // console.log(index)
      //点击narbar去到对应的位置
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
    },
    scroll(position) {
      let positionY = -position.y
      // if(positionY > this.themeTopYs[0]&& positionY < this.themeTopYs[1]){
      //   this.$refs.nav.currentIndex = 0
      // }else if(positionY > this.themeTopYs[1]&& positionY < this.themeTopYs[2]) {
      //   this.$refs.nav.currentIndex = 1
      // }else if(positionY > this.themeTopYs[2]&& positionY < this.themeTopYs[3]) {
      //   this.$refs.nav.currentIndex = 2
      // }else if (positionY > this.themeTopYs[3]&& positionY < this.themeTopYs[4]){
      //   this.$refs.nav.currentIndex = 3
      //   }
        //使回顶部的图标消失出现
        //简便方法
        this.isshow = -position.y > 800
        // if(-position.y > 700) {
        //   this.isshow = true
        // }else(-position.y > 700) {
        //   this.isshow = false
        // }

        for( let i = 0; i < this.themeTopYs.length-1; i++) {
        if(this.detailIndex !== i && 
        positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]){
          this.detailIndex = i;
          // console.log(this.detailIndex)
          this.$refs.nav.currentIndex = this.detailIndex
          this.$refs.nav.index = this.detailIndex
        }
      }
    },
    backClick() {
      // console.log('你点到我了！')
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    addtocart() {
      // console.log('0000')
      //1.获取购物车需要的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.nowPrice = this.goods.lowNowPrice;
      product.iid = this.iid;
      product.count = 1
      //2.将商品加入到购物车中
      // 直接加入到store中不好，要通过mutations的commit
      // this.$store.cartList.push(product)
      this.$store.commit('addCart',product).then( res => {
        console.log(res)
      })
    //     console.log(this.$store.cartList)
    //   this.$store.addCart(product).then( res => {
    //     console.log(res)
    //     this.show = true,
    //     this.message = res
    //     setTimeout(() => {
    //       this.show = false,
    //       this.message = ''
    //     },1500)
    //   })
    }
  },
}
</script>

<style scoped>
.detail{
  position: relative;
  z-index: 999;
  background-color: white;
  height: 100vh;
}
.content{
  overflow: hidden;
  height: calc(100% - 44px - 49px);
  z-index: 999;
}
/* #detail{
  position: relative;
  z-index: 999999;
  background-color: red;
  height: 100%;
  width: 100%;
}
.content {
  height: cacl(100% - 44px);
  position: absolute;
  top:44px;
  bottom: 50px;
  right: 0;
  left: 0;
  overflow: hidden;
  background-color: white;
  z-index: 999;
} */
</style>