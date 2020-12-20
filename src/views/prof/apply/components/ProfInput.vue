<template>
  <div class="prof-input-container">
    <div class="prof-input-content-wapper">
      <div class="prof-input-intro" :class="size">{{inputObj.name}}</div>
      <el-input :placeholder="getTip(inputObj.name)" v-model="inputObj.content"></el-input>
    </div>

    <div class="prof-input-tip-wapper">
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
        case '出生年月':
          return '请输入年份-月-日!';
        default:  
          return '请输入' + name + '!';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.prof-input-container {
  position: relative;

  .prof-input-content-wapper {
    display: flex;
    line-height: 40px;

    .prof-input-intro {
      font-size: 26px;
      font-weight: bold;

      &.big {
        flex: 0 0 150px;
      }
      &.medium {
        flex: 0 0 130px;
      }
      &.small {
        flex: 0 0 100px;
      }
    }
  }

  .prof-input-tip-wapper {
    line-height: 15px;
    padding: 0 4px;
    font-size: 12px;
    color: red;
    text-align: right;
  }
}

</style>