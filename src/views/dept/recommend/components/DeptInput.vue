<template>
  <div class="msg-input-container">
    <div class="msg-input-content-wapper">
      <div class="msg-input-intro" :class="size">{{inputObj.name}}</div>
      <el-input :placeholder="getTip(inputObj.name)" v-model="inputObj.content"></el-input>
    </div>

    <div class="msg-input-tip-wapper">
      <span v-show="inputObj.alert">{{getTip(inputObj.name)}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'big',
    },
    inputObj: {
      type: Object,
      default: {
        name: '',
        content: '',
        alert: false,
      }
    }
  },

  data() {
    return {
      //sizeClass: ['big', 'medium', 'small'],
    }
  },

  watch: {
    // 输入改变，tip消失
    'inputObj.content': function(val) {
      this.inputObj.alert = false
    }
  },

  methods: {
    getTip(name) {
      switch(name) {
        // 单位填报页1
        case '填报单位':
          return '请输入单位全称!';
        case '单位负责人':
          return '请输入单位负责人的姓名!';
        case '经办人':
          return '请输入经办人的姓名!';
        case '联系电话':
          return '请输入联系电话!'

        default:  
          return '请输入专家的' + name;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.msg-input-container {
  position: relative;
  flex: 1;

  .msg-input-content-wapper {
    display: flex;
    line-height: 40px;

    .msg-input-intro {
      font-size: 26px;
      font-weight: bold;

      &.big {
        flex: 0 0 200px;
      }
      &.medium {
        flex: 0 0 150px;
      }
      &.small {
        flex: 0 0 65px;
      }
    }
  }

  .msg-input-tip-wapper {
    line-height: 15px;
    padding: 0 4px;
    font-size: 12px;
    color: red;
    text-align: right;
  }
}

</style>