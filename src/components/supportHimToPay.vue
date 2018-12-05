<template>
    <div class="support_pay">
      <!--<houseHead>给他支持付款页</houseHead>-->
      <div class="support_info">
        <p>支持他：</p>
        <img :src="headimgurl" alt="" class="user_img">
        <!--<div class="user_name">昵称昵称</div>-->
        <div class="user_desc">
          <input v-if="isEditDesc" type="text" value="" v-model="userDesc" v-on:blur="isEditDesc=!isEditDesc;">
          <div v-if="!isEditDesc">{{userDesc}}</div>
          <i v-if="!isEditDesc" @click="isEditDesc=!isEditDesc;"></i>
        </div>
      </div>
      <div class="pay_info">
        <div class="pay_user">
          付款人：<span>{{userInfo.nickname}}</span><i></i>
        </div>
        <div class="pay_price">
          付款金额：<input type="text" class="price" v-model="defaultPrice">
        </div>
        <ul class="price_list">
          <li @click="defaultPrice=item.Price;userDesc=item.Msg" :class="{checked:item.Price==defaultPrice}" v-for="item in priceList">￥{{item.Price}}</li>
        </ul>
      </div>
      <div class="confirm_btn" @click="goPay">确认付款</div>
    </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex';
  import houseHead from './common/house-head.vue';
  import houseSort from './common/house-sort.vue';
  import {util} from '../assets/js/util';
  export default {
    template: '.support_pay',
    data: function () {
        return {
          userDesc:"人生就是走好每一步，等你圆满归来。",
          isEditDesc:false,
          priceList:[],
          defaultPrice:1,
          headimgurl:'',
          userInfo:{}
        };
    },
    computed: {
      ...mapGetters([
        'getBaseUrl',
        'getSelectRoute',
        'getUserInfo',
        'getOpenId'
      ])
    },
    components: {houseHead, houseSort},
    methods: {
      ...mapActions([
        'changeRoute',
        'changeOpenId',
        'changeUserInfo'
      ]),
      useInfo () { // 通过接口获取用户信息
        let jsoncontent ={
          condition:[
            {
              key:'openid',
              values:this.getOpenId || '',
              oprate:''
            }
          ]
        } ;
        let data = {
          data:{
            Action:'getmodel',
            jsoncontent:JSON.stringify(jsoncontent)
          },
          url:this.getBaseUrl + 'CommonHandler/UserInfoHandler.ashx'
        };
        util.fetchData (data).then(res => {
          if (res.data.result == 0) {
            this.userInfo = res.data.data;
            this.changeUserInfo(res.data.data)
          }
          else {}
        });
      },
      goPay() {
        let totalPrice = this.defaultPrice;
        let vm = this;
        let data = {
          data: {
            total_fee: totalPrice * 100,
            openid: this.getOpenId
          },
          url: '../../CommonHandler/APIHandler.ashx?Action=getjsapiparameters'
        };
        util.fetchData(data).then(res => {
          if (res.data.result == 0) {
            //公众号支付
            WeixinJSBridge.invoke(
              'getBrandWCPayRequest',
              JSON.parse(res.data.data),
              function (response) {
                if (response.err_msg == "get_brand_wcpay_request:ok") { // 支付成功
                  // 如果告诉后台 那个众筹 支持了多少
                  // vm.resiveState(OId)
                  vm.saveOrder();
                }
                else if (response.err_msg == "get_brand_wcpay_request:cancel") {
                  alert("您放弃了支付");
                } else {
                  alert("支付失败,请稍后重试！如果收到支付通知，切勿重复支付！");
                }
              });
          }
          else {
          }
        });
      },
      init() {
        this.useInfo();
        this.getPayMsg();
        this.headimgurl = decodeURIComponent(this.$route.params.headimgurl);
        // window.changeTitle('给他支持付款页');
      },
      saveOrder () {
        let jsoncontent ={
          "field": {
            "CId": this.$route.params.CId,
            "UserId": this.getOpenId || '',
            "Price": this.defaultPrice || '',
            "Msg": this.userDesc || ''
          }
        } ;
        let data = {
          data:{
            Action:'adddata',
            jsoncontent:JSON.stringify(jsoncontent)
          },
          url:this.getBaseUrl + 'CommonHandler/CrowdFundOrderSupportHandler.ashx'
        };
        util.fetchData (data).then(res => {
          if (res.data.result == 0) {
            console.log("支付成功，录入数据",jsoncontent)
            this.$router.go(-1);
          }
          else {}
        });
      },
      getPayMsg () { // 获取付款信息
        let jsoncontent ={
          condition:[
            {
              key:'MId',
              values:this.$route.params.MId,
              oprate:''
            }
          ]
        } ;
        let data = {
          data:{
            Action:'getlist',
            jsoncontent:JSON.stringify(jsoncontent)
          },
          url:this.getBaseUrl + 'CommonHandler/MatchCrowdFundRecomPriceHandler.ashx'
        };
        util.fetchData (data).then(res => {
          if (res.data.result == 0) {
            this.priceList = res.data.data;
            let obj = res.data.data.find((item)=>{
              return item.Def == 1;
            });
            this.defaultPrice = obj.Price;
            this.userDesc = obj.Msg;
          }
          else {}
        });
      },
      tabClick (tab) {
        this.selectedTab = tab;
        this.showIndex = tab.index;
      },
      jumpSupportHim () {
        //this.$router.push('/payOrder');
      },
      jumpToCrowd () {
        this.$router.push('/orderCrowd');
      }
    },
    mounted: function () {
        this.init()
    }
  };
</script>
<style lang="less">
    @import './../assets/less/supportHimToPay.less';
</style>
