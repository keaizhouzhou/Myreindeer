<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {util} from './assets/js/util'
  import { mapGetters} from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'getBaseUrl'
    ])
  },
  methods:{
    getJsdk () {
      let data = {
        data:{
          Action:'getweixinjsapiconfig',
          url:encodeURIComponent(location.href.split('#')[0])
        },
        url:this.getBaseUrl + 'CommonHandler/APIHandler.ashx'
      };
      util.fetchData (data).then(res => {
        console.log('jssdk',res.data.data);
        const _jsApiList = ["checkJsApi","onMenuShareTimeline","onMenuShareAppMessage","closeWindow","chooseImage","previewImage","uploadImage","downloadImage"];
        let config = res.data.data;
        config.jsApiList = _jsApiList;
        wx.config(config);
        wx.ready(function(){
          //alert('jsdk加载成功')

        })
      });
    }
  },
  created () {
    document.addEventListener('WeixinJSBridgeReady', function () {
      console.log('支付监听成')
    },false)
    this.getJsdk();
  }
}
</script>

<style>
  body{
    margin: 0;
    background-color: #f7f7f7;
    font-family: "Microsoft YaHei!important;"
  }
</style>
