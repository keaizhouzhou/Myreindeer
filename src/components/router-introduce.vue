<template>
  <div class="router-introduce">
    <!--<houseHead>路线介绍</houseHead>-->
    <div class="content">
      <div class="tittle">{{getSelectRoute.RName}}</div>
      <img class="img" :src="getBaseUrl + getSelectRoute.SmallImgUrl" alt="">
      <div class="text" v-html="getSelectRoute.Introduce"></div>
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

          };
      },
      computed: {
        ...mapGetters([
          'getBaseUrl',
          'getSelectRoute'
        ])
      },
      components: {houseBtn, houseHead},
      methods: {
        init() {
          window.changeTitle('路线介绍');
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
