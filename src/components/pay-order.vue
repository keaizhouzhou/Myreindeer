<template>
    <div class="pay-order">
      <!--<houseHead>自付下单</houseHead>-->
      <div class="relationship">
        <div class="nameAndPhone">
          <div v-if=" userInfo && userInfo.username" class="name">姓名：{{userInfo.username}}</div>
          <div v-if=" userInfo && userInfo.phone" class="phone">联系电话：{{userInfo.phone}}</div>
          <div class="leftArr" @click="jumpAddInfo">></div>
        </div>
        <div v-if="!userInfo.username && !userInfo.phone" class="addRelationship">
          <div class="tittle" @click="jumpAddInfo" >新增个人页面<span>></span></div>
          <div class="text">请填写您的个人信息以便工作人员更好的为您服务</div>
        </div>
        <div class="task-items">
          <houseSelect
            title = '队伍'
            :choseList = 'channellist'
            :initValue = channel
            @getList="change"
            placeHolder="请选择"
            ref="channel"
          ></houseSelect>
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
      <houseToast ref="toast"></houseToast>
    </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex';
  import houseBtn from './common/house-btn.vue';
  import houseSelect from './common/house-select.vue';
  import houseHead from './common/house-head.vue';
  import houseToast from './common/house-toast.vue';
  import {util} from '../assets/js/util'
  export default {
      template: '.pay-order',
      data: function () {
          return {
            orderNum:1,
            userInfo:{},
            matchHandler:{},
            channellist:{

            },
            channel:'',
            channelName:''
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
      components: {houseBtn, houseHead, houseSelect,houseToast },
      methods: {
        ...mapActions([
          'changeRoute',
          'changeOpenId',
          'changeUserInfo'
        ]),
        check() { // 校验
          let Tid = this.$refs.channel.choseItem.key;
          if (!Tid) {
            this.$refs.toast.toastShow('请选择队伍')
            return false;
          }
          if (!this.userInfo.username) {
            this.$refs.toast.toastShow('请填写名字')
            return false;
          }
          if (!this.userInfo.phone) {
            this.$refs.toast.toastShow('请填写电话')
            return false;
          }
          return true;
        },
        init() {
          this.getMatchHandler();
          this.useInfo();
          this.getTeams();
          window.changeTitle('自付下单');
        },
        jumpToOrder () {
          if (this.check()){
            this.$router.push(`/confirmOrder/${this.orderNum}/${this.channellist[this.$refs.channel.choseItem.key]}/${this.$refs.channel.choseItem.key}/${this.$route.params.MId}`);
          }
        },
        jumpAddInfo () {
          this.$router.push('/addInfo')
        },
        change(){

        },

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
        getTeams () { // 获取赛事队伍
          let jsoncontent = {
            condition:[
              {
                key:'Del',
                values:'0',
                oprate:''
              }
            ]
          };
          let data = {
            data:{
              Action:'getlist',
              jsoncontent:JSON.stringify(jsoncontent)
            },
            url:this.getBaseUrl + 'CommonHandler/TeamHandler.ashx'
          };
          util.fetchData (data).then(res => {
            if (res.data.result == 0) {
              console.log('sss',res.data)
              let lists = res.data.data;
              for (let i = 0; i < lists.length; i++) {
                this.channellist[lists[i].Id + ''] = lists[i].TName
              }
            }
            else {}
          });
        },
        getMatchHandler () {
          let jsoncontent ={
            condition:[
              {
                key:'MId',
                values:this.$route.params.MId || '',
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
    @import './../assets/less/item-style.less';
</style>
