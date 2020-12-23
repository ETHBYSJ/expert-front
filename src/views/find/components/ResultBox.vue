<template>
  <div class="result-box result-container">
    <div class="result-img-wapper">
      <img :src="photo.length>0?photo:require('@/assets/expert.png')">
    </div>

    <div class="result-intro-wapper">
      <div class="result-intro-top">
        <span class="result-intro-name">{{name}}</span>
        <el-popover
          v-if="labels.length>0"
          placement="top-start"
          title="标签"
          width="200"
          trigger="hover"
          :content="labelsText">
          <div class="next-button result-labels-button" slot="reference">查看标签</div>
        </el-popover>
      </div>

      <span class="result-intro-position">{{intro}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '姓名',
    },
    photo: {
      type: String,
      default: require('@/assets/expert.png'),
    },
    intro: {
      type: String,
      default: '专家简介',
    },
    labels: {
      type: Array,
      default: function() {
        return ['标签1', '标签2']
      }
    }
  },

  data() {
    return {
      labelsText: '',
    }
  },

  mounted() {
    // 标签一次成型
    this.labelsText = ''
    for (let label of this.labels) {
      this.labelsText += label + ', '
    }

    // 切掉最后一个逗号
    if (this.labelsText.length > 0) {
      this.labelsText = this.labelsText.slice(0, -2);
    }
  }
}
</script>

<style lang="scss">
.result-container {
  position: relative;
  height: 140px;
  width: 380px;
  border: 2px solid #5CC0FE;
  border-radius: 10px;
  background: white;
  display: flex;
  padding: 18px 10px; // div 100px * 360px

  .result-img-wapper {
    flex: 0 0 100px;

    img {
      height: 100px;
      width: 100px;
      border-radius: 50%;
    }
  }

  .result-intro-wapper {
    flex: 1;
    padding: 0 10px;

    .result-intro-top {    
      border-bottom: 1px solid #e7e7e7;
      height: 50px;

      .result-intro-name {
        display: inline-block;
        font-size: 26px;
        line-height: 45px;
        margin-top: 5px;
      }

      .result-labels-button {
        margin-top: 12px;
        height: 30px;
        line-height: 30px;
        width: 70px;
        font-size: 14px;
        font-weight: bold;
        float: right;
        cursor: pointer;
      }
    }

    .result-intro-position {
      display: inline-block;
      margin-top: 10px;
      font-size: 14px;
      line-height: 20px;
      color: #808b97;
    }
  }
}
</style>