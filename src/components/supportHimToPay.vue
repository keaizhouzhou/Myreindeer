<template>
    <div class="support_pay">
      <!--<houseHead>给他支持付款页</houseHead>-->
      <div class="support_info">
        <p>支持他：</p>
        <img src="../assets/images/img.jpg" alt="" class="user_img">
        <div class="user_name">昵称昵称</div>
        <div class="user_desc">
          <input v-if="isEditDesc" type="text" value="" v-model="userDesc" v-on:blur="isEditDesc=!isEditDesc;">
          <div v-if="!isEditDesc">{{userDesc}}</div>
          <i v-if="!isEditDesc" @click="isEditDesc=!isEditDesc;"></i>
        </div>
      </div>
      <div class="pay_info">
        <div class="pay_user">
          付款人：<span>芳芳</span><i></i>
        </div>
        <div class="pay_price">
          付款金额：<input type="text" class="price" v-model="defaultPrice">
        </div>
        <ul class="price_list">
          <li @click="defaultPrice=item.Price;userDesc=item.Msg" :class="{checked:item.Price==defaultPrice}" v-for="item in priceList">￥{{item.Price}}</li>
        </ul>
      </div>
      <div class="confirm_btn" @click="saveOrder">确认付款</div>
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
          defaultPrice:1
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
      init() {
        this.getPayMsg();
        window.changeTitle('给他支持付款页');
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

          }
          else {}
        });
      },
      getPayMsg () { // 获取付款信息
        let jsoncontent ={
          condition:[
            {
              key:'MId',
              values:'1A45AB980B69476693F24B5A22F334D8',
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
