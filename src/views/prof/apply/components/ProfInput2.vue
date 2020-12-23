<template>
  <div class="prof-input2-container">
    <div class="prof-input2-wapper">

      <div class="prof-input2-intro">{{inputObj1.name+'及'+inputObj2.name}}</div>

      <div class="prof-input2-content">
        <div class="prof-input2-content-left">
          <el-input :placeholder="getTip(inputObj1.name)" v-model="inputObj1.content"></el-input>
          <div class="prof-input2-tip-wapper">
            <span v-show="inputObj1.alert">{{getTip(inputObj1.name)}}</span>
          </div>
        </div>
        <div class="prof-input2-content-mid"></div>
        <div class="prof-input2-content-right">
          <el-input :placeholder="getTip(inputObj2.name)" v-model="inputObj2.content"></el-input>
          <div class="prof-input2-tip-wapper">
            <span v-show="inputObj2.alert">{{getTip(inputObj2.name)}}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    inputObj1: {
      type: Object,
      default: {
        name: '',
        content: '',
        alert: false,
      }
    },
    inputObj2: {
      type: Object,
      default: {
        name: '',
        content: '',
        alert: false,
      }
    }
  },

  watch: {
    // 输入改变，tip消失
    'inputObj1.content': function(val) {
      this.inputObj1.alert = false
    },
    'inputObj2.content': function(val) {
      this.inputObj2.alert = false
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

<style lang="scss">
.prof-input2-container {
  position: relative;
  height: 100%;
  width: 100%;

  .prof-input2-wapper {
    height: 100%;
    display: flex;
    flex-flow: column;
    
    .prof-input2-intro {
      flex: 1;
      font-size: 26px;
      font-weight: bold;
    }

    .prof-input2-content {
      flex: 1;
      display: flex;

      .prof-input2-content-left {
        flex: 0 0 450px;
      }

      .prof-input2-content-mid {
        flex: 1;
        margin: 19px 10px;
        height: 2px;
        background: #000;
      }

      .prof-input2-content-right {
        flex: 0 0 200px;
      }
    }
  }

 

  .prof-input2-tip-wapper {
    line-height: 15px;
    padding: 0 4px;
    font-size: 12px;
    color: red;
    text-align: right;
  }
}
</style>