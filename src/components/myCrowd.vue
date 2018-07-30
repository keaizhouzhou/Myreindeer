<template>
  <div class="myCrowd">
    <!--<houseHead>我的众筹</houseHead>-->
    <houseSort :tabList="tabList" @tabClick="tabClick ($event)"></houseSort>
    <div class="content">
      <div v-if="selectedTab.key == 'crowding'">
        <div class="itemWrap" v-for="(item,index) in crowdingItems">
          <div class="home-item">
            <div class="item-image"
                 :style="{background:'url('+getBaseUrl+item.SmallImgUrl+')' ,backgroudSize:'cover'}"></div>
            <div class="item-des">
              <div class="tittle">{{item.MName}}</div>
              <div class="price">￥{{item.Price}}</div>
              <div class="progress-parent">
                <div class="icon">{{item.Rate}}</div>
                <div class="progress-child" :style="{width:item.Rate}"></div>
              </div>
              <div class="need_price">还差{{item.Unfinished}}元</div>
            </div>
          </div>
          <div class="btns">
            <div class="myself_support" @click="jumpSelfSupport" v-if="item.State == 0">自己支持</div>
            <div class="go_crowd" @click="jumpSharePage" v-if="item.State == 0">去众筹</div>
            <div class="write_message" v-if="item.State == 1" @click="goInfo()">填写报名信息</div>
            <div class="deposit" v-if="item.State == 2" @click="payLast()">补齐尾款</div>
          </div>
        </div>
      </div>
      <div v-if="selectedTab.key == 'successful'">
        <div class="itemWrap" v-for="(item,index) in successfulItems">
          <div class="home-item">
            <div class="item-image"
                 :style="{background:'url('+getBaseUrl+item.SmallImgUrl+')' ,backgroudSize:'cover'}"></div>
            <div class="item-des">
              <div class="tittle">{{item.MName}}</div>
              <div class="price">￥{{item.Price}}</div>
              <div class="progress-parent">
                <div class="icon">{{item.Rate}}</div>
                <div class="progress-child" :style="{width:item.Rate}"></div>
              </div>
              <div class="need_price">还差{{item.Unfinished}}元</div>
            </div>
          </div>
          <div class="btns">
            <div class="myself_support" @click="jumpSelfSupport" v-if="item.State == 0">自己支持</div>
            <div class="go_crowd" @click="jumpSharePage" v-if="item.State == 0">去众筹</div>
            <div class="write_message" v-if="item.State == 1" @click="goInfo()">填写报名信息</div>
            <div class="deposit" v-if="item.State == 2" @click="payLast()">补齐尾款</div>
          </div>
        </div>
      </div>
      <div v-if="selectedTab.key == 'failure'">
        <div class="itemWrap" v-for="(item,index) in failureItems">
          <div class="home-item">
            <div class="item-image"
                 :style="{background:'url('+getBaseUrl+item.SmallImgUrl+')' ,backgroudSize:'cover'}"></div>
            <div class="item-des">
              <div class="tittle">{{item.MName}}</div>
              <div class="price">￥{{item.Price}}</div>
              <div class="progress-parent">
                <div class="icon">{{item.Rate}}</div>
                <div class="progress-child" :style="{width:item.Rate}"></div>
              </div>
              <div class="need_price">还差{{item.Unfinished}}元</div>
            </div>
          </div>
          <div class="btns">
            <div class="myself_support" @click="jumpSelfSupport" v-if="item.State == 0">自己支持</div>
            <div class="go_crowd" @click="jumpSharePage" v-if="item.State == 0">去众筹</div>
            <div class="write_message" v-if="item.State == 1" @click="goInfo()">填写报名信息</div>
            <div class="deposit" v-if="item.State == 2" @click="payLast()">补齐尾款</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import houseBtn from './common/house-btn.vue';
  import houseHead from './common/house-head.vue';
  import houseSort from './common/house-sort.vue';
  import {util} from '../assets/js/util';

  export default {
    template: '.myCrowd',
    data: function () {
      return {
        selectedTab: {value: '进行中', key: 'crowding'},
        tabList: [
          {value: '进行中', key: 'crowding'},
          {value: '成功', key: 'successful'},
          {value: '失败', key: 'failure'}
        ],
        crowdingItems: [],
        successfulItems: [],
        failureItems: []
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
        window.changeTitle('我的众筹');
        this.getCrowding();
      },
      tabClick(tab) {
        this.selectedTab = tab;
        let {key = ''} = tab;
        if (key == 'crowding') {
          this.getCrowding()
        }
        else if (key == 'successful') {
          this.getSuccessfulItems()
        }
        else if (key == 'failure') {
          this.getFailureItems();
        }
      },
      jumpSelfSupport() {
        this.$router.push('/selfSupport');
      },
      jumpSharePage() {
        this.$router.push('/sharePage');
      },
      goInfo() {
      },
      payLast() {
      },
      getCrowding() { // 获取正在众筹
        let jsoncontent = {
          condition: [
            {
              key: 'openid',
              values: "ol7xB1grgNlrobJfBQEKMRFEMrVY",
              oprate: '='
            },
            {"key": "State", "values": "0", "oprate": "="}
          ]
        };
        let data = {
          data: {
            Action: 'getlistwxpersondetail',
            jsoncontent: JSON.stringify(jsoncontent)
          },
          url: this.getBaseUrl + 'CommonHandler/CrowdFundOrderHandler.ashx'
        };
        util.fetchData(data).then(res => {
          if (res.data.result == 0) {
            console.log('data', res.data);
            this.crowdingItems = [
              {
                "Id": 1,
                "CId": "37D072C9F0BB4044AE061DD52C9673E9",
                "MId": "F689820F66C94B33AA04ED0D3E9BCA74",
                "UserName": "姓名",
                "openid": "ol7xB1grgNlrobJfBQEKMRFEMrVY",
                "BeginTime": "2018-06-25 00:04:08",
                "Unfinished": "473.0",
                "SmallImgUrl": "ueditor/net/upload/image/20180715/6366727671960796523812055.gif",
                "FirstImgUrl": "ueditor/net/upload/image/20180715/6366727671768523272898970.gif",
                "headimgurl": "http://thirdwx.qlogo.cn/mmopen/vi_32/8fC42gYUBu8eSQq4VXecGjRFoO4rrCeWM9kiaEeYZt6iavQvJFE465kyFheqBiaKhUibUYjJbE1DgC77dpH7mCNtJw/132",
                "Declaration": "",
                "State": 0,
                "MName": "王瑞锡赛事",
                "Rate": "5.4%",
                "Price": "500.00",
                "Sumprice": "27.00",
                "NickName": "王国壮"
              }
            ];
          }
          else {

          }
        });
      },
      getSuccessfulItems() {
        let jsoncontent = {
          condition: [
            {
              key: 'openid',
              values: "ol7xB1grgNlrobJfBQEKMRFEMrVY",
              oprate: '='
            },
            {"key": "State", "values": "1", "oprate": "="}
          ]
        };
        let data = {
          data: {
            Action: 'getlistwxpersondetail',
            jsoncontent: JSON.stringify(jsoncontent)
          },
          url: this.getBaseUrl + 'CommonHandler/CrowdFundOrderHandler.ashx'
        };
        util.fetchData(data).then(res => {
          if (res.data.result == 0) {
            console.log('data', res.data);
            this.successfulItems = [
              {
                "Id": 1,
                "CId": "37D072C9F0BB4044AE061DD52C9673E9",
                "MId": "F689820F66C94B33AA04ED0D3E9BCA74",
                "UserName": "姓名",
                "openid": "ol7xB1grgNlrobJfBQEKMRFEMrVY",
                "BeginTime": "2018-06-25 00:04:08",
                "Unfinished": "0",
                "SmallImgUrl": "ueditor/net/upload/image/20180715/6366727671960796523812055.gif",
                "FirstImgUrl": "ueditor/net/upload/image/20180715/6366727671768523272898970.gif",
                "headimgurl": "http://thirdwx.qlogo.cn/mmopen/vi_32/8fC42gYUBu8eSQq4VXecGjRFoO4rrCeWM9kiaEeYZt6iavQvJFE465kyFheqBiaKhUibUYjJbE1DgC77dpH7mCNtJw/132",
                "Declaration": "",
                "State": 1,
                "MName": "王瑞锡赛事",
                "Rate": "100%",
                "Price": "500.00",
                "Sumprice": "500.00",
                "NickName": "王国壮"
              }
            ];
          }
          else {

          }
        });
      },
      getFailureItems() {
        let jsoncontent = {
          condition: [
            {
              key: 'openid',
              values: "ol7xB1grgNlrobJfBQEKMRFEMrVY",
              oprate: '='
            },
            {"key": "State", "values": "2", "oprate": "="}
          ]
        };
        let data = {
          data: {
            Action: 'getlistwxpersondetail',
            jsoncontent: JSON.stringify(jsoncontent)
          },
          url: this.getBaseUrl + 'CommonHandler/CrowdFundOrderHandler.ashx'
        };
        util.fetchData(data).then(res => {
          if (res.data.result == 0) {
            console.log('data', res.data);
            this.failureItems = [
              {
                "Id": 1,
                "CId": "37D072C9F0BB4044AE061DD52C9673E9",
                "MId": "F689820F66C94B33AA04ED0D3E9BCA74",
                "UserName": "姓名",
                "openid": "ol7xB1grgNlrobJfBQEKMRFEMrVY",
                "BeginTime": "2018-06-25 00:04:08",
                "Unfinished": "100.00",
                "SmallImgUrl": "ueditor/net/upload/image/20180715/6366727671960796523812055.gif",
                "FirstImgUrl": "ueditor/net/upload/image/20180715/6366727671768523272898970.gif",
                "headimgurl": "http://thirdwx.qlogo.cn/mmopen/vi_32/8fC42gYUBu8eSQq4VXecGjRFoO4rrCeWM9kiaEeYZt6iavQvJFE465kyFheqBiaKhUibUYjJbE1DgC77dpH7mCNtJw/132",
                "Declaration": "",
                "State": 2,
                "MName": "王瑞锡赛事",
                "Rate": "80%",
                "Price": "500.00",
                "Sumprice": "400.00",
                "NickName": "王国壮"
              }
            ];
          }
          else {

          }
        })
      },
    },

    mounted: function () {
      this.init()
    }
  };
</script>
<style lang="less">
  @import './../assets/less/myCrowd.less';
</style>
