<template>
    <div class="active-detail">
      <!--<houseHead>活动详情</houseHead>-->
      <div class="banners">
        <div class="timers">
          <div class="tittle" v-if="!isOver">距开赛</div>
          <div class="text" v-if="!isOver">{{leftCounts}}</div>
          <div class="isOver" v-if="isOver">活动已结束</div>
        </div>
        <!--<div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(img,index) in listImg" v-bind:style="{background:'url('+img+')' ,color:'red',backgroudSize:'cover'}"></div>
          </div>
          <div class="swiper-pagination swiper-pagination-white"></div>
        </div>-->
        <swiper :options="swiperOption" v-if="listImg.length>0" ref="swiperOption">
          <swiper-slide v-for="(img,index) in listImg">
            <div class="swiper-slide"  v-bind:style="{background:'url('+img+')' ,color:'red',backgroudSize:'cover'}"></div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="introduce">
        <div class="top">
          <div class="tittle">{{MatchHandler.MName}}</div>
          <div class="pricePlace">
            <div class="price">￥{{MatchHandler.Price}}.0</div>
            <div class="place">北京市</div>
          </div>
        </div>
        <div class="bottom">
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
        </div>
      </div>
      <houseSort :tabList="tabList" @tabClick="tabClick ($event)"></houseSort>
      <div class="content"  v-html="selectImg">
      </div>
      <div class="btns">
        <div class="Crowd" @click="jumpCrowd" v-if="!isOver&&!hasOrder&&isSupport">我要众筹</div>
        <div class="pay" @click="jumpPay" v-if="!isOver&&!hasOrder&&isSupport">立即支付</div>
        <div class="btnOvers" v-if="isOver">活动已经结束</div>
      </div>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex';
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
            swiperOption: {//swiper3
              autoplay: {
                stopOnLastSlide: false,
                disableOnInteraction: true,
                delay: 2000,
              },
              speed: 500,
              loop: true
            },
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
        init() {
          this.getMatchHandler();
          this.getCount();
          this.getCrowdOreder();
          this.getSelfOrder();
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
              this.isSupport = res.data.data.IsCrowdFund !== 0?false:'';
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
              res.data.data.map((item)=>{
                if (item.MId === this.$route.params.MId) {
                  // 订单已经存在
                  this.hasOrder = true;
                }
              })
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
              res.data.data.map((item)=>{
                if (item.MId === this.$route.params.MId) {
                  // 订单已经存在
                  this.hasOrder = true;
                }

              })
            }
            else {

            }
          });
        },
        jumpPay () {
          this.$router.push('/payOrder/' + this.$route.params.MId);
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
              this.getLeftCounts([this.MatchHandler.TimeStamp,this.MatchHandler.BeingTime])
              this.selectImg = this.MatchHandler.DetailDesImgUrl
              this.listImg = this.MatchHandler.PlayImgUrlPath.split(',');
              console.log(this.listImg)
              window.changeTitle('活动详情');
              let vm = this;
              wx.onMenuShareAppMessage({ // 发送朋友
                title: vm.MatchHandler.ShareTitle, // 分享标题
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
                title: vm.MatchHandler.ShareTitle, // 分享标题
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
            }
            else {

            }
          });
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
        getlun () {
          let swiper = new Swiper('.swiper-container', {
             pagination: '.swiper-pagination',
             paginationClickable: true,
             loop: true,
             speed: 100,
             autoplay: 100,
             onTouchEnd: function() {
               /*swiper.startAutoplay()*/
             }
           });
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
          if (this.isShare === 'true') { // 通过别人分享来的
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
        }
      },
    mounted() {
      this.getNewOpen();

    },
    destroyed () {
      clearInterval(this.timer);
    }
  };
</script>
<style lang="less">
    @import './../assets/less/active-detail.less';
</style>
