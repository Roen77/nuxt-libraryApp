<template>
  <div class="home_inner">
    <div class="bg"></div>
  </div>
</template>

<script>
export default {
  layout: 'home'
}
</script>

<style>
.home_inner{
  padding:100px 30px 30px 30px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.bg{
  position: relative;
  background-image: url(/images/home_bg.jpg);
  background-position: center;
  background-size: contain;
  width: 100%;
  height: 100%;
}
</style>
