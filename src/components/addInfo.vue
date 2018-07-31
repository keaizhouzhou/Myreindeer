<template>
    <div class="add-info">
      <!--<houseHead>新增个人信息</houseHead>-->
      <div class="task-items">
        <houseInput
          type='input'
          title="姓名"
          placeHolder="请输入"
          :initValue = "recordPerson"
          ref="username" @KeyUp="keyupPerson"
        ></houseInput>
          <houseInput
            type='input'
            title="联系电话"
            placeHolder="请输入"
            :initValue = "recordPerson"
            ref="phone" @KeyUp="keyupPerson"
          ></houseInput>
      </div>
      <houseBtn title="保存" v-on:toSave="saveInfo"></houseBtn>
      <houseToast></houseToast>
    </div>
</template>
<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex';
  import houseBtn from './common/house-btn.vue';
  import houseHead from './common/house-head.vue';
  import houseToast from './common/house-toast.vue';
  import houseInput from './common/house-input.vue';
  import {util} from '../assets/js/util'
  export default {
      template: '.add-info',
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
            recordPerson:''
          };
      },
      computed: {
        ...mapGetters([
          'getBaseUrl',
          'getSelectRoute'
        ])
      },
      components: {houseBtn,houseHead,houseToast,houseInput},
      methods: {
        keyupPerson () {
        },
        init() {
          window.changeTitle('新增个人信息');
        },
        change () {
        },
        ...mapActions([
          'changeRoute',
          'changeUserInfo'
        ]),
        saveInfo (){
          let jsoncontent ={
            field:{
              username:this.$refs.username.finalValue,
              phone:this.$refs.phone.finalValue
            },
            condition:[
              {
                key:'openid',
                //values:this.$store.state.openid,
                values:'ol7xB1my-BpVVyQGg-Cu5Riptdbc',
                oprate:'='
              }
            ]
          };
          let data = {
            data:{
              Action:'updatedata',
              jsoncontent:JSON.stringify(jsoncontent)
            },
            url:this.getBaseUrl + 'CommonHandler/UserInfoHandler.ashx'
          };
          util.fetchData (data).then(res => {
            console.log(res);
            if (res.data.result == 0) {
              this.changeUserInfo(jsoncontent.field);
              this.$router.go(-1);
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
<style lang="less" >
    @import './../assets/less/add-info.less';
    @import './../assets/less/item-style.less';
</style>
