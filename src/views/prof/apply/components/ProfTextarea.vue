<template>
  <div class="prof-textarea-container">
    <div class="prof-textarea-title">{{inputObj.name}}</div>
    <el-input
      class="prof-textarea-input"
      type="textarea"
      :rows="6"
      resize="none"
      placeholder="请输入内容"
      v-model="inputObj.content">
    </el-input>
    <div class="prof-textarea-tip-wapper">
      <span v-show="inputObj.alert">内容不能为空！</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inputObj: Object,
  },

   watch: {
    // 输入改变，tip消失
    'inputObj.content': function(val) {
      this.inputObj.alert = false
    }
   }
}
</script>

<style lang="scss" scoped>
.prof-textarea-container {
  width: 100%;
  height: 100%;
  position: relative;

  .prof-textarea-title {
    height: 40px;;
    font-size: 26px;
    font-weight: bold;
  }

  .prof-textarea-input {
    font-size: 16px;
  }

  .prof-textarea-tip-wapper {
    line-height: 15px;
    padding: 0 4px;
    font-size: 14px;
    color: red;
    text-align: right;
  }
}
</style>