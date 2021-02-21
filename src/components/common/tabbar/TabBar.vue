<template>
    <div id="app">
      <div id="tab-bar">
    <slot></slot>
  </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
body{
  padding: 0;
  margin: 0;
}
#tab-bar{
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0px,-3px,1px,rgba(100,100,100,1);
  z-index: 9;
}

</style>