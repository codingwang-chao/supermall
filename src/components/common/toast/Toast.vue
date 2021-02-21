<template>
  <div class="toast" v-show= "show">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      defualt: ''
    },
    show: {
      type: Boolean,
      default:true
    }
  }
}
</script>

<style>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: white;
  padding: 8px 10px;
  background-color:rgba(0, 0, 0, .5);
}
</style>