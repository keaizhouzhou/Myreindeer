<template>
    <div class="active-detail">
      <!--<houseHead>活动详情</houseHead>-->
      <div class="banners">
        <!--<div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(img,index) in listImg" v-bind:style="{background:'url('+img+')' ,color:'red',backgroudSize:'cover'}"></div>
          </div>
          <div class="swiper-pagination swiper-pagination-white"></div>
        </div>-->
        <swiper :options="swiperOption" v-if="listImg.length>0" ref="swiperOption">
          <swiper-slide v-for="(img,index) in listImg">
            <div class="swiper-slide"  v-bind:style="{background:'url('+img+')' ,backgroundSize:'cover'}"></div>
          </swiper-slide>
          <div class="swiper-pagination "  slot="pagination"></div>
        </swiper>
      </div>
      <div class="introduce">
        <div class="top">
          <div class="tittle">
            <div class="mylogo"></div>
            <div class="companyName">驯鹿探索</div>
            <div class="timers">
              <span class="isOver" v-if="isOver">活动已结束</span>
              <span class="tittle" v-if="!isOver">距开赛还有:</span>
              <span class="text" v-if="!isOver">{{leftCounts}}</span>

            </div>
          </div>
          <div class="Nname">{{MatchHandler.MName}}</div>
          <!--<div class="pricePlace">
            <div class="price">￥{{MatchHandler.Price}}</div>
            <div class="place"></div>
          </div>-->
        </div>

        <div class="bottom">
          <div class="item">
            <div class="targetPriceName">
              <div class="title">
                目标金额
              </div>
            </div>
            <div class="targetPrice">
              <div class="text">
                {{MatchHandler.Price}} 元
              </div>
            </div>
          </div>
        </div>

        <!--<div class="bottom">
          <div class="item">
            <div class="queenCount">
              <div class="title">
                队伍数量
              </div>
              <div class="text">
                {{countObj.TeamCount}}支
              </div>
            </div>
            <div class="peopleCount">
              <div class="title">
                报名人数
              </div>
              <div class="text">
                {{countObj.OrderCount}}人
              </div>
            </div>
            <div class="support">
              <div class="title">
                支持人数
              </div>
              <div class="text">
                {{countObj.SupportCount}}人
              </div>
            </div>
          </div>
        </div>-->
      </div>
      <houseSort :tabList="tabList" @tabClick="tabClick ($event)" :isTop="isTop"></houseSort>
      <div class="content"  v-html="selectImg">
      </div>
      <div class="footerWrap">
        <div class="footer">
          <div>驯鹿探索&copy;2018</div>
          <div>技术支持&copy;联系驯鹿</div>
        </div>
      </div>
      <div class="btns">
        <div class="btnOvers" v-if="isOver">报名已截止</div>
        <!--<div class="Crowd" @click="jumpCrowd" v-show="!isOver&&!hasOrder&&isSupport">我要发布众筹</div>
        <div class="Crowd" @click="jumpMyCrowd" v-show="hasOrder&&isSupport">我的众筹</div>-->
        <div class="Crowd" @click="jumpCrowd" v-show="!isOver&&!hasOrder&&isSupport">我要报名</div>
        <div class="Crowd" @click="jumpMyCrowd" v-show="hasOrder&&isSupport">我的订单</div>
        <!--<div class="Crowd" @click="jumpPay" v-show="!isOver&&!hasOrder" >立即支付</div>-->
      </div>
    </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex';
  import houseBtn from './common/house-btn.vue';
  import houseHead from './common/house-head.vue';
  import houseSort from './common/house-sort.vue';
  import {util} from '../assets/js/util'
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  import 'swiper/dist/css/swiper.css'////这里注意具体看使用的版本是否需要引入样式，以及具体位置。
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
      template: '.active-detail',
      data: function () {
          return {
            isShare:false,
            swiperOption: {//swiper3
              autoplay: {
                stopOnLastSlide: false,
                disableOnInteraction: true,
                delay: 2000,
              },
              pagination: {
                el: '.swiper-pagination',
                clickable :true
              },
              speed: 500,
              loop: true
            },
            isTop:false,
            listImg:[],
            tabList: [
              {value: '详情描述', key: 'detail'},
              {value: '报名相关', key: 'sign'},
              {value: '参赛标准', key: 'params'}
            ],
            leftCounts:'',
            selectedTab:{},
            MatchHandler:{},
            countObj:{},
            selectImg:'',
            timer:null,
            isOver:false, // 活动时间是否过期
            hasOrder:false, // 订单是否存在
            isSupport:true // 该活动是否支持众筹
          };
      },
      computed: {
        ...mapGetters([
          'getBaseUrl',
          'getSelectRoute',
          'getOpenId'
        ])
      },
      components: {houseHead, houseBtn, houseSort, swiper, swiperSlide},
      methods: {
        ...mapActions([
          'changeRoute',
          'changeOpenId',
          'changeUserInfo'
        ]),
        init() {
          this.getMatchHandler();
          this.getCount();
          this.getCrowdOreder();
          //this.getSelfOrder();
          this.getIsCrowdFund();

        },
        getIsCrowdFund () { // 判断此活动是否支持众筹
          let jsoncontent ={
            condition:[
              {key:'MId', values:this.$route.params.MId || '', oprate:'='}
            ]
          } ;
          let data = {
            data:{
              Action:'getmodel',
              jsoncontent:JSON.stringify(jsoncontent)
            },
            url:this.getBaseUrl + 'CommonHandler/MatchHandler.ashx'
          };
          util.fetchData (data).then(res => {
            if (res.data.result === 0) {
              this.isSupport = res.data.data.IsCrowdFund !== 0?false:true;
              console.log('支付支持',this.isSupport)
            }
            else {

            }
          });
        },
        getCrowdOreder () { // 获取众筹订单
          let jsoncontent ={
            condition:[
              {"key":"openid","values":this.getOpenId,"oprate":"="},
              {key:'MId', values:this.$route.params.MId || '', oprate:'='}
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
                //this.hasOrder = false;
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
        getSelfOrder () { // 获取自付订单
          let jsoncontent ={
            condition:[
              {"key":"openid","values":this.getOpenId,"oprate":"="},
              {key:'MId', values:this.$route.params.MId || '', oprate:'='}
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
            if (res.data.result === 0) {
              if (res.data.data.length === 0) { // 没有订单
               //this.hasOrder = false;
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
        jumpPay () {
          this.$router.push('/payOrder/' + this.$route.params.MId);
        },
        jumpMyCrowd () {
          this.$router.push('/main/myCrowd');
        },
        jumpCrowd () {
          this.$router.push('/orderCrowd/'  + this.$route.params.MId);
        },
        tabClick ({key} = tab) {
          if (key == 'detail'){
            this.selectImg = this.MatchHandler.DetailDesImgUrl
          }
          else if (key == 'sign'){
            this.selectImg = this.MatchHandler.RegisterRelated
          }
          else if (key == 'params') {
            this.selectImg = this.MatchHandler.MatchStandard
          }
        },
        getMatchHandler () { // 赛事详情
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
              console.log('data',res.data);
              this.MatchHandler = res.data.data[0]|| {};
              // 判断时间
              this.getLeftCounts([this.MatchHandler.TimeStamp,this.MatchHandler.MatchBeingTime])
              this.selectImg = this.MatchHandler.DetailDesImgUrl
              this.listImg = this.MatchHandler.PlayImgUrlPath.split(',');
              console.log(this.listImg)
              setTimeout(()=>{
                window.changeTitle(this.MatchHandler.MName);
              },10);
              let vm = this;
              console.log("vm",wx)
              wx.ready(function(){
                //alert('jsdk加载成功')
                wx.onMenuShareAppMessage({ // 发送朋友
                  title: vm.MatchHandler.MName, // 分享标题
                  desc:  vm.MatchHandler.ShareDescribe, // 分享描述
                  link:`${vm.getBaseUrl}?MId=${vm.$route.params.MId}&isShare=true&type=detail`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: vm.getBaseUrl + vm.MatchHandler.SmallImgUrl,// 分享图标
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
                  title: vm.MatchHandler.MName, // 分享标题
                  desc:  vm.MatchHandler.ShareDescribe, // 分享描述
                  link:`${vm.getBaseUrl}?MId=${vm.$route.params.MId}&isShare=true&type=detail`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: vm.getBaseUrl + vm.MatchHandler.SmallImgUrl,// 分享图标
                  type: 'link', // 分享类型,music、video或link，不填默认为link
                  success: function () {
                    // 用户确认分享后执行的回调函数
                    //alert("分享url", `${vm.getBaseUrl}?MId=${vm.$route.params.MId}&isShare=true&type=detail`)
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
              })
            }
            else {

            }
          });
        },
        getLeftCounts([timeS,timeE]){
          if(timeS=='' || timeE=='') {
            this.isOver = true;
            return false;
          }
          //console.log('1111 timeS:'+timeS+"   timeE:"+timeE);
          //增加转换时间，用于ios系统使用
          timeE=timeE.replace(/-/g, '/');
          timeS=timeS.replace(/-/g, '/');
          //console.log('2222 timeS:'+timeS+"   timeE:"+timeE);
          let timeCounts = new Date(timeE) - new Date(timeS);
          //console.log('2222 timeCounts:'+timeCounts);
          if (timeCounts <= 0) {
            this.isOver = true;
            return false;
          }
          if(timeCounts>0) {
            this.timer = setInterval(() => {
              timeCounts = timeCounts - 1000;
              let days = Math.floor(timeCounts / (1000 * 60 * 60 * 24));
              let hours = Math.floor((timeCounts - days * (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              let minute = Math.floor((timeCounts - days * (1000 * 60 * 60 * 24) - hours * (1000 * 60 * 60)) / (1000 * 60));
              let second = (timeCounts - days * (1000 * 60 * 60 * 24) - hours * (1000 * 60 * 60) - minute * (1000 * 60)) / 1000;
              this.leftCounts = `${days}天 ${hours}:${minute}:${second}`;
            }, 1000)
          }else{
            this.isOver = true;
          }
        },
        getCount(){ // 获取各种数量
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
              Action:'matchshowtosc',
              jsoncontent:JSON.stringify(jsoncontent)
            },
            url:this.getBaseUrl + 'CommonHandler/MatchHandler.ashx'
          };
          util.fetchData (data).then(res => {
            if (res.data.result == 0) {
              console.log('data',res.data);
              this.countObj = res.data.data[0]|| {};
            }
            else {

            }
          });
        },
        getNewOpen () {
          if (this.isShare  === 'true') { // 通过别人分享来的
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
                this.init();
              }
            });
          }
          else { // 自己访问的
            this.init();
          }
        },
        scroll () {
          if (this.$route.name === "activeDetail") {
            let t = document.documentElement.scrollTop || document.body.scrollTop;
            let bannerHeight = parseInt(window.getComputedStyle(document.querySelector(".banners")).height);
            let introduceHeight = parseInt(window.getComputedStyle(document.querySelector(".introduce")).height);
            console.log(t)
            if (t >= bannerHeight + introduceHeight) {
              this.isTop = true;
            }
            else {
              this.isTop = false;
            }
          }
        }
      },
    mounted() {
      this.isShare = this.$route.params.isShare;
      this.getNewOpen();
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
    @import './../assets/less/active-detail.less';
</style>
