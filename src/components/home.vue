<template>
  <div class="myhome">
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
    <div class="kong">

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
import wx from 'weixin-js-sdk'
export default{
  template: '.myhome',
  data: function () {
    return {
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
      'getBaseUrl'
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
      'changeOpenId',
      'changeUserInfo'
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
        this.changeOpenId(res.data.data.openid); // 存储openid
        this.changeUserInfo(res.data.data); // 存储useinfo
      }
      else {
      }
      });
    },
    init () {
     // this.judge();
      if (util.getQueryString('TId')) { // 其他页面来的分享 跳转到sharePage
        let headimgurl = encodeURIComponent(encodeURIComponent(util.getQueryString('headimgurl')));
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx39d442db1bead075&redirect_uri=http%3A%2F%2Fwww.xunluzhe.com.cn%2F%23%2FsharePage%2F${util.getQueryString('MId')}%2F${util.getQueryString('CId')}%2F${util.getQueryString('TId')}%2Ftrue%2F${headimgurl}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
      }
      else if (util.getQueryString('type') === 'detail') { // 详情页的分享
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx39d442db1bead075&redirect_uri=http%3A%2F%2Fwww.xunluzhe.com.cn%2F%23%2FactiveDetail%2F${util.getQueryString('MId')}%2Ftrue&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
      }
      else {
        this.getHomeList();
        this.getOpenId();
       // this.getJsdk();
      }

      window.changeTitle('驯鹿探索');
    },
    introduce(item) {
      this.changeRoute(item);
      this.$router.push('/routerIntroduce');
    },
    signUp(item){
      this.changeRoute(item);
      this.$router.push('/activeLists');
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
