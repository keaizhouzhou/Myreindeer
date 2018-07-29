<template>
    <div class="safe-state">
      <!--<houseHead>安全声明</houseHead>-->
      <div class="content">
        <p>安全声明文案安全声明文案安全声明文案安全声明文案安全声明文案安全声明文案安全声明文案安全声明文案安全声明文案安全声明文案</p>
        <p>安全声明文案安全声明文案安全声明文案安全声明文案安全声明文案安全声明文案安全声明文案安全声明文案安全声明文案安全声明文案</p>
        <p>安全声明文案安全声明文案安全声明文案安全声明文案安全声明文案安全声明文案安全声明文案安全声明文案安全声明文案安全声明文案</p>
      </div>
      <houseBtn title="我同意，现在去报名" ></houseBtn>
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
      template: '.safe-state',
      data: function () {
          return {
            errorMessage: '',
            isHide: true,
            titleShow: true
          };
      },
      computed: {
        ...mapGetters([
          'getBaseUrl',
          'getSelectRoute'
        ])
      },
      components: {houseBtn,houseHead},
      methods: {
        init() {
          window.changeTitle('安全声明');
        },
        ...mapActions([
          'changeRoute'
        ])
      },
      mounted: function () {
        this.init()
      }
  };
</script>
<style lang="less" >
    @import './../assets/less/safeState';
</style>
