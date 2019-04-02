// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'lib-flexible/flexible';
import wx from 'weixin-js-sdk'
window.changeTitle = function (title) {
  document.title = title;
  let i = document.createElement('iframe');
  i.src = '//m.baidu.com/favicon.ico';
  i.style.display = 'none';
  i.onload = function() {
    setTimeout(function(){
      i.remove();
    }, 9)
  }
  document.body.appendChild(i);
};
window.wx = wx;
Vue.config.productionTip = false;
Vue.filter("timeSplit", function(value) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
  return value.split(' ')[0];
});
Vue.filter('orderState',function (value) {
  if (value == 0) {
    return '待支付'
  }
  else if (value == 1) {
    return '已完成'
  }
  else if (value == 2) {

  }
})
Vue.filter('leftTime',function ([timeS, timeE] = arr) {

})
Vue.filter("remain", function([timeS,timeE] = arr) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
  let timeCounts = new Date(timeS) - new Date(timeE);
  let days = timeCounts/(1000*60*60*24);
  let hours = (timeCounts - Math.floor(days)*(1000*60*60*24))/(1000*60*60);
  let minute = (timeCounts - Math.floor(days)*(1000*60*60*24) - Math.floor(hours)*(1000*60*60))/(1000*60);
  let second = (timeCounts - Math.floor(days)*(1000*60*60*24) - Math.floor(hours)*(1000*60*60) - Math.floor(minute)*(1000*60))/1000;
  console.log('剩余多少天'+days+'剩余小时'+hours+'剩余分钟'+minute+'剩余秒'+second);
  return 111
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
