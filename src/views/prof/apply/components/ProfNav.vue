<template>
  <div class="prof-nav-container">
    <div class="prof-nav-wapper">
      <div class="prof-nav-option-wapper">
        <span class="prof-nav-option-number">1</span>
        <span class="prof-nav-option-title">基本信息</span>
      </div>
      <div class="prof-nav-line"></div>
      <div class="prof-nav-option-wapper">
        <span class="prof-nav-option-number">2</span>
        <span class="prof-nav-option-title">专业类别</span>
      </div>
      <div class="prof-nav-line"></div>
      <div class="prof-nav-option-wapper">
        <span class="prof-nav-option-number">3</span>
        <span class="prof-nav-option-title">专攻领域</span>
      </div>
      <div class="prof-nav-line"></div>
      <div class="prof-nav-option-wapper">
        <span class="prof-nav-option-number">4</span>
        <span class="prof-nav-option-title">个人履历</span>
      </div>
      <div class="prof-nav-line"></div>
      <div class="prof-nav-option-wapper">
        <span class="prof-nav-option-number">5</span>
        <span class="prof-nav-option-title">意见评价</span>
      </div>
      <div class="prof-nav-line"></div>
      <div class="prof-nav-option-wapper">
        <span class="prof-nav-option-number">6</span>
        <span class="prof-nav-option-title">申报完成</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.prof-nav-container {
  position: relative;
  width: 220px;
  height: 100%;

  .prof-nav-wapper {
    height: 100%;
    border-top: 4px solid #5CC0FE;
    border-bottom: 4px solid #5CC0FE;
    border-left: 1px solid #5CC0FE;
    border-right: 1px solid #5CC0FE;
    background: rgba($color: #fcfcfc, $alpha: 0.8);
    display: flex;
    flex-flow: column;
    padding: 4px 24px;

    .prof-nav-option-wapper {
      font-size: 30px;
      line-height: 60px;
      color: #5CC0FE;

      .prof-nav-option-number {
        display: inline-block;
        height: 38px;
        width: 38px;
        line-height: 36px;
        border: 1px solid #5CC0FE;
        border-radius: 50%;
        text-align: center;
      }

      .prof-nav-option-title {
        font-weight: bold;
        position: relative;
        top: -1px;
      }
    }

    .prof-nav-line {
      flex: 1;
      width: 1px;
      background: #5CC0FE;
      margin-left: 19px;
    }
  }
} 

</style>