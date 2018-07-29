<template>
    <div class="share-page">
      <houseHead>分享页</houseHead>
      <div class="img-information">
        <div class="logo">
          <div class="logo-text">
            <div class="text">
              {{crowdFundOrder.UserName}}的赛事
            </div>
            <div class="times">
              {{crowdFundOrder.BeginTime}}发起
            </div>
          </div>
        </div>
        <div class="portrait" v-bind:style="{background:'url('+crowdFundOrder.SmallImgUrl+')'}"></div>
        <div class="crowdSate">
          <div class="text" style="visibility: hidden">众筹即将成功，改购买装备了</div>
          <div class="progress-parent">
            <div class="icon" v-bind:style="{left:crowdFundOrder.Rate}">{{crowdFundOrder.Rate}}</div>
            <div class="progress-child"  v-bind:style="{width:crowdFundOrder.Rate}"></div>
          </div>
          <div class="money">还差{{crowdFundOrder.Price-crowdFundOrder.Sumprice}}元</div>
        </div>
        <div class="activeInformation">
          <div class="fill-color"></div>
          <div class="home-item">
            <div class="item-des">
              <div class="tittle">{{matchHandler.MName}}</div>
              <div class="expense">报名费用：<span style="color: red;">{{matchHandler.Price}}元</span></div>
            </div>
            <div class="item-image" v-bind:style="{background:'url('+matchHandler.SmallImgUrl+')'}"></div>
          </div>
        </div>
        <div class="contentClass">
          <houseSort :tabList="tabList" @tabClick="tabClick ($event)" :isCount="isCount"></houseSort>
          <div v-if="selectedTab.key == 'queuePeople'" class="queuepeople_content contentPeople">
            <div v-if="!selfShow && index<5" v-for="(item,index) in selfTeamList" class="people" @click="jumpSharePage(item)"></div>
            <div v-if="selfShow " v-for="(item,index) in selfTeamList" class="people" @click="jumpSharePage(item)"></div>
            <div v-if="!selfShow" class="more" @click="selfShow=!selfShow;">
              <span class="text">更多</span>
              <span class="icon">></span>
            </div>
            <div v-if="selfShow" class="more" @click="selfShow=!selfShow;">
              <span class="text">收起</span>
              <span class="icon">^</span>
            </div>
          </div>
          <div v-if="selectedTab.key == 'supportPeople'" class="supportpeople_content contentPeople">
            <div v-if="!supportShow && index<5" v-for="(item,index) in supportList" class="people" @click="jumpSharePage(item)"></div>
            <div v-if="supportShow " v-for="(item,index) in supportList" class="people" @click="jumpSharePage(item)"></div>
            <div v-if="!supportShow" class="more" @click="supportShow=!supportShow;">
              <span class="text">更多</span>
              <span class="icon">></span>
            </div>
            <div v-if="supportShow" class="more" @click="supportShow=!supportShow;">
              <span class="text">收起</span>
              <span class="icon">^</span>
            </div>
          </div>
          <div class="queue_content">
            <p>已有 <span>{{countObj.SupportCount}}</span>人支持</p>
            <ul>
              <li>
                <img src="../assets/images/img.jpg" alt="">
                <div>
                  <span class="name">昵称</span>
                  <span class="pay_money">付款 <i>10.00</i>元</span>
                  <span class="time">45天前</span>
                </div>
              </li>
              <li>
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
                  <span class="thank_btn">答谢</span>
                  <div class="reply_content">
                    <i></i>
                    <p>三页：</p>
                    <div>九回复内容回复内容</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="btns">
        <div class="selfPay" @click="jumpSelfSupport">自己支持</div>
        <div class="helpPay" @click="jumpHelpPay">找人帮我筹</div>
        <div class="myCrowd" @click="jumpMyCrowd">我的众筹</div>
      </div>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import houseHead from './common/house-head.vue';
  import houseSort from './common/house-sort.vue';;
  import {util} from '../assets/js/util'
  export default {
    template: '.share-page',
    data: function () {
        return {
          selectedTab:{value: '参赛队伍', key: 'queue'},
          tabList:[
            {value: '参赛队伍', key: 'queue',num:0},
            {value: '本队人数', key: 'queuePeople',num:0},
            {value: '支持人数', key: 'supportPeople',num:0},
          ],
          isCount:true,
          matchHandler:{},
          countObj:{},
          crowdFundOrder:{},
          selfTeamList:{},
          selfShow:false,
          supportList:{},
          supportShow:false
        };
    },
    computed: {
      ...mapGetters([
        'getBaseUrl',
        'getSelectRoute'
      ])
    },
    components: {houseHead, houseSort},
    methods: {
      init() {
        this.getMatchHandler();
        this.getCrowdFundOrderHandler();
        this.getCount();
        this.getSelfTeamList();
        this.getSupportList();
      },
      tabClick (tab) {
        this.selectedTab = tab;
      },
      getMatchHandler () {
        let jsoncontent ={
          condition:[
            {
              key:'MId',
              values:'1267615014C24B7AAD75573355975BFE',
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
          }
          else {

          }
        });
      },
      getCrowdFundOrderHandler () {
        let jsoncontent ={
          condition:[
            {"key":"CId","values":"37D072C9F0BB4044AE061DD52C9673E9","oprate":"="},
            {"key":"MId","values":"F689820F66C94B33AA04ED0D3E9BCA74","oprate":"="}
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
          res.data={"result":0,"message":"","data":[{"Unfinished":"473.0","SmallImgUrl":"ueditor/net/upload/image/20180715/6366727671960796523812055.gif","FirstImgUrl":"ueditor/net/upload/image/20180715/6366727671768523272898970.gif","headimgurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/8fC42gYUBu8eSQq4VXecGjRFoO4rrCeWM9kiaEeYZt6iavQvJFE465kyFheqBiaKhUibUYjJbE1DgC77dpH7mCNtJw/132","Declaration":"","MName":"王瑞锡赛事","Rate":"5.4%","Price":"500.00","Sumprice":"27.00","NickName":"王国壮","Id":1,"CId":"37D072C9F0BB4044AE061DD52C9673E9","MId":"F689820F66C94B33AA04ED0D3E9BCA74","UserName":"姓名","openid":"ol7xB1grgNlrobJfBQEKMRFEMrVY","BeginTime":"2018-06-25 00:04:08"}]};
          if (res.data.result == 0) {
            console.log('crowdFundOrder',res.data);
            this.crowdFundOrder = res.data.data[0]|| {};
          }
          else {

          }
        });
      },
      getCount(){
        let jsoncontent ={
          condition:[
            {"key":"openid","values":"ol7xB1grgNlrobJfBQEKMRFEMrVY","oprate":"="},
            {"key":"MId","values":"F689820F66C94B33AA04ED0D3E9BCA74","oprate":"="}
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
          res.data={"result":0,"message":"","data":[{"openid":"ol7xB1grgNlrobJfBQEKMRFEMrVY","MId":"F689820F66C94B33AA04ED0D3E9BCA74","TeamCount":"2","TheTeamCount":"2","SupportCount":"2"}]};
          if (res.data.result == 0) {
            console.log('countObj',res.data);
            this.countObj = res.data.data[0];
            this.tabList[0].num=res.data.data[0].TeamCount;
            this.tabList[1].num=res.data.data[0].TheTeamCount;
            this.tabList[2].num=res.data.data[0].SupportCount;
          }
          else {

          }
        });
      },
      getSelfTeamList(){
        let jsoncontent ={
          condition:[
            {"key":"openid","values":"ol7xB1grgNlrobJfBQEKMRFEMrVY","oprate":"="},
            {"key":"MId","values":"F689820F66C94B33AA04ED0D3E9BCA76","oprate":"="}
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
          res.data={"result":0,"message":"","data":[{"CId":"37D072C9F0BB4044AE061DD52C9673E9","MId":"F689820F66C94B33AA04ED0D3E9BCA74","TId":"A55C5A5A1B8F4DAB9EF2EB48ED6FCFD0","Id":1,"UId":"8FD79AF0A4D247CD83B7DBE6C88AB0CC","unionid":"","openid":"ol7xB1grgNlrobJfBQEKMRFEMrVY","username":"姓名","nickname":"王国壮","sex":0,"age":32,"country":"中国","province":"北京","city":"海淀","district":"","street":"","headimgurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/8fC42gYUBu8eSQq4VXecGjRFoO4rrCeWM9kiaEeYZt6iavQvJFE465kyFheqBiaKhUibUYjJbE1DgC77dpH7mCNtJw/132","birthday":"","phone":"联系电话","password":"","subscribe_time":"2018/6/6 22:22:29","unsubscribe_time":"","is_bindcard":0,"substatus":0,"createtime":"2018-07-24 20:07:47","timestamp":"2018-07-24 20:07:47","areacode":"","areausercode":"","signature":"","position":"","company":"","remark":"","Del":0},{"CId":"B0482EFB7E91495AB410147BF851A26D","MId":"F689820F66C94B33AA04ED0D3E9BCA74","TId":"A8AEA2803D2E4E42951B7689A3C71A91","Id":1,"UId":"8FD79AF0A4D247CD83B7DBE6C88AB0CC","unionid":"","openid":"ol7xB1grgNlrobJfBQEKMRFEMrVY","username":"姓名","nickname":"王国壮","sex":0,"age":32,"country":"中国","province":"北京","city":"海淀","district":"","street":"","headimgurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/8fC42gYUBu8eSQq4VXecGjRFoO4rrCeWM9kiaEeYZt6iavQvJFE465kyFheqBiaKhUibUYjJbE1DgC77dpH7mCNtJw/132","birthday":"","phone":"联系电话","password":"","subscribe_time":"2018/6/6 22:22:29","unsubscribe_time":"","is_bindcard":0,"substatus":0,"createtime":"2018-07-24 20:07:47","timestamp":"2018-07-24 20:07:47","areacode":"","areausercode":"","signature":"","position":"","company":"","remark":"","Del":0}]};
          if (res.data.result == 0) {
            console.log('selfTeamList',res.data.data);
            this.selfTeamList = res.data.data;
            this.selfTeamList = this.selfTeamList.concat(this.selfTeamList).concat(this.selfTeamList);
            this.selfTeamList = this.selfTeamList.concat(this.selfTeamList).concat(this.selfTeamList);
            this.selfTeamList = this.selfTeamList.concat(this.selfTeamList).concat(this.selfTeamList);
          }
          else {

          }
        });
      },
      getSupportList(){
        let jsoncontent ={
          condition:[
            {"key":"openid","values":"ol7xB1grgNlrobJfBQEKMRFEMrVY","oprate":"="},
            {"key":"MId","values":"F689820F66C94B33AA04ED0D3E9BCA77","oprate":"="}
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
          res.data={"result":0,"message":"","data":[{"CSId":"5AB7A21D58CA4BE69256F45A083D5627","CId":"37D072C9F0BB4044AE061DD52C9673E9","MId":"F689820F66C94B33AA04ED0D3E9BCA74","Price":12.00,"Msg":"","ReplyMsg":"","CreateTime":"2018-06-25 00:05:28","Id":1,"UId":"8FD79AF0A4D247CD83B7DBE6C88AB0CC","unionid":"","openid":"ol7xB1grgNlrobJfBQEKMRFEMrVY","username":"姓名","nickname":"王国壮","sex":0,"age":32,"headimgurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/8fC42gYUBu8eSQq4VXecGjRFoO4rrCeWM9kiaEeYZt6iavQvJFE465kyFheqBiaKhUibUYjJbE1DgC77dpH7mCNtJw/132","phone":"联系电话","createtime":"2018-06-25 00:05:28"},{"CSId":"91418AF81E7743FB801066E037099EC3","CId":"37D072C9F0BB4044AE061DD52C9673E9","MId":"F689820F66C94B33AA04ED0D3E9BCA74","Price":15.00,"Msg":"","ReplyMsg":"","CreateTime":"2018-06-25 00:05:58","Id":1,"UId":"8FD79AF0A4D247CD83B7DBE6C88AB0CC","unionid":"","openid":"ol7xB1grgNlrobJfBQEKMRFEMrVY","username":"姓名","nickname":"王国壮","sex":0,"age":32,"headimgurl":"http://thirdwx.qlogo.cn/mmopen/vi_32/8fC42gYUBu8eSQq4VXecGjRFoO4rrCeWM9kiaEeYZt6iavQvJFE465kyFheqBiaKhUibUYjJbE1DgC77dpH7mCNtJw/132","phone":"联系电话","createtime":"2018-06-25 00:05:58"}]};
          if (res.data.result == 0) {
            console.log('supportList',res.data.data);
            this.supportList = res.data.data;
            this.supportList = this.supportList.concat(this.supportList);
            this.supportList = this.supportList.concat(this.supportList);
          }
          else {

          }
        });
      },
      jumpSelfSupport () {//跳转至自己支持付款页面
        this.$router.push('/selfSupport');
      },
      jumpHelpPay () {
        //this.$router.push('/myCrowd');
      },
      jumpMyCrowd () {//跳转至我的众筹
        this.$router.push('/main/myCrowd');
      },
      jumpSharePage (userInfo) {
        this.$router.push('/sharePage/'+userInfo.MId)
      },
    },
    mounted: function () {
        this.init()
    }
  };
</script>
<style lang="less">
    @import './../assets/less/share-page.less';
</style>
