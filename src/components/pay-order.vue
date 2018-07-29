<template>
    <div class="pay-order">
      <houseHead v-if="dev">自付下单</houseHead>
      <div class="relationship">
        <div v-if=" userInfo && userInfo.username" class="name">姓名：{{userInfo.username}}</div>
        <div v-if=" userInfo && userInfo.phone" class="phone">联系电话：{{userInfo.phone}}</div>
        <div v-if=" userInfo && userInfo.channel" class="queue">队伍：{{userInfo.channel}}</div>
        <div v-if="!userInfo" class="addRelationship">
          <div class="tittle" @click="jumpAddInfo" >新增个人页面<span>></span></div>
          <div class="text">请填写您的个人信息以便工作人员更好的为您服务</div>
        </div>
      </div>
      <div class="active">
        <div class="img" v-bind:style="{background:'url('+matchHandler.SmallImgUrl+')'}"></div>
        <div class="tittle">{{matchHandler.MName}}</div>
        <div class="price">
          <div class="onePrice">￥{{matchHandler.Price}}</div>
          <div class="count">X{{orderNum}}</div>
        </div>
      </div>
      <div class="computed">
        <div class="computedCount">
          <div class="reduce" @click="orderNum>1?orderNum--:''">-</div>
          <div class="count">{{orderNum}}</div>
          <div class="plus" @click="orderNum++">+</div>
        </div>
        <div class="totalPrice">
          合计:￥{{orderNum*matchHandler.Price}}
        </div>
      </div>
      <div class="pay">
        <div class="payTittle">在线支付</div>
        <div class="icon"></div>
      </div>
      <div class="btn" @click="jumpToOrder">提交订单</div>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import houseBtn from './common/house-btn.vue';
  import houseHead from './common/house-head.vue';
  import {util} from '../assets/js/util'
  export default {
      template: '.pay-order',
      data: function () {
          return {
            dev:true,
            orderNum:1,
            userInfo:null,
            matchHandler:{}
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
      components: {houseBtn, houseHead },
      methods: {
        init() {
          this.userInfo=this.getUserInfo;
          this.getMatchHandler();
          this.dev=this.getDev;
          if( !this.dev ) window.changeTitle('自付下单');
        },
        jumpToOrder () {
          this.$router.push('/confirmOrder/'+this.orderNum);
        },
        jumpAddInfo () {
          this.$router.push('/addInfo')
        },
        getMatchHandler () {//赛事详情
          let jsoncontent ={
            condition:[
              {
                key:'MId',
                values:'1267615014C24B7AAD75573355975BFE',
                oprate:''
              }
            ]
          } ;
          let data = {
            data:{
              Action:'getlistshow',
              jsoncontent:JSON.stringify(jsoncontent)
            },
            url:this.getBaseUrl + 'CommonHandler/MatchHandler.ashx'
          };
          util.fetchData (data).then(res => {
            if (res.data.result == 0) {
              this.matchHandler = res.data.data[0]|| {};
              console.log(this.matchHandler.MName);
              console.log(this.matchHandler.SmallImgUrl);
              console.log(this.matchHandler.Price);
            }
            else {}
          });
        },
      },
      mounted: function () {
          this.init()
      }
  };
</script>
<style lang="less">
    @import './../assets/less/pay-order.less';
</style>
