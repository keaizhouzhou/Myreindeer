<template>
    <div class="share-page">
      <houseHead>分享页</houseHead>
      <div class="img-information">
        <div class="logo">
          <div class="logo-text">
            <div class="text">
              花花超人的众筹
            </div>
            <div class="times">
              06月07日 13：56发起
            </div>
          </div>
        </div>
        <div class="portrait"></div>
        <div class="crowdSate">
          <div class="text">众筹即将成功，改购买装备了</div>
          <div class="progress-parent">
            <div class="icon">50%</div>
            <div class="progress-child"></div>
          </div>
          <div class="money">还差12799.99元</div>
        </div>
        <div class="activeInformation">
          <div class="fill-color"></div>
          <div class="home-item">
            <div class="item-des">
              <div class="tittle">2018第一届驯鹿丝绸路108城市戈壁挑战赛</div>
              <div class="expense">报名费用：<span style="color: red;">9999.00元</span></div>
            </div>
            <div class="item-image"></div>
          </div>
        </div>
        <div class="contentClass">
          <houseSort :tabList="tabList" @tabClick="tabClick ($event)" :isCount="isCount"></houseSort>
          <div v-if="showIndex == 1" class="queuepeople_content contentPeople">
            <div class="people"></div>
            <div class="people"></div>
            <div class="people"></div>
            <div class="people"></div>
            <div class="people"></div>
            <div class="more">
              <span class="text">更多</span>
              <span class="icon">></span>
            </div>
            <div class="people"></div>
            <div class="people"></div>
            <div class="people"></div>
          </div>
          <div v-if="showIndex == 2" class="supportpeople_content contentPeople">
            <div class="people"></div>
            <div class="people"></div>
            <div class="people"></div>
            <div class="people"></div>
            <div class="people"></div>
            <div class="more">
              <span class="text">更多</span>
              <span class="icon">></span>
            </div>
          </div>
          <div class="queue_content">
            <p>已有 <span>50</span>人支持</p>
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
        <div class="selfPay" @click="jumpSelfPay">自己支持</div>
        <div class="helpPay" @click="jumpHelpPay">找人帮我筹</div>
        <div class="myCrowd" @click="jumpMyCrowd">我的众筹</div>
      </div>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import houseHead from './common/house-head.vue';
  import houseSort from './common/house-sort.vue';
  export default {
    template: '.share-page',
    data: function () {
        return {
          tabList:[
            {value: '参赛队伍', key: 'queue',index:0},
            {value: '本队人数', key: 'queuePeople',index:1},
            {value: '支持人数', key: 'supportPeople',index:2},
          ],
          isCount:true,
          showIndex:0
        };
    },
    computed: {},
    components: {houseHead, houseSort},
    methods: {
      init() {

      },
      tabClick (tab) {
        this.selectedTab = tab;
        this.showIndex = tab.index;
      },
      jumpSelfPay () {//跳转至自己支持付款页面
        //this.$router.push('/payOrder');
      },
      jumpHelpPay () {//跳转至我的众筹
        //this.$router.push('/orderCrowd');
      },
      jumpMyCrowd () {

      }
    },
    mounted: function () {
        this.init()
    }
  };
</script>
<style lang="less">
    @import './../assets/less/share-page.less';
</style>
