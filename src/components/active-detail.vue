<template>
    <div class="active-detail">
      <!--<houseHead>活动详情</houseHead>-->
      <div class="banners">
        <div class="timers">
          <div class="tittle">距开赛</div>
          <div class="text">{{leftCounts}}</div>
        </div>
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(img,index) in listImg" v-bind:style="{background:'url('+img+')' ,color:'red',backgroudSize:'cover'}"></div>
          </div>
          <div class="swiper-pagination swiper-pagination-white"></div>
        </div>
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
        <div class="Crowd" @click="jumpCrowd">我的众筹</div>
        <div class="pay" @click="jumpPay">立即支付</div>
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
  export default {
      template: '.active-detail',
      data: function () {
          return {
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
            timer:null
          };
      },
      computed: {
        ...mapGetters([
          'getBaseUrl',
          'getSelectRoute'
        ])
      },
      components: {houseHead, houseBtn, houseSort},
      methods: {
        init() {
          this.getMatchHandler();
          this.getCount();
          window.changeTitle('活动详情');
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
              this.getLeftCounts([this.MatchHandler.TimeStamp,this.MatchHandler.BeingTime])
              this.selectImg = this.MatchHandler.DetailDesImgUrl
              this.listImg = this.MatchHandler.PlayImgUrlPath.split(',')
              console.log(this.listImg);
              // this.getlun()
              setTimeout(()=>{
                this.getlun()
              },200)
            }
            else {

            }
          });
        },
        getLeftCounts([timeS,timeE]){
          let timeCounts = new Date(timeE) - new Date(timeS);
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
             speed: 600,
             autoplay: 1000,
             delay:1000,
             onTouchEnd: function() {
               swiper.startAutoplay()
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
        }
      },
    mounted() {
      this.init();
    },
    destroyed () {
      clearInterval(this.timer);
    }
  };
</script>
<style lang="less">
    @import './../assets/less/active-detail.less';
</style>
