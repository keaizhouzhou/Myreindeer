<template>
  <div class="router-introduce">
    <houseHead v-if="dev">路线介绍</houseHead>
    <div class="content">
      <div class="tittle">{{getSelectRoute.RName}}</div>
      <img class="img" :src="getBaseUrl + getSelectRoute.SmallImgUrl" alt="">
      <div class="text">{{getSelectRoute.Introduce}}</div>
    </div>
    <div class="choiceBtn" @click="sign">马上报名</div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import houseBtn from './common/house-btn.vue';
  import houseHead from './common/house-head.vue';
  export default {
      template: '.router-introduce',
      data: function () {
          return {
            dev:true
          };
      },
      computed: {
        ...mapGetters([
          'getBaseUrl',
          'getSelectRoute',
          'getUserInfo',
          'getDev'
        ])
      },
      components: {houseBtn, houseHead},
      methods: {
        init() {
          this.dev=this.getDev;
          if( !this.dev ) window.changeTitle('路线介绍');
        },
        sign(){
          this.$router.push('/activeLists')
        }
      },
      mounted: function () {
          this.init()
      }
  };
</script>
<style lang="less">
    @import './../assets/less/router-introduce.less';
</style>
