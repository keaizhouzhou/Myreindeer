<template>
  <div class="pay-order">
    <!--<houseHead>确认订单</houseHead>-->
    <div class="relationship confirmRelation">
      <div v-if=" userInfo && userInfo.username" class="name">姓名：{{userInfo.username}}</div>
      <div v-if=" userInfo && userInfo.phone" class="phone">联系电话：{{userInfo.phone}}</div>
      <div v-if=" team.teamName" class="queue">队伍：{{team.teamName}}</div>
      <div v-if="!userInfo" class="addRelationship">
        <div class="tittle" @click="jumpAddInfo">新增个人页面<span>></span></div>
        <div class="text">请填写您的个人信息以便工作人员更好的为您服务</div>
      </div>
    </div>
    <div class="active">
      <div class="img" v-if="matchHandler.SmallImgUrl"
           :style="{background:'url('+getBaseUrl+matchHandler.SmallImgUrl+')',backgroundSize:'cover'}"></div>
      <div class="tittle">{{matchHandler.MName}}</div>
      <div class="price">
        <div class="onePrice">￥{{matchHandler.Price}}</div>
        <div class="count">X{{orderNum}}</div>
      </div>
    </div>
    <div class="computed">
      <div class="totalPrice">
        合计:￥{{orderNum * matchHandler.Price}}
      </div>
    </div>
    <div class="pay">
      <div class="payTittle">在线支付</div>
      <div class="icon"></div>
    </div>
    <div class="btn" @click="saveOrder">确认提交</div>
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
        orderNum: 1,
        team: {},
        userInfo: null,
        matchHandler: {}
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
    components: {houseBtn, houseHead},
    methods: {
      wxPay(){
        let data = {
          data: {
            openid:this.getOpenId,
            total_fee:this.matchHandler.Price * this.orderNum
          },
          url: this.getBaseUrl + 'AdminManage/PayOrder.aspx'
        };
        util.fetchData(data).then(res => {
         console.log('提交支付',res.data)
        });
      },
      init() {
        this.orderNum = this.$router.history.current.params.num;
        this.team.teamId = this.$router.history.current.params.teamId;
        this.team.teamName = this.$router.history.current.params.teamName;
        this.userInfo = this.getUserInfo;
        this.getMatchHandler();
        window.changeTitle('确认订单');
      },
      jumpToOrder() {
        this.$router.push('/main/myOrder')
      },
      jumpAddInfo() {
        this.$router.push('/addInfo')
      },
      getMatchHandler() {
        let jsoncontent = {
          condition: [
            {
              key: 'MId',
              values: this.$router.history.current.params.Mid,
              oprate: ''
            }
          ]
        };
        let data = {
          data: {
            Action: 'getlistshow',
            jsoncontent: JSON.stringify(jsoncontent)
          },
          url: this.getBaseUrl + 'CommonHandler/MatchHandler.ashx'
        };
        util.fetchData(data).then(res => {
          if (res.data.result == 0) {
            this.matchHandler = res.data.data[0] || {};
            window.changeTitle(this.matchHandler.MName);
          }
          else {
          }
        });
      },
      saveOrder() {
        let jsoncontent = {
          "field": {
            "Mid": this.$router.history.current.params.Mid,
            "Tid": this.team.teamId,
            "UserName": this.userInfo.username,
            "Phone": this.userInfo.phone,
            "UserId": this.getOpenId,
            "Price": this.matchHandler.Price,
            "Num": this.orderNum,
            "TotalPrice": this.matchHandler.Price * this.orderNum
          }
        };
        let data = {
          data: {
            Action: 'adddata',
            jsoncontent: JSON.stringify(jsoncontent)
          },
          url: this.getBaseUrl + 'CommonHandler/OrderHandler.ashx'
        };
        util.fetchData(data).then(res => {
          if (res.data.result == 0) {
            this.jumpToOrder();
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
  @import './../assets/less/pay-order.less';
</style>
