<template>
    <div class="order-crowd">
      <!--<houseHead>众筹下单</houseHead>-->
      <div class="relationship">
        <div class="nameAndPhone">
          <div v-if=" userInfo && userInfo.username" class="name">姓名：{{userInfo.username}}</div>
          <div v-if=" userInfo && userInfo.phone" class="phone">联系电话：{{userInfo.phone}}</div>
          <div class="leftArr" @click="jumpAddInfo"></div>
        </div>
        <div v-if="!userInfo.username && !userInfo.phone" class="addRelationship">
          <div class="tittle" @click="jumpAddInfo" >新增个人页面<span>></span></div>
          <div class="text">请填写您的个人信息以便工作人员更好的为您服务</div>
        </div>
        <div class="task-items">
          <houseSelect
            title = '选择地区：'
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
          <div class="onePrice">报名费用：{{matchHandler.Price}}元</div>
          <!--<div class="count">X{{orderNum}}</div>-->
        </div>
      </div>
      <div class="computed">
        <div class="computedCount">
          <!--<div class="reduce" @click="orderNum>1?orderNum--:''">-</div>
          <div class="count">{{orderNum}}</div>
          <div class="plus" @click="orderNum++">+</div>-->
        </div>
        <div class="totalPrice">
          <!--众筹合计:￥{{orderNum*matchHandler.Price}}-->
          订单合计:￥{{orderNum*matchHandler.Price}}
        </div>
      </div>

      <div class="relationship">
        <div class="nameAndPhone">
          <div class="name">物资领取：<a :href=matchHandler.TurnUrl>点击填写物资领取表及查看免责条款</a></div>
          <!--<div @click="clicklink">点击填写物资领取表及查看免责条款</div>-->
          <!-- <router-link tag='a' :to="matchHandler.TurnUrl" >{{matchHandler.TurnUrl}}点击填写物资领取表及查看免责条款</router-link>-->
        </div>
      </div>
        <div class="relationship">
        <div class="nameAndPhone">
          <div class="name"><input v-model="chkMZ" type="checkbox"/>我已阅读免责条款，并同意。</div>
        </div>
      </div>

      <div class="pay">
        <!--<div class="payTittle">众筹支付</div>
        <div class="icon"></div>-->
      </div>
      <!--<div class="btn" @click="saveOrderCrowd">发布众筹</div>-->

      <div class="btn" @click="saveOrderCrowd">报名提交</div>
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
    template: '.order-crowd',
    data: function () {
        return {
          orderNum:1,
          userInfo:{},
          matchHandler:{},
          channellist:{

          },
          channel:'',
          channelName:'',
          chkMZ:"",
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
    components: {houseBtn, houseHead, houseSelect, houseToast},
    methods: {
      clicklink(){
          let _this=this
        alert("###")
        console.log(_this.matchHandler.TurnUrl)
        //this.$router.push({path:"https://www.baidu.com/"})
      },
      ...mapActions([
        'changeRoute',
        'changeOpenId',
        'changeUserInfo'
      ]),
      init() {
        this.useInfo();
        this.getMatchHandler();
        this.getTeams();
      //window.changeTitle('众筹下单');
        window.changeTitle('报名下单');
      },
      change() {

      },
      check() { // 校验
        let Tid = this.$refs.channel.choseItem.key;
        if (!Tid) {
          this.$refs.toast.toastShow('请选择地区')
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
        if(!this.chkMZ){
          this.$refs.toast.toastShow('请勾选 我已阅读免责条款，并同意')
          return false;
        }
        return true;
      },
      jumpAddInfo () {
        window.userInfo = this.userInfo;
        this.$router.push('/addInfo')
      },
      jumpToCrowd (CId) {
        this.$router.push('/sharePage/'+this.matchHandler.MId+'/' + CId + '/' + this.$refs.channel.choseItem.key + '/false' + '/none')
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
              this.channellist[lists[i].TId + ''] = lists[i].TName
            }
          }
          else {}
        });
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
      getMatchHandler () { // 自付赛事详情
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
    sleep(numberMillis) { // 间隔一段时间后执行
      var now = new Date();
      var exitTime = now.getTime() + numberMillis;
      while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
          return;
      }
    },
      saveOrderCrowd() { // 提交订单
        if (this.check()) {
          let jsoncontent ={
            "field": {
              "Mid": this.$route.params.MId,
              "Tid": this.$refs.channel.choseItem.key,
              "username": this.userInfo.username,
              "phone": this.userInfo.phone,
              "UserId": this.getOpenId
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
              this.$refs.toast.toastShow('众筹发布成功，找人帮我筹 去众筹吧！');
              this.jumpToCrowd(res.data.data.CId);
            }
            else {
            }
          });
        }

      },
      sleep(numberMillis) { // 间隔一段时间后执行
        var now = new Date();
        var exitTime = now.getTime() + numberMillis;
        while (true) {
          now = new Date();
          if (now.getTime() > exitTime)
            return;
        }
     }
    },
    mounted: function () {
        this.init();
    }
  };
</script>
<style lang="less">
    @import './../assets/less/orderCrowd.less';
    @import './../assets/less/item-style.less';
</style>
