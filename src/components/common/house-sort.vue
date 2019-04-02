<template>
  <div class="house-sort" :class="{fixed:isTop}">
    <div class="tab-group">
      <div v-for="(tab, index) in tabList" v-bind:class="{item:!isCount,chose:tabChose==index,itemCount:isCount}" @click="onTabClick(tab, index)" v-bind:key="index">
        {{tab.value}}
        <div v-if="isCount" class="num">{{tab.num}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  template: '.house-sort',
  name: 'sort',
  props:{
    tabList:Array,
    isCount:Boolean,
    isTop:Boolean
  },
  data: function () {
    return {
      tabChose: 0
    };
  },
  methods: {
    onTabClick: function (tab, index) {
      this.tabChose = index;
      // console.log(tab)
      this.$emit('tabClick', tab);
    }
  }
};
</script>
<style lang="less" scoped>
  @import './../../assets/less/house-sort.less';
</style>
