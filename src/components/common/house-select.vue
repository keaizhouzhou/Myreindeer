<template>
  <div class="house-select">
    <div class="item" @click="showOption()">
      <div class="title"><span v-show="canEmpty == 0" class="must">*</span>{{title}}</div>
      <div v-bind:class="{select:true,error:isError,done:choseItem.value!='请选择'}" v-bind:name="name" v-bind:data-vali="dataVali">{{choseItem.value}}</div>
      <div class="arrow-r"></div>
    </div>
    <!--模拟选择弹层-->
    <div class="master" v-show="selHide" @click="selectCancel()"></div>
    <div class="select-options" v-show="selHide">
      <div class="select-head">
        <div class="title">{{title}}</div>
        <div class="cancle" @click="selectCancel()">确定</div>
      </div>
      <div class="option-item" v-for="(value,key) of choseList" v-bind:key="key" @click="selectChose({value,key})">
        <div class="box">
          <div class="font">{{value}}</div>
          <div v-bind:class="{mark:true,selected:contains(choseItem.key,key)}"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  template: '.house-select',
  data: function () {
    return {
      selHide: false,
      choseItem: {value: '请选择'},
      isError: false,
      isReadOnly: false
    };
  },
  props: {
    title: String,
    dataVali: String,
    name: String,
    initValue: {
      value: String,
      default: '请选择'
    },
    canEmpty: {
      type: Number,
      default: 1
    },
    showStatus: Number,
    type: String,
    choseList: Object // 当前下拉框数据
  },
  watch: {
    'initValue': function () {
      if (this.initValue !== '请选择') {
        // console.log('初始值：'+this.initValue);
        if (this.type == 'select') {
          this.choseItem.key = this.initValue;
          this.choseItem.value = this.choseList[this.initValue];
        } else if (this.type == 'checkbox') {
          this.choseItem.key = this.initValue;
          let arrKey = this.initValue.split(',');
          this.choseItem.value = '';
          for (let i = 0; i < arrKey.length; i++) {
            if (i == arrKey.length - 1) {
              this.choseItem.value += this.choseList[arrKey[i]];
            } else {
              this.choseItem.value += this.choseList[arrKey[i]] + ',';
            }
          }
          if (this.choseItem.value == '') {
            this.choseItem.value = '请选择';
          }
        }
      }
    }/*,
    'choseItem': {
      handler: function (newvalue) {
        if (newvalue){
          this.$emit('controllchange',newvalue)
        }
      },
      deep:true
    }*/
  },
  methods: {
    showOption () {
      this.$emit('checkList');
      if (!this.isReadOnly) {
        this.selHide = true;
      }
    },
    selectCancel () {
      this.selHide = false;
    },
    selectChose (item) {
      console.log(this.choseItem)
      if (this.type == 'select') {
        this.choseItem = item;
        this.selectCancel();
      } else {
        if (this.contains(this.choseItem.key, item.key)) {
          this.choseItem.key = "";
          this.choseItem.value = "";
        } else {
          this.choseItem.key = item.key;
          this.choseItem.value = item.value;
        }
      }
      this.$emit('getList');
    },
    initOption () {
      if (this.initValue !== '请选择') {
        if (this.type == 'select') {
          this.choseItem.key = this.initValue;
          this.choseItem.value = this.choseList[this.initValue];
        } else if (this.type == 'checkbox') {
          this.choseItem.key = this.initValue;
          let arrKey = this.initValue.split(',');
          this.choseItem.value = '';
          for (let i = 0; i < arrKey.length; i++) {
            if (i == arrKey.length - 1) {
              this.choseItem.value += this.choseList[arrKey[i]];
            } else {
              this.choseItem.value += this.choseList[arrKey[i]] + ',';
            }
          }
          if (this.choseItem.value == '') {
            this.choseItem.value = '请选择';
          }
        }
      }
      if (this.showStatus == 1) {
        this.isReadOnly = true;
      }
    },
    contains (arrStr, val) {
      if (!arrStr) {
        return false;
      };
      let arr = arrStr.split(',');
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          return true;
        }
      }
      return false;
    }
  },
  mounted: function () {
    this.initOption();
  }
};
</script>
