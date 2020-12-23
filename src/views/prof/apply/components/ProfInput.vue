<template>
  <div class="prof-input-container">
    <div class="prof-input-content-wapper">
      <div class="prof-input-intro" :style="introStyle">{{inputObj.name}}</div>
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
      default: '150px',
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

  computed: {
    introStyle() {
      return {
        flex: '0 0 ' + this.size
      }
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
          return '请输入年份-月-日!'
        case '工作单位':
          return '请输入工作单位的全称!'
        default:  
          return '请输入' + name + '!'
      }
    }
  }
}
</script>

<style lang="scss">
.prof-input-container {
  position: relative; 
  width: 100%;
  
  .prof-input-content-wapper {
    display: flex;
    line-height: 40px;

    .prof-input-intro {
      font-size: 26px;
      font-weight: bold;
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