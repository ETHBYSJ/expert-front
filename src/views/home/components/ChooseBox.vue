<template>
  <div class="choose_box_container">
    <div class="choose_box">
      <div class="choose_img_wapper">
        <img :src="imgSrc">
      </div>
      <div class="choose_text">{{text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: String,
    text: String,
  }
}
</script>

<style lang="scss" scoped>
.choose_box_container {
  position: relative;
  width: 410px;
  height: 478px;
  margin: 0 auto;
  
  .choose_box {
    width: 410px;
    height: 478px;
    border: 4px solid #5cc0fe;
    background-color: rgba(255, 255, 255, 0.85);
    cursor: pointer;

    .choose_img_wapper {
      margin: 50px auto 32px;
      width: 300px;
      img {
        height: 318px;
        width: 300px;
      }
    }

    .choose_text {
      font-size: 28px;
      font-weight: bold;
      color: #064B80;
      text-align: center;
    }
  }
}
</style>