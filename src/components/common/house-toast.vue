<template>
  <div class="toast-wrap" v-show="isShow">
    <div class="toast"  v-bind:class="{'toast-show-am':isShow,'toast-close-am':isClose, hide:isHide}">{{title}}</div>
  </div>
</template>
<script>
export default {
  template: '.toast-wrap',
  name: 'toast',
  data: function () {
    return {
      title: '',
      isShow: false,
      isClose: true,
      isHide: true
    }
  },
  methods: {
    toastShow (text) {
      this.isHide = false;
      this.isClose = false;
      this.isShow = true;
      this.title = text;
      let _this = this;
      setTimeout(function () {
        _this.toastHide();
      }, 2500);
    },
    toastHide () {
      this.isClose = true;
      let _this = this;
      setTimeout(function () {
        _this.isShow = false;
        _this.isHide = true;
        _this.title = '';
      }, 300);
    }
  }
};
</script>
<style lang="less" scoped>
  @import './../../assets/less/house-toast.less';
</style>
<!--
    使用方法：
    <toast ref="toast"></toast>
    this.$refs.toast.toastShow('额度预估成功，页面即将跳转!')
    2.5秒后自动消失
-->
