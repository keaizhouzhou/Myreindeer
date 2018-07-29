<template>
    <div class="self-support">
      <houseHead v-if="dev">活动名称</houseHead>
      <div class="content">
        <p>自己支持（元）</p>
        <div class="pay_content">
          ￥<input type="number" ng-model="">
        </div>
        <p>当前最多可支持8888.8元</p>
      </div>
      <houseBtn title="确认付款"></houseBtn>
    </div>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex';
  import houseBtn from './common/house-btn.vue';
  import houseHead from './common/house-head.vue';
  import houseToast from './common/house-toast.vue';
  import houseSelect from './common/house-select.vue';
  import houseInput from './common/house-input.vue';
  import {util} from '../assets/js/util'
  export default {
      template: '.self-support',
      data: function () {
          return {
            dev:true,
            errorMessage: '',
            isHide: true,
            titleShow: true
          };
      },
      computed: {
        ...mapGetters([
          'getBaseUrl',
          'getSelectRoute',
          'getUserInfo',
          'getDev'
        ])
      },
      components: {houseBtn,houseHead},
      methods: {
        init() {
          this.dev=this.getDev;
          if( !this.dev ) window.changeTitle('活动名称');
        },
        ...mapActions([
          'changeRoute'
        ]),
        payMoney() {

        }
      },
      mounted: function () {
          this.init()
      }
  };
</script>
<style lang="less" >
    @import './../assets/less/selfSupport';
</style>
