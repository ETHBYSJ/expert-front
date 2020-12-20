<template>
  <div class="dept-nav-container">
    <div class="dept-nav-wapper">
      <div class="dept-nav-option-wapper">
        <span class="dept-nav-option-number">1</span>
        <span class="dept-nav-option-title">单位信息</span>
      </div>
      <div class="dept-nav-line"></div>
      <div class="dept-nav-option-wapper">
        <span class="dept-nav-option-number">2</span>
        <span class="dept-nav-option-title">专家推荐</span>
      </div>
      <div class="dept-nav-line"></div>
      <div class="dept-nav-option-wapper">
        <span class="dept-nav-option-number">3</span>
        <span class="dept-nav-option-title">上报成功</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dept-nav-container {
  position: relative;
  width: 220px;
  height: 100%;

  .dept-nav-wapper {
    height: 100%;
    border-top: 4px solid #5CC0FE;
    border-bottom: 4px solid #5CC0FE;
    border-left: 1px solid #5CC0FE;
    border-right: 1px solid #5CC0FE;
    background: rgba($color: #fcfcfc, $alpha: 0.8);
    display: flex;
    flex-flow: column;
    padding: 4px 24px;

    .dept-nav-option-wapper {
      font-size: 30px;
      line-height: 60px;
      color: #5CC0FE;

      .dept-nav-option-number {
        display: inline-block;
        height: 38px;
        width: 38px;
        line-height: 36px;
        border: 1px solid #5CC0FE;
        border-radius: 50%;
        text-align: center;
      }

      .dept-nav-option-title {
        font-weight: bold;
        position: relative;
        top: -1px;
      }
    }

    .dept-nav-line {
      flex: 1;
      width: 1px;
      background: #5CC0FE;
      margin-left: 19px;
    }
  }
} 

</style>