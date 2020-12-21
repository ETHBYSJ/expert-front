<template>
  <div class="field-container">
    <div class="field-wapper">
      <div class="field-content-wapper">
        <div class="row-flex-unit">
          <prof-labels 
            title="从事专业或学科（该项内容将作为专家搜索的标签）"
            :tagsList="majorLabels">
          </prof-labels>
        </div>

        <div class="row-flex-unit">
          <prof-labels 
            title="研究方向或专长（该项内容将作为专家搜索的标签）"
            :tagsList="researchLabels">
          </prof-labels>
        </div>
      </div>

      <div class="field-button-wapper">
        <div class="next-button" style="float:left;" @click="nextStep(-1)">上一步</div>
        <div class="next-button" style="float:right;" @click="nextStep(1)">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqCommitProfField, reqGetProfField } from '@/api/request.js'
import ProfLabels from '../components/ProfLabels.vue'
export default {
  components: { ProfLabels },

  data() {
    return {
      majorLabels: [],
      researchLabels: [],
    }
  },

  mounted() {
    reqGetProfField().then(res => {
      if (res.data.code === 10000) {
        this.majorLabels = res.data.data.majorLabels
        this.researchLabels = res.data.data.researchLabels
      } else {
        this.$alert('加载数据失败，请刷新后重试', '提示', {
          confirmButtonText: '确定',
        });
      }
    }).catch(err => {
      this.$alert('加载数据失败，请刷新后重试', '提示', {
        confirmButtonText: '确定',
      });
    })
  },

  methods: {
    nextStep(step) {
      const data = {
        majorLabels: this.majorLabels,
        researchLabels: this.researchLabels,
      }
      reqCommitProfField(data).then(res => {
        if (res.data.code === 10000) {
          this.$emit('jump', step)
        } else {
          this.$alert('专攻领域提交失败', '提示', {
            confirmButtonText: '确定',
          });
        }
      }).catch(err => {
        this.$alert('专攻领域提交失败', '提示', {
          confirmButtonText: '确定',
        });
      })
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