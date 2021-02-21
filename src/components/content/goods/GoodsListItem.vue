<template>
<div class="goods-item">
  <img :src = "showImage" alt="" @load = 'imageLoad' @click = "itemClick">
  <div class="goods-info">
    <p>{{goodsItem.title}}</p>
    <span class="price">{{goodsItem.price}}</span>
    <span class="collect">{{goodsItem.cfav}}</span>
  </div>
</div>
</template>

<script>
export default {
  props: {
    goodsItem:{
      type: Object,
      default() { 
        return {}
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img 
    }
  },
  methods: {
    imageLoad() {
      if(this.$route.path.indexOf('/home')){
        this.$bus.$emit('itemImageLoad')
      }else if (this.$route.path.indexOf('/Detail')){
        this.$bus.$emit('itemImageLoad')
      }
    },
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  },
}
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    height: 100%;
    /* height: 300px; */
    border-radius: 5px;
    border:3px solid var(--color-tint);
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/images/common/collect.svg") 0 0/14px 14px;
  }

</style>