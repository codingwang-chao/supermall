<template>
  <div class="check-button" :class="{check:ischeck}">
    <img src="~assets/images/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  data() {
    return {
      ischeck: true
    }
  },
}
</script>

<style scoped>
.check-button{
  border-radius: 50%;
  border: 2px solid #aaa;
}
img{
  width: 15px;
  height: 15px;
}
.check{
  border-color: red;
  background-color: red;
}
</style>