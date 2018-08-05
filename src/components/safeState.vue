<template>
    <div class="safe-state">
      <!--<houseHead>安全声明</houseHead>-->
      <div class="content" v-html="Describe">
      </div>
      <houseBtn title="我同意，现在去报名" @toSave="toSave"></houseBtn>
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
            titleShow: true,
            Describe:''
          };
      },
      computed: {
        ...mapGetters([
          'getBaseUrl',
          'getSelectRoute',
          'getOpenId'
        ])
      },
      components: {houseBtn,houseHead},
      methods: {
        toSave () {//
          console.log(3333)
        },
        getContent () { // 支持
          let data = {
            data:{
              Action:'getmodel'
            },
            url:this.getBaseUrl + 'CommonHandler/SecurityStatementHandler.ashx'
          };
          util.fetchData (data).then(res => {
            if (res.data.result == 0) {
              this.Describe = res.data.data.Describe
            }
            else {

            }
          });
        },
        init() {
          this.getContent();
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
