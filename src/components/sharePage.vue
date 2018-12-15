<template>
    <div class="share-page">
      <!--<houseHead>分享页</houseHead>-->
      <div id="mask" v-if="isCancal">
      </div>
      <div id="pop" @click="cancalShare" v-if="isPop">
        <div class="line1">1.点击右上方...</div>
        <div class="line1 line2">2.点击发送或者分享朋友圈</div>
        <div @click="cancalShare" class="popbtn">知道了</div>
      </div>
      <div class="myEdit" v-if="isEdit">
           <textarea style="display: block;"
                     v-model="crowdFundOrder.Declaration"
                     @blur=""></textarea>
        <div class="edit-btn">
          <div @click="saveDes(crowdFundOrder.Declaration)">确认</div>
          <div @click="cancalEdit()">取消</div>
        </div>
      </div>
      <div class="img-information">
        <div class="logo"
             v-if="crowdFundOrder.FirstImgUrl"
             :style="{backgroundImage:'url('+getBaseUrl+crowdFundOrder.FirstImgUrl+')' ,backgroundSize:'100% 100%'}">
          <div class="edit-text">
           <!-- <div @click=editPop  class="editPop">编辑</div>-->
            <div>
              {{crowdFundOrder.Declaration}}
            </div>
          </div>
          <div class="logo-text">
            <div class="text">
              {{crowdFundOrder.UserName}}的众筹
            </div>
            <div class="times">
              {{crowdFundOrder.BeginTime}}发起
            </div>
          </div>
        </div>
        <div class="portrait"
             v-if="crowdFundOrder.headimgurl"
             v-bind:style="{backgroundImage:'url('+crowdFundOrder.headimgurl+')',backgroundSize:'100% 100%'}"></div>
        <div class="crowdSate">
          <div class="text" style="visibility: hidden">众筹即将成功，改购买装备了</div>
          <div class="progress-parent">

            <div class="icon" v-bind:style="{left:(parseInt(crowdFundOrder.Rate)>90)?'90%':crowdFundOrder.Rate}">{{crowdFundOrder.Rate?crowdFundOrder.Rate:'0%'}}</div>
            <div class="progress-child"  v-bind:style="{width:crowdFundOrder.Rate}"></div>
          </div>
          <!--<div class="money">还差{{crowdFundOrder.Unfinished}}元</div>-->
        </div>
        <div class="tittlelogo">
          <div class="mylogo"></div>
          <div class="companyName">驯鹿探索</div>
          <div class="timers">
            <span class="tittle" v-if="!isOver">距开赛</span>
            <span class="text" v-if="!isOver">{{leftCounts}}</span>
            <span class="isOver" v-if="isOver">活动已结束</span>
          </div>
        </div>
        <div class="bottom">
          <div class="item">
            <div class="queenCount">
              <div class="title">
                目标金额
              </div>
              <div class="text">
                {{crowdFundOrder.Price}}元
              </div>
            </div>
            <div class="peopleCount">
              <div class="title">
                已筹金额
              </div>
              <div class="text">
                {{crowdFundOrder.Sumprice}}元
              </div>
            </div>
            <div class="support">
              <div class="title">
                还差金额
              </div>
              <div class="text">
                {{crowdFundOrder.Unfinished}}元
              </div>
            </div>
          </div>
        </div>
        <div class="activeInformation">
          <div class="fill-color"></div>
          <div class="home-item" @click="jumpDetail">
            <div class="item-des">
              <div class="tittle">{{matchHandler.MName}}</div>
              <div class="expense">报名费用：<span style="color: red;">{{matchHandler.Price}}元</span></div>
            </div>
            <div class="item-image"
                 v-if="matchHandler.SmallImgUrl"
                 v-bind:style="{backgroundImage:'url('+ getBaseUrl + matchHandler.SmallImgUrl+')',backgroundSize:'100% 100%'}"></div>
          </div>
        </div>
        <div class="viewDetail">
          <div class="" v-if="isViewDetail">
            <houseSort :tabList="tabList1" @tabClick="tabClick1 ($event)" :isTop="isTop"></houseSort>
            <div class="content"  v-html="selectImg">
            </div>
          </div>
          <div class="text" @click="viewDetail">{{viewText}}</div>
        </div>
        <div class="contentClass">
          <houseSort :tabList="tabList" @tabClick="tabClick ($event)" :isCount="isCount"></houseSort>
          <div v-if="selectedTab.key == 'queue'" class="queuepeople_content contentPeople">
           <!-- <div v-if="!selfShow && index<5" v-for="(item,index) in selfTeamList" class="people" @click="jumpSharePage(item)"></div>
            <div v-if="selfShow " v-for="(item,index) in selfTeamList" class="people" @click="jumpSharePage(item)"></div>
            <div v-if="!selfShow" class="more" @click="selfShow=!selfShow;">
              <span class="text">更多</span>
              <span class="icon">></span>
            </div>
            <div v-if="selfShow" class="more" @click="selfShow=!selfShow;">
              <span class="text">收起</span>
              <span class="icon">^</span>
            </div>-->
          </div>
          <div v-if="selectedTab.key == 'queuePeople'" class="supportpeople_content contentPeople">
            <div v-if="!supportShow && index<5" v-for="(item,index) in selfTeamList" class="people"
                 :style="{background:'url('+item.headimgurl+')',backgroundSize:'contain'}"></div>
            <div v-if="supportShow " v-for="(item,index) in selfTeamList" class="people"
                 :style="{background:'url('+item.headimgurl+')',backgroundSize:'contain'}"
            ></div>
            <div v-if="!supportShow" class="more" @click="supportShow=!supportShow;">
              <span class="text">更多</span>
              <span class="icon">></span>
            </div>
            <div v-if="supportShow" class="more" @click="supportShow=!supportShow;">
              <span class="text">收起</span>
              <span class="icon">^</span>
            </div>
          </div>
          <div class="queue_content" v-if="selectedTab.key == 'supportPeople'">
            <p>已有 <span>{{countObj.SupportCount}}</span>人支持</p>
            <ul>
              <li v-for="(item,index) in supportList">
                <img :src="item.headimgurl" alt="">
                <div>
                  <span class="name">{{item.nickname}}</span>
                  <span class="pay_money">付款 <i>{{item.Price}}</i>元</span>
                  <span class="time">{{item.Msg}}</span>
                  <!--<span class="reply_btn" @click="replay(index)" v-if="item.Msg&&(item.openid != getOpenId)">回复</span>
                  <span class="thank_btn" v-if="false">答谢</span>
                  <div class="reply_content" v-if="item.content||item.ReplyMsg">
                    <i></i>
                    <p>{{item.username}}：</p>
                    <div v-if="item.isReplyMsg ||item.ReplyMsg ">{{item.ReplyMsg}}</div>
                    <div  v-if="item.content">
                      <textarea v-model="item.ReplyMsg" v-if="!item.isReplyMsg"></textarea><span @click="replaySave(item, index)" v-if="!item.isReplyMsg">确认</span>
                    </div>
                  </div>-->
                </div>
              </li>
             <!-- <li>
                <img src="../assets/images/img.jpg" alt="">
                <div>
                  <span class="name">昵称</span>
                  <span class="pay_money">付款 <i>10.00</i>元</span>
                  <p class="message">留言内容留言内容</p>
                  <span class="time">45天前</span>
                  <span class="reply_btn">回复</span>
                  <span class="thank_btn">答谢</span>
                </div>
              </li>
              <li>
                <img src="../assets/images/img.jpg" alt="">
                <div>
                  <span class="name">昵称</span>
                  <span class="pay_money">付款 <i>10.00</i>元</span>
                  <p class="message">支持留言</p>
                  <span class="time">45天前</span>
                  <span class="reply_btn">回复</span>
                  <span class="thank_btn">答谢</span>
                  <div class="reply_content">
                    <i></i>
                    <p>三页：</p>
                    <div>九回复内容回复内容</div>
                  </div>
                </div>
              </li>-->
            </ul>
          </div>
        </div>
      </div>
      <div class="btns">
        <div class="myCrowd" @click="jumpMyCrowd" v-if="isShare == 'false'">我的众筹</div>
        <div class="helpPay" @click="jumpHelpPay" v-if="isShare == 'false'">找人帮我筹</div>
        <div class="selfPay" @click="jumpSelfSupport" v-if="isShare == 'false'">自己付款</div>
        <div class="selfPay" @click="jumpHimSupport" v-show="isShare == 'true' && (parseInt(crowdFundOrder.Rate) < 100)">给他支持</div>
        <div class="myCrowd" @click="myPlay" v-if="isShare == 'true'&&!hasOrder">我也要玩</div>
      </div>
    </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex';
  import houseHead from './common/house-head.vue';
  import houseSort from './common/house-sort.vue';
  import {util} from '../assets/js/util'

  export default {
    template: '.share-page',
    data: function () {
        return {
          selectedTab:{value: '参赛队伍', key: 'queue'},
          selectedTab1: {value: '详情描述', key: 'detail'},
          tabList:[
            {value: '参赛队伍', key: 'queue',num:0},
            {value: '本队人数', key: 'queuePeople',num:0},
            {value: '支持人数', key: 'supportPeople',num:0},
          ],
          tabList1: [
            {value: '详情描述', key: 'detail'},
            {value: '报名相关', key: 'sign'},
            {value: '参赛标准', key: 'params'}
          ],
          isViewDetail:false,
          viewText:"查看详情",
          isTop:false,
          selectImg:'',
          isCount:true,
          matchHandler:{},
          countObj:{},
          crowdFundOrder:{},
          selfTeamList:{},
          selfShow:false,
          supportList:{},
          supportShow:false,
          isCancal:false,
          isEdit:false,
          isPop:false,
          isShare:'false',
          MId:'',
          CId:'',
          TId:'',
          hasOrder:false,
          himHeadUrl:'none',
          leftCounts:'',
          isOver:false, // 活动时间是否过期
        };
    },
    computed: {
      ...mapGetters([
        'getBaseUrl',
        'getSelectRoute',
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
      viewDetail () {
        if (this.isViewDetail) {
          this.isViewDetail = false;
          this.viewText = "查看详情"
        }
        else {
          this.isViewDetail = true;
          this.viewText = "收起详情"
        }
      },
      getLeftCounts([timeS,timeE]){
        let timeCounts = new Date(timeE) - new Date(timeS);
        if (timeCounts <= 0){
          this.isOver = true;
        }
        this.timer = setInterval(()=>{
          timeCounts = timeCounts - 1000;
          let days = Math.floor(timeCounts/(1000*60*60*24));
          let hours = Math.floor((timeCounts - days*(1000*60*60*24))/(1000*60*60));
          let minute = Math.floor((timeCounts - days*(1000*60*60*24) - hours*(1000*60*60))/(1000*60));
          let second = (timeCounts - days*(1000*60*60*24) - hours*(1000*60*60) - minute*(1000*60))/1000;
          this.leftCounts = `${days}天 ${hours}:${minute}:${second}`;
        },1000)

      },
      init() {
        this.MId = this.$route.params.MId;
        this.CId = this.$route.params.CId;
        this.TId = this.$route.params.TId;
        this.isShare = this.$route.params.isShare;
        this.himHeadUrl = encodeURIComponent(this.$route.params.headimgurl);
        this.getNewOpen();
        this.getMatchHandler();
        this.getCrowdFundOrderHandler();
        this.getSelfTeamList();
        this.getSupportList();
      },
      jumpDetail () { // 跳转到详情页
        this.$router.push(`/activeDetail/${this.MId}/false`)
      },
      getCrowdOreder () { // 获取众筹订单
        let jsoncontent ={
          condition:[
            {"key":"openid","values":this.getOpenId,"oprate":"="},
            {key:'MId', values:this.MId || '', oprate:'='}
          ]
        } ;
        let data = {
          data:{
            Action:'getlistwxpersondetail',
            jsoncontent:JSON.stringify(jsoncontent)
          },
          url:this.getBaseUrl + 'CommonHandler/CrowdFundOrderHandler.ashx'
        };
        util.fetchData (data).then(res => {
          if (res.data.result === 0) {
            if (res.data.data.length === 0) { // 没有订单
              // this.hasOrder = true;
            }
            else { // 有订单
              res.data.data.map((item)=>{
                if (item.MId === this.$route.params.MId) {
                  // 订单已经存在
                  this.hasOrder = true;
                }
              })
            }
          }
          else {

          }
        });
      },
      getNewOpen () {
        if (this.isShare === 'true') {
          let data = {
            data:{
              Action:'getuserinfobycode',
              code:util.getQueryString('code') || ''
            },
            url:this.getBaseUrl + 'CommonHandler/APIHandler.ashx'
          };
          util.fetchData (data).then(res => {
            if (res.data.result === 0) {
              this.changeOpenId(res.data.data.openid); // 存储openid
              this.changeUserInfo(res.data.data); // 存储useinfo
              this.getCount();
              this.getCrowdOreder();
            }
            else {
              this.getCrowdOreder();
              this.getCount();
            }
          });
        }
        else {
          this.getCount();
        }
      },
      cancalEdit(){
        this.isCancal = false;
        this.isEdit = false;
      },
      cancalShare() {
        this.isCancal = false;
        this.isPop = false;
      },
      editPop() {
        this.isCancal = true;
        this.isEdit = true;
      },
      tabClick (tab) {
        this.selectedTab = tab;
      },
      tabClick1 (tab) {
        if (tab.key === 'detail'){
          this.selectImg = this.matchHandler.DetailDesImgUrl
        }
        else if (tab.key === 'sign'){
          this.selectImg = this.matchHandler.RegisterRelated
        }
        else if (tab.key === 'params') {
          this.selectImg = this.matchHandler.MatchStandard
        }
      },
      saveDes(des) {
        let jsoncontent ={
          "field":{
            "Declaration":des
          },
          "condition":[
            {
              "key":"CId",
              "values":this.$route.params.CId,
              "oprate":"="
            }
          ]
        } ;
        let data = {
          data:{
            Action:'updatedata',
            jsoncontent:JSON.stringify(jsoncontent)
          },
          url:this.getBaseUrl + 'CommonHandler/CrowdFundOrderHandler.ashx'
        };
        util.fetchData (data).then(res => {
          if (res.data.result == 0) {
            this.isCancal = false;
            this.isEdit = false;
          }
          else {

          }
        });
      },
      replay(index) {
        if (!this.supportList[index].ReplyMsg && (this.supportList[index].openid !== this.getOpenId)){ // 别人有留言才让回复 且不是自己
          this.$set(this.supportList[index],'content',true)
        }
      },
      replaySave(item,index) {
        let {ReplyMsg,CSId} = item;
        let jsoncontent ={
          "field":{
            "ReplyMsg":this.supportList[index].ReplyMsg
          },
          condition:[
            {
              "key":"CSId",
              "values":CSId,
              "oprate":"="
            }
          ]
        } ;
        let data = {
          data:{
            Action:'updatedata',
            jsoncontent:JSON.stringify(jsoncontent)
          },
          url:this.getBaseUrl + 'CommonHandler/CrowdFundOrderSupportHandler.ashx'
        };
        util.fetchData (data).then(res => {
          if (res.data.result == 0) {
            this.supportList[index].isReplyMsg = true;
          }
          else {

          }
        });
      },
      getMatchHandler () {  // 获取赛事信息
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
            Action:'getlistshow',
            jsoncontent:JSON.stringify(jsoncontent)
          },
          url:this.getBaseUrl + 'CommonHandler/MatchHandler.ashx'
        };
        util.fetchData (data).then(res => {
          if (res.data.result == 0) {
            console.log('matchHandler',res.data.data);
            this.matchHandler = res.data.data[0]|| {};
            // 判断时间
            this.getLeftCounts([this.matchHandler.TimeStamp,this.matchHandler.BeingTime])
            this.selectImg = this.matchHandler.DetailDesImgUrl
          }
          else {

          }
        });
      },
      getCrowdFundOrderHandler () {
        let jsoncontent ={
          condition:[
            {"key":"CId","values":this.$route.params.CId,"oprate":"="},
            {"key":"MId","values":this.$route.params.MId,"oprate":"="}
          ]
        } ;
        let data = {
          data:{
            Action:'getlistwxpersondetail',
            jsoncontent:JSON.stringify(jsoncontent)
          },
          url:this.getBaseUrl + 'CommonHandler/CrowdFundOrderHandler.ashx'
        };
        util.fetchData (data).then(res => {
          if (res.data.result == 0) {
            console.log('crowdFundOrder',res.data);
            this.crowdFundOrder = res.data.data[0]|| {};
            window.changeTitle(this.crowdFundOrder.MName);
          }
          else {

          }
        });
      },
      getCount(){ // 获取三个tab的人数
        let jsoncontent ={
          condition:[
            {"key":"openid","values":this.getOpenId,"oprate":"="},
            {"key":"MId","values":this.$route.params.MId,"oprate":"="},
            {"key":"CId","values":this.$route.params.CId,"oprate":"="},
            {"key":"TId","values":this.$route.params.TId,"oprate":"="}
          ]
        };
        let data = {
          data:{
            Action:'getlistwxpersondetailhdxq',
            jsoncontent:JSON.stringify(jsoncontent)
          },
          url:this.getBaseUrl + 'CommonHandler/CrowdFundOrderHandler.ashx'
        };
        util.fetchData (data).then(res => {
          if (res.data.result == 0) {
            console.log('countObj',res.data);
            this.countObj = res.data.data;
            this.tabList[0].num=res.data.data.TeamCount;
            this.tabList[1].num=res.data.data.TheTeamCount;
            this.tabList[2].num=res.data.data.SupportCount;
          }
          else {

          }
        });
      },
      getSelfTeamList(){ // 本队人数
        let jsoncontent ={
          condition:[
            {"key":"TId","values":this.$route.params.TId,"oprate":"="},
            {"key":"MId","values":this.$route.params.MId,"oprate":"="}
          ]
        };
        let data = {
          data:{
            Action:'getlistwxuserinfobdrs',
            jsoncontent:JSON.stringify(jsoncontent)
          },
          url:this.getBaseUrl + 'CommonHandler/CrowdFundOrderHandler.ashx'
        };
        util.fetchData (data).then(res => {
          if (res.data.result == 0) {
            console.log('selfTeamList',res.data.data);
            this.selfTeamList = res.data.data;
          }
          else {

          }
        });
      },
      getSupportList(){ // 支持人数
        let jsoncontent ={
          condition:[
            {"key":"CId","values":this.$route.params.CId,"oprate":"="},
            {"key":"MId","values":this.$route.params.MId,"oprate":"="}
          ]
        };
        let data = {
          data:{
            Action:'getlistwxuserinfozcrs',
            jsoncontent:JSON.stringify(jsoncontent)
          },
          url:this.getBaseUrl + 'CommonHandler/CrowdFundOrderHandler.ashx'
        };
        util.fetchData (data).then(res => {
          if (res.data.result == 0) {
            console.log('supportList',res.data.data);
            this.supportList = res.data.data;
          }
          else {

          }
        });
      },
      jumpSelfSupport () {//跳转至自己支持付款页面
        console.log('/selfSupport/' + this.$route.params.MId + '/' + this.crowdFundOrder.Price - this.crowdFundOrder.Sumprice)
        this.$router.push('/selfSupport/' + this.$route.params.MId + '/' + (this.crowdFundOrder.Price - this.crowdFundOrder.Sumprice) + '/' + this.$route.params.CId);
      },
      jumpHimSupport(){// 跳转到给他支持页面
        this.himHeadUrl = this.himHeadUrl?this.himHeadUrl:'none';
        this.$router.push('/supportHimToPay/' + this.MId + '/' + this.CId + '/' + this.TId + '/' + this.himHeadUrl);
      },
      myPlay(){ // 我也要玩跳转到众筹下单
        this.$router.push(`/orderCrowd/${this.MId}`)
      },
      scroll () {
        if (this.$route.name === "sharePage") {
          let t = document.documentElement.scrollTop || document.body.scrollTop;
          let bannerHeight = parseInt(window.getComputedStyle(document.querySelector(".logo")).height);
          let introduceHeight = parseInt(window.getComputedStyle(document.querySelector(".home-item")).height);
          let activeInformationHeight = parseInt(window.getComputedStyle(document.querySelector(".activeInformation")).height);
          let tittlelogoHeight = parseInt(window.getComputedStyle(document.querySelector(".tittlelogo")).height);
          console.log(t)
          if (t >= bannerHeight + introduceHeight + activeInformationHeight + tittlelogoHeight) {
            this.isTop = true;
          }
          else {
            this.isTop = false;
          }
        }
      },
      jumpHelpPay () { // 进行分享 调第三方接口
        // this.$router.push('/supportHim/' + this.$route.params.MId + '/' + this.$route.params.CId + '/' + this.$route.params.TId);
        this.isCancal = true;
        this.isPop = true;
        wx.onMenuShareAppMessage({ // 发送朋友
          title: this.matchHandler.ShareTitle, // 分享标题
          desc:  this.matchHandler.ShareDescribe, // 分享描述
          link:`${this.getBaseUrl}?MId=${this.$route.params.MId}&CId=${this.$route.params.CId}&TId=${this.$route.params.TId}&isShare=true&headimgurl=${this.crowdFundOrder.headimgurl}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: this.getBaseUrl + this.matchHandler.SmallImgUrl,// 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          success: function () {
            // 用户确认分享后执行的回调函数
            console.log('succ')
          },
          fail () {
            console.log('发送失败')
          },
          complete () {
            console.log('发送结束')
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            console.log('cancel')
          }
        });
        wx.onMenuShareTimeline({ // 分享朋友圈
          title: this.matchHandler.ShareTitle, // 分享标题
          link:`${this.getBaseUrl}?MId=${this.$route.params.MId}&CId=${this.$route.params.CId}&TId=${this.$route.params.TId}&isShare=true&headimgurl=${this.crowdFundOrder.headimgurl}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          /*link: `${this.getBaseUrl}#/sharePage/${this.$route.params.MId}/${this.$route.params.CId}/${this.$route.params.TId}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致*/
          imgUrl: this.getBaseUrl + this.matchHandler.SmallImgUrl,// 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
            console.log('朋友圈分享成功');
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
      },
      jumpMyCrowd () {//跳转至我的众筹
        this.$router.push('/main/myCrowd');
      },
      jumpSharePage (userInfo) {
        this.$router.push('/sharePage/'+userInfo.MId)
      },
    },
    mounted () {
        this.init()
      window.addEventListener("scroll",this.scroll);
      console.log("router",this.$route.name)
    },
    destroyed () {
      clearInterval(this.timer);
      window.removeEventListener("scroll",this.scroll)
    }
  };
</script>
<style lang="less">
    @import './../assets/less/share-page.less';
</style>
