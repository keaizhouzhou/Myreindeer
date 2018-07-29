<template>
    <div class="support_pay">
      <!--<houseHead>给他支持付款页</houseHead>-->
      <div class="support_info">
        <p>支持他：</p>
        <img src="../assets/images/img.jpg" alt="" class="user_img">
        <div class="user_name">昵称昵称</div>
        <div class="user_desc">
          <input v-if="isEditDesc" type="text" value="" v-model="userDesc" v-on:blur="isEditDesc=!isEditDesc;">
          <div v-if="!isEditDesc">{{userDesc}}</div>
          <i v-if="!isEditDesc" @click="isEditDesc=!isEditDesc;"></i>
        </div>
      </div>
      <div class="pay_info">
        <div class="pay_user">
          付款人：<span>芳芳</span><i></i>
        </div>
        <div class="pay_price">
          付款金额：<input type="text" class="price" v-model="defaultPrice">
        </div>
        <ul class="price_list">
          <li @click="defaultPrice=price" :class="{checked:defaultPrice==price}" v-for="price in priceList">￥{{price}}</li>
        </ul>
      </div>
      <div class="confirm_btn">确认付款</div>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import houseHead from './common/house-head.vue';
  import houseSort from './common/house-sort.vue';
  export default {
    template: '.support_pay',
    data: function () {
        return {
          userDesc:"人生就是走好每一步，等你圆满归来。",
          isEditDesc:false,
          priceList:[66,108,199,520,999],
          defaultPrice:199
        };
    },
    computed: {},
    components: {houseHead, houseSort},
    methods: {
      init() {
        window.changeTitle('给他支持付款页');
      },
      tabClick (tab) {
        this.selectedTab = tab;
        this.showIndex = tab.index;
      },
      jumpSupportHim () {
        //this.$router.push('/payOrder');
      },
      jumpToCrowd () {
        this.$router.push('/orderCrowd');
      }
    },
    mounted: function () {
        this.init()
    }
  };
</script>
<style lang="less">
    @import './../assets/less/supportHimToPay.less';
</style>
