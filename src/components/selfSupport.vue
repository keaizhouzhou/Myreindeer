<template>
    <div class="self-support">
      <!--<houseHead>活动名称</houseHead>-->
      <div class="content">
        <p>自己付款（元）</p>
        <div class="pay_content">
          ￥<input type="number" v-model.number="paynum" @input="checkMax" >
        </div>
        <p>支付金额{{lastPrice}}元</p>
      </div>
      <houseBtn title="确认付款" @toSave="goPay"></houseBtn>
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
            errorMessage: '',
            isHide: true,
            titleShow: true,
            lastPrice:null,
            paynum:0
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
        checkMax () {
          if (this.lastPrice < this.paynum) {
            this.paynum = 0;
          }
        },
        saveOrder () {
          let jsoncontent ={
            "field": {
              "CId": this.$route.params.CId,
              "UserId": this.getOpenId || '',
              "Price": this.paynum || '',
              "Msg": ''
            }
          } ;
          let data = {
            data:{
              Action:'adddata',
              jsoncontent:JSON.stringify(jsoncontent)
            },
            url:this.getBaseUrl + 'CommonHandler/CrowdFundOrderSupportHandler.ashx'
          };
          util.fetchData (data).then(res => {
            if (res.data.result == 0) {
              this.$router.go(-1);
            }
            else {}
          });
        },
        init() {
          this.lastPrice = this.$route.params.price;
          this.paynum=this.$route.params.price;
        },
        ...mapActions([
          'changeRoute'
        ]),
        resiveState(OId) { // 修改订单状态
          let jsoncontent = {
            "field": {
              "State": "1"
            },
            "condition":
              [{"key": "OId", "values": OId, "oprate": "="}]
          };
          let data = {
            data: {
              Action: 'UpdateData',
              jsoncontent: JSON.stringify(jsoncontent)
            },
            url: this.getBaseUrl + 'CommonHandler/OrderHandler.ashx'
          };
          util.fetchData(data).then(res => {
            if (res.data.result == 0) {
              this.getUnComplete(); // 获取未完成的订单
            }
            else {
            }
          })
        },
        goPay() {
          console.log('sdsdsdsd,gopay')
          let totalPrice = this.paynum;
          let vm = this;
          let data = {
            data: {
              total_fee: totalPrice * 100,
              openid: this.getOpenId
            },
            url: '../../CommonHandler/APIHandler.ashx?Action=getjsapiparameters'
          };
          util.fetchData(data).then(res => {
            if (res.data.result == 0) {
              //公众号支付
              WeixinJSBridge.invoke(
                'getBrandWCPayRequest',
                JSON.parse(res.data.data),
                function (response) {
                  if (response.err_msg == "get_brand_wcpay_request:ok") { // 支付成功
                    // 如果告诉后台 那个众筹 支持了多少
                   // vm.resiveState(OId)
                    vm.saveOrder()
                  }
                  else if (response.err_msg == "get_brand_wcpay_request:cancel") {
                    alert("您放弃了支付");
                  } else {
                    alert("支付失败,请稍后重试！如果收到支付通知，切勿重复支付！");
                  }
                });
            }
            else {
            }
          });
        },
      },
      mounted: function () {
          this.init()
      }
  };
</script>
<style lang="less" >
    @import './../assets/less/selfSupport';
</style>
