<template>
    <div class="add-info">
      <houseHead>新增个人信息</houseHead>
      <div class="task-items">
        <houseInput
          type='input'
          title="姓名"
          placeHolder="请输入"
          :initValue = "recordPerson"
          ref="recordPerson" @KeyUp="keyupPerson"
        ></houseInput>
          <houseInput
            type='input'
            title="联系电话"
            placeHolder="请输入"
            :initValue = "recordPerson"
            ref="recordPerson" @KeyUp="keyupPerson"
          ></houseInput>
          <houseSelect
            title = '队伍'
            :choseList = 'channellist'
            :initValue = channel
            @getList="change"
            placeHolder="请选择"
            ref="channel"
          ></houseSelect>
      </div>
      <houseBtn title="保存"></houseBtn>
      <houseToast></houseToast>
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
            recordPerson:'22',
            channellist:{
              "1":'么么哒'
            },
            channel:"1"
          };
      },
      computed: {},
      components: {houseBtn,houseHead,houseToast,houseSelect,houseInput},
      methods: {
        keyupPerson () {

        },
        init() {

        },
        change () {

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
