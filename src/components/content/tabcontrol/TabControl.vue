<template>
  <div class="tab-control">

    <div v-for="(item, index) in titles" :key="index" 
    class = "control-item"
    :class="{active: index === activeindex}"
    @click="itemclick(index)">
      <span class="item">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      activeindex: 0
    }
  },
  methods: {
    itemclick(index) {
      this.activeindex = index
      this.$emit('itemclick',index)
    }
  },
}
</script>

<style scoped>
.tab-control{
  position: relative;
  display: flex;
  line-height: 44px;
  text-align: center;
}
.control-item{
  flex: 1;
  font-size: 16px;
  line-height: 44px;
}
/* .active{
  color: pink;
  border-bottom: 3px solid pink;
} */
.active .item{
  color: pink;
  padding-bottom: 5px;
  border-bottom: 3px solid pink;
}
</style>