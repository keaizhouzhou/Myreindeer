<template>
    <div class="save-explain">
        <div class="text" v-html="Describe" v-if="Describe"></div>
      <div class="btn" @click="agree"></div>
    </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex';
  import {util} from '../assets/js/util'
  export default {
    template: '.save-explain',
    data: function () {
        return {
          Describe:''
        };
    },
    computed: {
      ...mapGetters([
      'getBaseUrl',
      'getSelectRoute',
      'getOpenId'
    ])},
    components: {},
    methods: {
      init() {

      },
      agree(){

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
      }
    },
    mounted: function () {
        this.init()
    }
  };
</script>
<style lang="less">
    @import './../assets/less/save-explain.less';
</style>
