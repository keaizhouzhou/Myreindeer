<template>
  <div class="myCrowd">
    <houseHead>我的众筹</houseHead>
    <houseSort :tabList="tabList" @tabClick="tabClick ($event)"></houseSort>
    <div class="content">
      <div v-if="selectedTab.key == 'crowding'">
        <div class="itemWrap">
          <div class="home-item">
            <div class="item-image"></div>
            <div class="item-des">
              <div class="tittle">2018第一届驯鹿丝绸路108城市戈壁挑战赛</div>
              <div class="price">￥12999.0</div>
              <div class="progress-parent">
                <div class="icon">50%</div>
                <div class="progress-child"></div>
              </div>
              <div class="need_price">还差10000.00元</div>
            </div>
          </div>
          <div class="btns">
            <div class="myself_support" @click="jumpSelfSupport">自己支持</div>
            <div class="go_crowd" @click="jumpSharePage">去众筹</div>
          </div>
        </div>
        <div class="itemWrap">
          <div class="home-item">
            <div class="item-image"></div>
            <div class="item-des">
              <div class="tittle">2018第一届驯鹿丝绸路108城市戈壁挑战赛</div>
              <div class="price">￥12999.0</div>
              <div class="progress-parent">
                <div class="icon">50%</div>
                <div class="progress-child"></div>
              </div>
              <div class="need_price">还差10000.00元</div>
            </div>
          </div>
          <div class="btns">
            <div class="myself_support" @click="jumpSelfSupport">自己支持</div>
            <div class="go_crowd" @click="jumpSharePage">去众筹</div>
          </div>
        </div>
      </div>
      <div v-if="selectedTab.key == 'successful'">
        <div class="itemWrap">
          <div class="home-item">
            <div class="item-image"></div>
            <div class="item-des">
              <div class="tittle">2018第一届驯鹿丝绸路108城市戈壁挑战赛</div>
              <div class="price">￥12999.0</div>
              <div class="progress-parent">
                <div class="icon">100%</div>
                <div style="width: 100%;" class="progress-child"></div>
              </div>
              <div class="need_price">还差10000.00元</div>
            </div>
          </div>
          <div class="btns">
            <div class="write_message">填写报名信息</div>
          </div>
        </div>
      </div>
      <div v-if="selectedTab.key == 'failure'">
        <div class="itemWrap">
          <div class="home-item">
            <div class="item-image"></div>
            <div class="item-des">
              <div class="tittle">2018第一届驯鹿丝绸路108城市戈壁挑战赛</div>
              <div class="price">￥12999.0</div>
              <div class="progress-parent">
                <div class="icon">50%</div>
                <div class="progress-child"></div>
              </div>
              <div class="need_price">还差10000.00元</div>
            </div>
          </div>
          <div class="btns">
            <div class="deposit">补齐尾款</div>
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
  export default{
    template: '.myCrowd',
    data: function () {
      return {
        selectedTab:{value: '进行中', key: 'crowding'},
        tabList:[
          {value: '进行中', key: 'crowding'},
          {value: '成功', key: 'successful'},
          {value: '失败', key: 'failure'}
        ]
      };
    },
    computed: {
    },
    components: { houseHead, houseBtn, houseSort},
    methods: {
      init () {

      },
      tabClick (tab) {
        this.selectedTab = tab;
      },
      jumpSelfSupport (){
        this.$router.push('/selfSupport');
      },
      jumpSharePage (){
        this.$router.push('/sharePage');
      }
    },
    mounted: function () {
      this.init()
    }
  };
</script>
<style lang="less">
  @import './../assets/less/myCrowd.less';
</style>
