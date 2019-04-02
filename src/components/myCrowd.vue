<template>
  <div class="myCrowd">
    <!--<houseHead>我的众筹</houseHead>-->
    <houseSort :tabList="tabList" @tabClick="tabClick ($event)"></houseSort>
    <div class="content">
      <div v-if="selectedTab.key == 'crowding'">
        <div class="itemWrap" v-for="(item,index) in crowdingItems">
          <div class="home-item">
            <div class="item-image"
                 :style="{background:'url('+getBaseUrl+item.SmallImgUrl+')' ,backgroundSize:'100% 100%'}"></div>
            <div class="item-des">
              <div class="tittle">{{item.MName}}</div>
              <div class="price">￥{{item.Price}}</div>
              <div class="need_price">还差{{item.Unfinished}}元</div>
              <div class="progress-parent">
                <div class="icon" :style="{left:(parseInt(item.Rate)>90)?'90%':item.Rate}">{{item.Rate?item.Rate:'0%'}}</div>
                <div class="progress-child" :style="{width:item.Rate}"></div>
              </div>
            </div>
          </div>
          <div class="btns">
            <div class="myself_support" @click="jumpSelfSupport(item)" v-if="item.State == 0">自己付款</div>
            <div class="go_crowd" @click="jumpSharePage(item)" v-if="item.State == 0">朋友代付</div>
            <!--<div class="write_message" v-if="item.State == 1" @click="goInfo()">填写报名信息</div>-->
            <div class="go_crowd" @click="jumpSharePage(item)" >查看详情</div>
            <div class="deposit" v-if="item.State == 2" @click="payLast()">补齐尾款</div>
          </div>
        </div>
      </div>
      <div v-if="selectedTab.key == 'successful'">
        <div class="itemWrap" v-for="(item,index) in successfulItems">
          <div class="home-item">
            <div class="item-image"
                 :style="{background:'url('+getBaseUrl+item.SmallImgUrl+')' ,backgroundSize:'100% 100%'}"></div>
            <div class="item-des">
              <div class="tittle">{{item.MName}}</div>
              <div class="price">￥{{item.Price}}</div>
              <div class="need_price">还差{{item.Unfinished}}元</div>
              <div class="progress-parent">
                <div class="icon" :style="{left:(parseInt(item.Rate)>90)?'90%':item.Rate}">{{item.Rate?item.Rate:'0%'}}</div>
                <div class="progress-child" :style="{width:item.Rate}"></div>
              </div>
            </div>
          </div>
          <div class="btns">
            <div class="myself_support" @click="jumpSelfSupport(item)" v-if="item.State == 0">自己付款</div>
            <!--<div class="go_crowd" @click="jumpSharePage(item)" v-if="item.State == 0">我去众筹</div>-->
            <div class="go_crowd" @click="jumpSharePage(item)" >查看详情</div>
            <!--<div class="write_message" v-if="item.State == 1" @click="goInfo()">填写报名信息</div>-->
            <div class="deposit" v-if="item.State == 2" @click="payLast()">补齐尾款</div>
          </div>
        </div>
      </div>
      <div v-if="selectedTab.key == 'failure'">
        <div class="itemWrap" v-for="(item,index) in failureItems">
          <div class="home-item">
            <div class="item-image"
                 :style="{background:'url('+getBaseUrl+item.SmallImgUrl+')' ,backgroundSize:'100% 100%'}"></div>
            <div class="item-des">
              <div class="tittle">{{item.MName}}</div>
              <div class="price">￥{{item.Price}}</div>
              <div class="need_price">还差{{item.Unfinished}}元</div>
              <div class="progress-parent">
                <div class="icon" :style="{left:(parseInt(item.Rate)>90)?'90%':item.Rate}">{{item.Rate?item.Rate:'0%'}}</div>
                <div class="progress-child" :style="{width:item.Rate}"></div>
              </div>
            </div>
          </div>
          <div class="btns">
            <div class="myself_support" @click="jumpSelfSupport(item)" v-if="item.State == 0">自己付款</div>
            <div class="go_crowd" @click="jumpSharePage(item)" v-if="item.State == 0">朋友代付</div>
            <!--<div class="write_message" v-if="item.State == 1" @click="goInfo()">填写报名信息</div>-->
            <div class="deposit" v-if="item.State == 2" @click="payLast()">补齐尾款</div>
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
  import {util} from '../assets/js/util';

  export default {
    template: '.myCrowd',
    data: function () {
      return {
        selectedTab: {value: '全部订单', key: 'crowding'},
        tabList: [
          {value: '全部订单', key: 'crowding'},
          {value: '成功', key: 'successful'}
          //,{value: '失败', key: 'failure'}
        ],
        crowdingItems: [],
        successfulItems: [],
        failureItems: []
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
      init() {
        window.changeTitle('我的订单');
        if (!this.getOpenId) { // 如果没有openid 先获取
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
              this.getCrowding();
            }
          });
        }
        else {
          this.getCrowding();
        }

      },
      tabClick(tab) {
        this.selectedTab = tab;
        let {key = ''} = tab;
        if (key == 'crowding') {
          this.getCrowding()
        }
        else if (key == 'successful') {
          this.getSuccessfulItems()
        }
        else if (key == 'failure') {
          this.getFailureItems();
        }
      },
      jumpSelfSupport({MId,Unfinished,CId} = item) {
        this.$router.push(`/selfSupport/${MId}/${Unfinished}/${CId}`);
      },
      jumpSharePage({MId,CId,TId} = item) {
        this.$router.push(`/sharePage/${MId}/${CId}/${TId}/false/none`);
      },
      goInfo() {
        this.$router.push('/')
      },
      payLast() {
      },
      getCrowding() { // 获取正在众筹
        let jsoncontent = {
          condition: [
            {
              key: 'openid',
              values: this.getOpenId || '',
              oprate: '='
            }
            //,{"key": "State", "values": "0", "oprate": "="}
          ]
        };
        let data = {
          data: {
            Action: 'getlistwxpersondetail',
            jsoncontent: JSON.stringify(jsoncontent)
          },
          url: this.getBaseUrl + 'CommonHandler/CrowdFundOrderHandler.ashx'
        };
        util.fetchData(data).then(res => {
          if (res.data.result == 0) {
            this.crowdingItems = res.data.data;
          }
          else {

          }
        });
      },
      getSuccessfulItems() {
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
            Action: 'getlistwxpersondetail',
            jsoncontent: JSON.stringify(jsoncontent)
          },
          url: this.getBaseUrl + 'CommonHandler/CrowdFundOrderHandler.ashx'
        };
        util.fetchData(data).then(res => {
          if (res.data.result == 0) {
            console.log('data', res.data);
            this.successfulItems = res.data.data;
          }
          else {

          }
        });
      },
      getFailureItems() { // 失败的
        let jsoncontent = {
          condition: [
            {
              key: 'openid',
              values: this.getOpenId || '',
              oprate: '='
            },
            {"key": "State", "values": "2", "oprate": "="}
          ]
        };
        let data = {
          data: {
            Action: 'getlistwxpersondetail',
            jsoncontent: JSON.stringify(jsoncontent)
          },
          url: this.getBaseUrl + 'CommonHandler/CrowdFundOrderHandler.ashx'
        };
        util.fetchData(data).then(res => {
          if (res.data.result == 0) {
            console.log('data', res.data);
            this.failureItems = res.data.data;
          }
          else {

          }
        })
      },
    },

    mounted: function () {
      this.init()
    }
  };
</script>
<style lang="less">
  @import './../assets/less/myCrowd.less';
</style>
