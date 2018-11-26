<template>
  <div class="myOrder">
    <!--<houseHead>我的订单</houseHead>-->
    <houseSort :tabList="tabList" @tabClick="tabClick ($event)"></houseSort>
    <div class="content">
      <div v-if="selectedTab.key == 'unComplete'">
        <div class="itemWrap" v-for="(item,i) in unCompleteOrders">
          <div class="home-item">
            <div class="item-image"
                 :style="{background:'url('+getBaseUrl+item.FirstImgUrl+')' ,backgroudSize:'cover'}"></div>
            <div class="item-des">
              <div class="tittle">{{item.MName}}</div>
              <div class="state">{{ item.State | orderState}}</div>
              <div class="price">￥{{item.Price}}<span>{{item.Num ? `X${item.Num}` : ''}}件</span></div>
            </div>
          </div>
          <div class="total">
            <!--<div class="tittle">等待付款</div>-->
            <div class="text">合计：<span style="color: red;">{{item.TotalPrice ? `￥${item.TotalPrice}` : ''}}</span></div>
            <div class="set">
              <div class="payBtn" v-if="item.State == 1" @click="goInfo()">填写报名信息</div>
              <div class="payBtn" v-if="item.State == 0" @click="goPay(item.TotalPrice,item.OId)">去支付</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedTab.key == 'complete'">
        <div class="itemWrap" v-for="(item,i) in completeOrders">
          <div class="home-item">
            <div class="item-image"
                 :style="{background:'url('+getBaseUrl+item.SmallImgUrl+')' ,backgroudSize:'cover'}"></div>
            <div class="item-des">
              <div class="tittle">{{item.MName}}</div>
              <div class="state">{{ item.State | orderState}}</div>
              <div class="price">￥{{item.Price}}<span>{{item.Num ? `X${item.Num}` : ''}}件</span></div>
            </div>
          </div>
          <div class="total">
            <!--<div class="tittle">等待付款</div>-->
            <div class="text">合计：<span style="color: red;">{{item.TotalPrice ? `￥${item.TotalPrice}` : ''}}</span></div>
            <div class="set">
              <div class="payBtn" v-if="item.State == 1" @click="goInfo()">填写报名信息</div>
              <div class="payBtn" v-if="item.State == 0" @click="goPay(item.TotalPrice,item.OId)">去支付</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedTab.key == 'allOrders'">
        <div class="itemWrap" v-for="(item,i) in allOrders">
          <div class="home-item">
            <div class="item-image"
                 :style="{background:'url('+getBaseUrl+item.SmallImgUrl+')' ,backgroudSize:'cover'}"></div>
            <div class="item-des">
              <div class="tittle">{{item.MName}}</div>
              <div class="state">{{ item.State | orderState}}</div>
              <div class="price">￥{{item.Price}}<span>{{item.Num ? `X${item.Num}` : ''}}件</span></div>
            </div>
          </div>
          <div class="total">
            <!--<div class="tittle">等待付款</div>-->
            <div class="text">合计：<span style="color: red;">{{item.TotalPrice ? `￥${item.TotalPrice}` : ''}}</span></div>
            <div class="set">
              <div class="payBtn" v-if="item.State == 1" @click="goInfo()">填写报名信息</div>
              <div class="payBtn" v-if="item.State == 0" @click="goPay(item.TotalPrice,item.OId)">去支付</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import houseBtn from './common/house-btn.vue';
  import houseHead from './common/house-head.vue';
  import houseSort from './common/house-sort.vue';
  import {util} from '../assets/js/util'

  export default {
    template: '.myOrder',
    data: function () {
      return {
        selectedTab: {value: '待支付', key: 'unComplete'},
        tabList: [
          {value: '待支付', key: 'unComplete'},
          {value: '已完成', key: 'complete'},
          {value: '全部订单', key: 'allOrders'}
        ],
        allOrders: [],
        unCompleteOrders: [],
        completeOrders: []
      };
    },
    computed: {
      ...mapGetters([
        'getBaseUrl',
        'getSelectRoute',
        'getOpenId'
      ])
    },
    components: {houseHead, houseBtn, houseSort},
    methods: {
      resiveState(OId) { // 修改订单状态
        let jsoncontent = {
          "field": {
            "State": "1"
          },
          "condition":
            [{"key": "OId", "values": OId, "oprate": "="}]
        };
        let data = {
          data: {
            Action: 'UpdateData',
            jsoncontent: JSON.stringify(jsoncontent)
          },
          url: this.getBaseUrl + 'CommonHandler/OrderHandler.ashx'
        };
        util.fetchData(data).then(res => {
          if (res.data.result == 0) {
            this.getUnComplete(); // 获取未完成的订单
          }
          else {
          }
        })
      },
      goPay(totalPrice, OId) {
        totalPrice = totalPrice ? totalPrice : 0;
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
                  vm.resiveState(OId)
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
        window.changeTitle('我的订单');
        //this.getALLOrders();
        if (!this.getOpenId) { // 如果没有openid 先获取
          let data = {
            data: {
              Action: 'getuserinfobycode',
              code: util.getQueryString('code') || ''
            },
            url: this.getBaseUrl + 'CommonHandler/APIHandler.ashx'
          };
          util.fetchData(data).then(res => {
            if (res.data.result == 0) {
              this.changeOpenId(res.data.data.openid); // 存储openid
              this.changeUserInfo(res.data.data); // 存储useinfo
              this.getUnComplete();
            }
          });
        }
        else {
          this.getUnComplete();
        }
      },
      tabClick(tab) {
        this.selectedTab = tab;
        let {key = ''} = tab;
        if (key == 'unComplete') {
          this.getUnComplete();
        }
        else if (key == 'complete') {
          this.getComplete();
        }
        else if (key == 'allOrders') {
          this.getALLOrders();
        }
      },
      getALLOrders() {// 获取全部订单
        let jsoncontent = {
          condition: [
            {
              key: 'openid',
              values: this.getOpenId || '',
              oprate: ''
            }
          ]
        };
        let data = {
          data: {
            Action: 'getlistwxmyorder',
            jsoncontent: JSON.stringify(jsoncontent)
          },
          url: this.getBaseUrl + 'CommonHandler/OrderHandler.ashx'
        };
        util.fetchData(data).then(res => {
          if (res.data.result == 0) {
            console.log('data', res.data);
            this.allOrders = res.data.data;
          }
          else {

          }
        });
      },
      getUnComplete() { // 获取待支付订单
        let jsoncontent = {
          condition: [
            {
              key: 'openid',
              values: this.getOpenId || '',
              oprate: '='
            },
            {"key": "State", "values": "0", "oprate": "="}
          ]
        };
        let data = {
          data: {
            Action: 'getlistwxmyorder',
            jsoncontent: JSON.stringify(jsoncontent)
          },
          url: this.getBaseUrl + 'CommonHandler/OrderHandler.ashx'
        };
        util.fetchData(data).then(res => {
          if (res.data.result == 0) {
            this.unCompleteOrders = res.data.data;
          }
          else {

          }
        });
      },
      getComplete() { // 获取完成订单
        let jsoncontent = {
          condition: [
            {
              key: 'openid',
              values: this.getOpenId || '',
              oprate: '='
            },
            {"key": "State", "values": "1", "oprate": "="}
          ]
        };
        let data = {
          data: {
            Action: 'getlistwxmyorder',
            jsoncontent: JSON.stringify(jsoncontent)
          },
          url: this.getBaseUrl + 'CommonHandler/OrderHandler.ashx'
        };
        util.fetchData(data).then(res => {
          if (res.data.result == 0) {
            this.completeOrders = res.data.data;
          }
          else {

          }
        });
      },
    },
    mounted: function () {
      this.init()
    }
  };
</script>
<style lang="less">
  @import './../assets/less/myOrder.less';
</style>
