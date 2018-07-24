<template lang="html">
  <div class="house-dialogs" v-show="isShow">
    <div class="modal-body">
      <div class="modal-content">
        <div class="modal-tips" v-show="haveCancel" @click="handleCancel"></div>
        <div class="modal-text" v-html="content"></div>
        <slot name="content"></slot>
      </div>
      <div class="modal-footer" @touchmove.prevent>
        <div v-show="offBtn" class="off-btn" @click="handleCancel">{{ offBtn }}</div>
        <div v-show="onBtn" class="on-btn" @click="handleOk">{{ onBtn }}</div>
        <slot name="footer"></slot>
      </div>
    </div>
    <div class="master" @touchmove.prevent></div>
  </div>
</template>
<script>
export default {
  template: '.house-dialogs',
  props: {
    haveCancel: {
      type: Boolean,
      default: false
    },
    content: String,
    offBtn: String,
    onBtn: String,
    isModel: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      isShow: false,
      resolve: '',
      reject: '',
      promise: ''
    };
  },
  watch: {
    'content': function (newvalue) {
      this.content = newvalue;
    }
  },
  methods: {
    handleCancel () {
      if (this.isModel) {
        this.reject();
      }
      this.isShow = false;
      this.$emit('cancel');
    },
    handleOk () {
      if (this.isModel) {
        this.resolve();
      }
      this.isShow = false;
      this.$emit('ok');
    },
    confirm () {
      this.isShow = true;
      if (this.isModel) {
        let _this = this;
        this.promise = new Promise(function (resolve, reject) {
          _this.resolve = resolve;
          _this.reject = reject;
        });
        return this.promise;
      }
    }
  }
};
</script>
<!--
    haveCancel 是否显示取消图标
    content    弹窗内容，也可以是自定义html
    offBtn     取消按钮文本，没有则不显示
    onBtn      确定按钮文本，没有则不显示

    自定义事件：
    cancel     取消
    ok         保存
-->
<style lang="less" scope>
  @import './../../assets/less/house-dialogs.less';
</style>
