<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    document.addEventListener('WeixinJSBridgeReady', function () {
      console.log('支付监听成')
    },false)
  }
}
</script>

<style>
  body{
    margin: 0;
    background-color: #f7f7f7;
  }
</style>
