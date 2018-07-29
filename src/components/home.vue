<template>
  <div class="myhome">
    <houseHead v-if="dev">驯鹿户外</houseHead>
    <div class="home-item" v-for="(item,i) in homeLists">
      <img :src="getBaseUrl + item.SmallImgUrl" alt="" class="item-image">
      <!--<div class="item-image" :style="{'background-image':'url('+(item.SmallImgUrl?getBaseUrl + item.SmallImgUrl:'')+')','background-size':'cover'}"></div>-->
      <div class="item-des">
        <div class="tittle">{{item.RName}}</div>
        <div class="text">共{{item.MatchCount}}场赛事，已有{{item.OrderCount}}人报名</div>
        <div class="btns">
          <div class="introduce" @click="introduce(item)">路线介绍</div>
          <div class="choice" @click="signUp(item)">我要报名</div>
        </div>
      </div>
    </div>
    <houseToast ref="toast"></houseToast>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import houseBtn from './common/house-btn.vue';
import houseHead from './common/house-head.vue';
import houseToast from './common/house-toast.vue';
import {util} from '../assets/js/util'
export default{
  template: '.myhome',
  data: function () {
    return {
      dev:true,
      errorMessage: '',
      isHide: true,
      titleShow: true,
      dywFinish: false,
      glrFinish: false,
      jkxqFinish: false,
      disabled: true,
      batchApplyId: '',
      homeLists:[]
    };
  },
  computed: {
    ...mapGetters([
      'getBaseUrl',
      'getDev'
    ])
  },
  components: {
    houseHead,
    houseBtn,
    houseToast
  },
  methods: {
    getHomeList () { // 获取首页列表
      let data = {
        data:{},
        url:this.getBaseUrl + 'CommonHandler/RouteHandler.ashx?Action=routeshow'
      };
      util.fetchData (data).then(res => {
        if (res.data.result == 0) {
          console.log('data',res.data);
          this.homeLists = res.data.data;
        }
        else {

        }
      });
    },
    ...mapActions([
      'changeRoute',
      'changeOpenId'
    ]),
    getOpenId () { // 获取openid
      let data = {
        data:{
          Action:'getuserinfobycode',
          code:util.getQueryString('code') || ''
        },
        url:this.getBaseUrl + 'CommonHandler/APIHandler.ashx'
      };
      util.fetchData (data).then(res => {
      if (res.data.result == 0) {
        console.log('openid',res.data);
        this.changeOpenId(res.data.data.openid);
        this.$refs.toast.toastShow('额度预估成功，页面即将跳转!')
      }
      else {

      }
      });
    },
    init () {
      this.getHomeList();
      this.getOpenId();
      this.dev=this.getDev;
      if( !this.dev ) window.changeTitle('驯鹿户外');
    },
    introduce(item) {
      this.changeRoute(item);
      this.$router.push('/routerIntroduce');
    },
    signUp(item){
      this.changeRoute(item);
      this.$router.push('/routerIntroduce');
    }
  },
  created () {

  },
  mounted () {
    this.init()
  }
};
</script>
<style lang="less">
  @import './../assets/less/myhome.less';
</style>
