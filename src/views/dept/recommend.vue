<template>
  <div class="rec-container">
    <div class="rec-wapper adaptive-width">
      <div class="rec-title">
        <span class="rec-index-text">首页</span>
        <span> —— 专家推荐</span>
      </div>

      <div class="rec-left-wapper adaptive-height"></div>

      <div class="rec-right-wapper"></div>
    </div>
  </div>
</template>

<script>
export default {

  
}
</script>

<style lang="scss" scoped>
.rec-container {
  position: relative;

  .rec-wapper {
    margin: 0 auto;

    .rec-title {
      line-height: 80px;
      color: #064B80;
      font-size: 26px;
      font-weight: bold;

      .rec-index-text {
        cursor: pointer;
      }
    }
  }

  .rec-left-wapper {
    width: 220px;
    border-top: 4px solid #5CC0FE;
    border-bottom: 4px solid #5CC0FE;
    border-left: 1px solid #5CC0FE;
    border-right: 1px solid #5CC0FE;
    background: rgba($color: #fcfcfc, $alpha: 0.8);
  }
}
</style>