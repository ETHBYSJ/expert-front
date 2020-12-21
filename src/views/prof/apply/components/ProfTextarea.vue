<template>
  <div class="prof-textarea-container">
    <div class="prof-textarea-title">{{inputObj.name}}</div>
    <el-input
      class="prof-textarea-input"
      type="textarea"
      :rows="2"
      resize="none"
      placeholder="请输入内容"
      v-model="textarea">
    </el-input>
  </div>
</template>

<script>
export default {
  props: {
    inputObj: Object,
  }
}
</script>

<style lang="scss" scoped>
.prof-textarea-container {
  width: 100%;
  height: 100%;
  position: relative;

  .prof-textarea-title {
    height: 45px;;
    font-size: 26px;
    font-weight: bold;
  }

  .prof-textarea-input {
    font-size: 26px;
    color: #e9e9e9
  }
}
</style>