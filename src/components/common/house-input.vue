<template>
  <div class="item">
    <div class="title">
      <span v-show="canEmpty == 0" class="must">*</span>
      {{title}}
    </div>
    <textarea v-if="isTextarea" rows="5" v-model="finalValue" v-bind:class="{error:isError}" v-bind:placeholder="placeHolder" v-bind:name="name" v-bind:readOnly="isReadOnly()" @focus="eleOnfocus()"/>
    <input v-else v-model="finalValue" v-bind:class="{error:isError}" v-bind:placeholder="placeHolder" v-bind:name="name" v-bind:readOnly="isReadOnly()" @focus="eleOnfocus()" @keyup="onKeyUp()"/>
    <div class="unit">{{unit}}</div>
  </div>
</template>
<style  lang="less">

</style>
<script>
export default {
  template: '.item',
  data: function () {
    return {
      finalValue: '',
      isError: false
    };
  },
  watch: {
   /* 'finalValue': function (newvalue) {
        this.$emit('controllchange', newvalue);
    },*/
    'initValue':function () {
      this.finalValue = this.initValue;
    }
  },
  props: {
    title: String,
    initValue: String,
    placeHolder: String,
    name: String,
    dataVali: String,
    isRead: Boolean,
    canEmpty: Number,
    isTextarea: {
      type: Boolean,
      default: false
    },
    showStatus: Number,
    unit: String
  },
  methods: {
    init () {
      this.finalValue = this.initValue;
    },
    eleOnfocus () {
      this.isError = false;
    },
    isReadOnly () {
      let tempReadOnly = false;
      if (this.isRead || (this.showStatus == 1)) {
        tempReadOnly = true;
      }
      return tempReadOnly;
    },
    onKeyUp () {
      this.$emit('KeyUp');
    }
  },
  mounted: function () {
    this.init();
  }
};
</script>
