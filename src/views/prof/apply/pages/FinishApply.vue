<template>
  <div class="finish-apply-container animate__animated animate__fadeIn">
    
    <div class="finish-apply-img-wapper">
      <img src="@/assets/commit-succ.png">
    </div>

    <div class="finish-apply-intro">专家申报成功，请等待联盟秘书处审核！</div>

    <div class="next-button finish-apply-button" @click="$router.push('/prof/detail')">完成</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.finish-apply-container {
  width: 700px;
  height: 100%;
  margin: 0 auto;

  .finish-apply-img-wapper {
    width: 185px;
    margin: 0 auto;
    padding: 70px 0;

    img {
      height: 185px;
      width: 185px;
    }
  }

  .finish-apply-intro {
    width: 650px;
    margin: 0 auto;
    line-height: 40px;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
  }

  .finish-apply-button {
    margin: 146px auto 0;
  }
}
</style>