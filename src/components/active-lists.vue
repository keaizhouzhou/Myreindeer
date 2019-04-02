<template>
    <div class="active-lists">
      <!--<houseHead>活动列表</houseHead>-->
      <div class="home-item"  v-for="(match,index) in matchLists" @click="jumpActiveDetail(match)">
        <img class="item-image" :src="getBaseUrl + match.SmallImgUrl" alt="">
        <div class="item-des">
          <div class="tittle">{{match.MName}}</div>
          <!--<div class="text">{{match.CreateTime | timeSplit}}~{{match.CrowdFundEndTime | timeSplit}}</div>-->
          <div class="text">{{match.MatchBeingTime | timeSplit}}~{{match.MatchEndTime | timeSplit}}</div>
          <div class="price">{{match.Price?`￥${match.Price}`:`￥0`}}</div>
        </div>
        <div class="arrow"></div>
      </div>
    </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import houseBtn from './common/house-btn.vue';
  import houseHead from './common/house-head.vue';
  import {util} from '../assets/js/util'
  export default {
    template: '.active-lists',
    data: function () {
        return {
          errorMessage: '',
          isHide: true,
          titleShow: true,
          dywFinish: false,
          glrFinish: false,
          jkxqFinish: false,
          disabled: true,
          batchApplyId: '',
          matchLists:[]
        };
    },
    computed: {
      ...mapGetters([
        'getBaseUrl',
        'getSelectRoute'
      ])
    },
    components: {houseBtn, houseHead},
    methods: {
      jumpActiveDetail (match) {
        this.$router.push('/activeDetail/'+match.MId + '/false')
      },
      getMatchList () { // 获取赛事页面
        let jsoncontent ={
          condition:[
            {
              key:'RId',
              values:this.getSelectRoute.RId,
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
            this.matchLists = res.data.data;
          }
          else {

          }
        });
      },
      init () {
        this.getMatchList();
        window.changeTitle('赛事列表');
      }
    },
    mounted: function () {
        this.init()
    }
  };
</script>
<style lang="less">
    @import './../assets/less/active-lists.less';
</style>
