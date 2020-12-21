<template>
  <div class="field-container">
    <div class="field-wapper">
      <div class="field-content-wapper">
        <div class="row-flex-unit">
          <prof-labels 
            title="从事专业或学科（该项内容将作为专家搜索的标签）"
            :tagsList="MajorLabels">
          </prof-labels>
        </div>

        <div class="row-flex-unit">
          <prof-labels 
            title="研究方向或专长（该项内容将作为专家搜索的标签）"
            :tagsList="ResearchLabels">
          </prof-labels>
        </div>
      </div>

      <div class="field-button-wapper">
        <div class="next-button" style="float:left;">上一步</div>
        <div class="next-button" style="float:right;">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfLabels from '../components/ProfLabels.vue'
export default {
  components: { ProfLabels },
  props: {

  },
  data() {
    return {
      MajorLabels: [],
      ResearchLabels: [],
    }
  }
}
</script>

<style lang="scss" scoped>
.field-container {
  position: relative;
  height: 100%;

  .field-wapper {
    display: flex;
    flex-flow: column;
    height: 100%;
    width: 800px;
    margin: 0 auto;

    .field-content-wapper {
      flex: 1;
      display: flex;
      flex-flow: column;
    }

    .field-button-wapper {
      flex: 0 0 85px;
      padding: 0 200px;
    }
  }
}
</style>