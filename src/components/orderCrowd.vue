<template>
    <div class="order-crowd">
      <houseHead>众筹下单</houseHead>
      <div class="relationship">
        <div v-if=" userInfo && userInfo.username" class="name">姓名：{{userInfo.username}}</div>
        <div v-if=" userInfo && userInfo.phone" class="phone">联系电话：{{userInfo.phone}}</div>
        <div v-if=" userInfo && userInfo.channelValue" class="queue">队伍：{{userInfo.channelValue}}</div>
        <div v-if="!userInfo" class="addRelationship">
          <div class="tittle" @click="jumpAddInfo" >新增个人页面<span>></span></div>
          <div class="text">请填写您的个人信息以便工作人员更好的为您服务</div>
        </div>
      </div>
      <div class="itemWrap">
        <div class="home-item">
          <div class="item-image" v-bind:style="{background:'url('+matchHandler.SmallImgUrl+')'}"></div>
          <div class="item-des">
            <div class="tittle">{{matchHandler.MName}}</div>
          </div>
        </div>
        <div class="total">
          <div class="set">
            <div class="text">合计：<span style="color: red;">￥{{matchHandler.Price}}</span></div>
          </div>
        </div>
      </div>
      <div class="pay">
        <div class="payTittle">众筹支付</div>
        <div class="icon"></div>
      </div>
      <div class="btn" @click="saveOrderCrowd">提交订单</div>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import houseBtn from './common/house-btn.vue';
  import houseHead from './common/house-head.vue';
  import {util} from '../assets/js/util'
  export default {
    template: '.order-crowd',
    data: function () {
        return {
          userInfo:null,
          matchHandler:{}
        };
    },
    computed: {
      ...mapGetters([
        'getBaseUrl',
        'getSelectRoute',
        'getUserInfo'
      ])
    },
    components: {houseBtn, houseHead},
    methods: {
      init() {
        this.userInfo=this.getUserInfo;
        this.getMatchHandler();
      },
      jumpAddInfo () {
        this.$router.push('/addInfo')
      },
      jumpToCrowd () {
        this.$router.push('/sharePage/'+this.matchHandler.MId)
      },
      getMatchHandler () {
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
      saveOrderCrowd() {
        let jsoncontent ={
          "field": {
            "Mid": this.matchHandler.Id,
            "Tid": "A55C5A5A1B8F4DAB9EF2EB48ED6FCFD0",
            "username": this.userInfo.username,
            "phone": this.userInfo.phone,
            //"UserId": this.$store.state.openid
            "UserId": "ol7xB1my-BpVVyQGg-Cu5Riptdbc"
          }
        } ;
        let data = {
          data:{
            Action:'adddata',
            jsoncontent:JSON.stringify(jsoncontent)
          },
          url:this.getBaseUrl + 'CommonHandler/CrowdFundOrderHandler.ashx'
        };
        util.fetchData (data).then(res => {
          if (res.data.result == 0) {
            this.jumpToCrowd();
          }
          else {
          }
        });
      }
    },
    mounted: function () {
        this.init()
    }
  };
</script>
<style lang="less">
    @import './../assets/less/orderCrowd.less';
</style>
