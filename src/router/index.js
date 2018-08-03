import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import strategy from '@/components/strategy';
import Main from '@/components/common/main-tab';
import home from '@/components/home';
import UserCenter from '@/components/user-center';
import myCrowd from '@/components/myCrowd'
import myOrder from '@/components/myOrder'
import routerIntroduce from '@/components/router-introduce'
import activeLists from '@/components/active-lists'
import activeDetail from '@/components/active-detail'
import confirmOrder from '@/components/confirm-order'
import payOrder from '@/components/pay-order'
import orderCrowd from '@/components/orderCrowd'
import sharePage from '@/components/sharePage'
import selfSupport from '@/components/selfSupport'
import supportHim from '@/components/supportHim'
import supportHimToPay from '@/components/supportHimToPay'
import addInfo from '@/components/addInfo';
import safeState from '@/components/safeState';
Vue.use(Router)
const router =  new Router({
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      component: Main,
      children: [
        {
          path: '',
          redirect: 'home'
        },
        // 首页
        {
          path: 'home',
          component: home,
          name: 'home'
        },
        {// 攻略
          path: 'strategy',
          component: strategy,
          name: 'strategy'
        },
        // 我的众筹
        {
          path: 'myCrowd',
          component: myCrowd,
          name: 'myCrowd'
        },
        // 我的订单
        {
          path: 'myOrder',
          component: myOrder,
          name: 'myOrder'
        }
      ]
    },
    { // 路线介绍
      path: '/routerIntroduce',
      name: 'routerIntroduce',
      component: routerIntroduce
    },
    { // 活动列表
      path: '/activeLists',
      name: 'activeLists',
      component: activeLists
    },
    { // 活动详情页
      path: '/activeDetail/:MId',
      name: 'activeDetail',
      component: activeDetail
    },
    { // 自付下单
      path: '/payOrder/:MId',
      name: 'payOrder',
      component: payOrder
    },
    { // 确认下单
      path: '/confirmOrder/:num/:teamName/:teamId/:Mid',
      name: 'confirmOrder',
      component: confirmOrder
    },
    // 众筹下单
    {
      path: '/orderCrowd/:MId',
      component: orderCrowd,
      name: 'orderCrowd'
    },
    {// 分享页
      path: '/sharePage/:MId',
      component: sharePage,
      name: 'sharePage'
    },
    {// 自己支持付款页
      path: '/selfSupport',
      component: selfSupport,
      name: 'selfSupport'
    },
    {// 给他支持页
      path: '/supportHim/:MId',
      component: supportHim,
      name: 'supportHim'
    },
    {// 给他支持付款页
      path: '/supportHimToPay',
      component: supportHimToPay,
      name: 'supportHimToPay'
    },
    { // 新增个人信息 addInfo
      path: '/addInfo',
      component: addInfo,
      name: 'addInfo'
    },
    { // 安全声明
      path: '/safeState',
      component: safeState,
      name: 'safeState'
    }
  ]
});
export default router;

router.beforeEach((to, from, next) => {// 路由跳转前
 /* let isLogin = store.state.isLogin;
  let isHome = to.path.indexOf('/login') != -1;
  let isRegist = to.path.indexOf('/findpassword') != -1;
  let isIndex = (to.path.lastIndexOf('/') == to.path.length) || (to.path.indexOf('/index') != -1);
  if (!isLogin && !isHome && !isIndex && !isRegist) {
    localStorage.clear();
    next('/login');
  } else {
    next();
  }*/
  next();
});

