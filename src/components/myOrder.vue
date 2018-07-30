<template>
  <div class="myOrder">
    <!--<houseHead>我的订单</houseHead>-->
    <houseSort :tabList="tabList" @tabClick="tabClick ($event)"></houseSort>
    <div class="content">
      <div v-if="selectedTab.key == 'unComplete'">
        <div class="itemWrap">
          <div class="home-item">
            <div class="item-image"></div>
            <div class="item-des">
              <div class="tittle">2018第一届驯鹿丝绸路108城市戈壁挑战赛</div>
              <div class="price">￥12999.0<span>X2件</span></div>
            </div>
          </div>
          <div class="total">
            <!--<div class="tittle">等待付款</div>-->
            <div class="text">合计：<span style="color: red;">￥25600:00</span></div>
            <div class="set">
              <div class="payBtn">去支付</div>
            </div>
          </div>
        </div>
        <div class="itemWrap">
          <div class="home-item">
            <div class="item-image"></div>
            <div class="item-des">
              <div class="tittle">2018第一届驯鹿丝绸路108城市戈壁挑战赛</div>
              <div class="price">￥12999.0<span>X2件</span></div>
            </div>
          </div>
          <div class="total">
            <div class="text">合计：<span style="color: red;">￥25600:00</span></div>
            <!--<div class="tittle">等待付款</div>-->
            <div class="set">
              <div class="payBtn">去支付</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedTab.key == 'complete'">
        <div class="itemWrap">
          <div class="home-item">
            <div class="item-image"></div>
            <div class="item-des">
              <div class="tittle">2018第一届驯鹿丝绸路108城市戈壁挑战赛</div>
              <div class="price">￥12999.0<span>X2件</span></div>
            </div>
          </div>
          <div class="total">
            <!--<div class="tittle">等待付款</div>-->
            <div class="text">合计：<span style="color: red;">￥25600:00</span></div>
            <div class="set">
              <div class="payBtn">填写报名信息</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedTab.key == 'allOrders'">
        <div class="itemWrap" v-for="(item,i) in allOrders">
          <div class="home-item">
            <div class="item-image"></div>
            <div class="item-des">
              <div class="tittle">{{item.MName}}</div>
              <div class="state">{{ item.State | orderState}}</div>
              <div class="price">￥{{item.Price}}<span>{{item.Num?`X${item.Num}`:''}}件</span></div>
            </div>
          </div>
          <div class="total">
            <!--<div class="tittle">等待付款</div>-->
            <div class="text">合计：<span style="color: red;">{{item.TotalPrice?`￥${item.TotalPrice}`:''}}</span></div>
            <div class="set">
              <div class="payBtn" v-if="item.State == 1">填写报名信息</div>
              <div class="payBtn" v-if="item.State == 0">去支付</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import houseBtn from './common/house-btn.vue';
  import houseHead from './common/house-head.vue';
  import houseSort from './common/house-sort.vue';
  import {util} from '../assets/js/util'
  export default{
    template: '.myOrder',
    data: function () {
      return {
        selectedTab:{value: '全部订单', key: 'allOrders'},
        tabList:[
          {value: '待支付', key: 'unComplete'},
          {value: '已完成', key: 'complete'},
          {value: '全部订单', key: 'allOrders'}
        ],
        allOrders:[],
        unCompleteOrders:[],
        completeOrders:[]
      };
    },
    computed: {
      ...mapGetters([
        'getBaseUrl',
        'getSelectRoute'
      ])
    },
    components: { houseHead, houseBtn, houseSort},
    methods: {
      init () {
        window.changeTitle('我的订单');
        this.getALLOrders();
      },
      tabClick (tab) {
        this.selectedTab = tab;
      },
      getALLOrders () {// 获取全部订单
        let jsoncontent ={
          condition:[
            {
              key:'openid',
              values:"ol7xB1grgNlrobJfBQEKMRFEMrVY",
              oprate:''
            }
          ]
        } ;
        let data = {
          data:{
            Action:'getlistwxmyorder',
            jsoncontent:JSON.stringify(jsoncontent)
          },
          url:this.getBaseUrl + 'CommonHandler/OrderHandler.ashx'
        };
        util.fetchData (data).then(res => {
          if (res.data.result == 0) {
            console.log('data',res.data);
            this.allOrders =  [
              {
                "Id": 4,
                "OId": "A2EE5E42B9004E3D9FDC830E500E3C2C",
                "MId": "D3438C9EC51341258E53460167DD7466",
                "TId": "A8AEA2803D2E4E42951B7689A3C71A91",
                "PayTime": "2018-06-23 01:09:02",
                "Price": 120.00,
                "Num": 3,
                "TotalPrice": 360.00,
                "State": 0,
                "Remark": "",
                "openid": "ol7xB1grgNlrobJfBQEKMRFEMrVY",
                "username": "姓名",
                "phone": "联系电话",
                "nickname": "王国壮",
                "headimgurl": "http://thirdwx.qlogo.cn/mmopen/vi_32/8fC42gYUBu8eSQq4VXecGjRFoO4rrCeWM9kiaEeYZt6iavQvJFE465kyFheqBiaKhUibUYjJbE1DgC77dpH7mCNtJw/132",
                "SmallImgUrl": "",
                "FirstImgUrl": "ueditor/net/upload/image/20180708/6366660768052374223029545.gif",
                "MName": "赛事111"
              },
              {
                "Id": 5,
                "OId": "5957E1C15F8342668AB22DE8E182C265",
                "MId": "B1D666DA3CB24328887FD969CC1EC48B",
                "TId": "",
                "PayTime": "2018-06-23 01:09:02",
                "Price": "",
                "Num": "",
                "TotalPrice": "",
                "State": 1,
                "Remark": "",
                "openid": "ol7xB1grgNlrobJfBQEKMRFEMrVY",
                "username": "姓名",
                "phone": "联系电话",
                "nickname": "王国壮",
                "headimgurl": "http://thirdwx.qlogo.cn/mmopen/vi_32/8fC42gYUBu8eSQq4VXecGjRFoO4rrCeWM9kiaEeYZt6iavQvJFE465kyFheqBiaKhUibUYjJbE1DgC77dpH7mCNtJw/132",
                "SmallImgUrl": "",
                "FirstImgUrl": "ueditor/net/upload/image/20180708/6366660768052374223029545.gif",
                "MName": "赛事2"
              }
            ];
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
  @import './../assets/less/myOrder.less';
</style>
