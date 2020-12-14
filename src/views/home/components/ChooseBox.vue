<template>
  <div class="choose-box-container">
    <div class="choose-box">
      <div class="choose-img-wapper">
        <img class="cb-img-adaptive-size" :src="imgSrc">
      </div>
      <div class="choose-text">{{text}}</div>
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
.choose-box-container {
  position: relative;
  
  .choose-box {
    margin: 0 auto;
    border: 4px solid #5cc0fe;
    background-color: rgba(255, 255, 255, 0.85);
    cursor: pointer;

    @media screen and (min-width:1500px) {
      width: 410px;
      height: 478px;
    }

    @media screen and (min-width:1200px) and (max-width:1499px) {
      width: 328px;
      height: 382px; // 382.4
    }
    
    @media screen and (min-width:1000px) and (max-width:1199px) {
      width: 273px;
      height: 319px;
    }

    @media screen and (max-width:999px) {
      width: 246px;
      height: 269px; // 268.8
    }

    .choose-img-wapper {
      @media screen and (min-width:1500px) {    
        margin: 50px auto 32px;
        width: 300px;
      }

      @media screen and (min-width:1200px) and (max-width:1499px) {
        margin: 40px auto 26px;
        width: 240px; // 
      }

      @media screen and (min-width:1000px) and (max-width:1199px) {
        margin: 33px auto 21px;
        width: 200px; // 
      }

      @media screen and (max-width:999px) {
        margin: 28px auto 18px;
        width: 180px; // 
      }  

    }

    .choose-text {
      font-weight: bold;
      color: #064B80;
      text-align: center;

      @media screen and (min-width:1500px) {    
        font-size: 28px;
      }

      @media screen and (min-width:1200px) and (max-width:1499px) {
        font-size: 22px;
      }
      
      @media screen and (min-width:1000px) and (max-width:1199px) {
        font-size: 19px;
      }

      @media screen and (max-width:999px) {
        font-size: 17px;
      }  
    }
  }
}

.cb-img-adaptive-size {
  margin: 0 auto;

  @media screen and (min-width:1500px) {
    height: 318px;
    width: 300px;
  }

  @media screen and (min-width:1200px) and (max-width:1499px) {
    height: 254px; // 254.4
    width: 240px; // 
  }

  @media screen and (min-width:1000px) and (max-width:1199px) {
    height: 212px;
    width: 200px;
  }

  @media screen and (max-width:999px) {
    height: 191px; // 190.8
    width: 180px; // 
  }
}
</style>