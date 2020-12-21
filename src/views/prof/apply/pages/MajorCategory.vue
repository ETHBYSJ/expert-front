<template>
  <div class="cate-container">
    <div class="cate-wapper">
      <div class="cate-input-wapper">
        <div class="row-flex-unit">
          <div class="row-flex-unit" style="margin-left:40px">
            <prof-input size="140px" :inputObj="pageMsg.edu"></prof-input>
          </div>
          <div class="row-flex-unit" style="margin-left:40px">
            <prof-input size="140px" :inputObj="pageMsg.degree"></prof-input>
          </div>
        </div>
        <div class="row-flex-unit">
          <div class="row-flex-unit" style="margin-left:40px">
            <prof-input size="140px" :inputObj="pageMsg.major"></prof-input>
          </div>
          <div class="row-flex-unit" style="margin-left:40px">
            <prof-input size="140px" :inputObj="pageMsg.category"></prof-input>
          </div>
        </div>
        <div class="row-flex-unit" style="margin-left:40px">
          <prof-input size="140px" :inputObj="pageMsg.dept"></prof-input>
        </div>
        <div class="row-flex-unit">
          <div class="row-flex-unit" style="margin-right:40px">
            <prof-input size="180px" :inputObj="pageMsg.techPost"></prof-input>
          </div>
          <div class="row-flex-unit">
            <prof-input size="180px" :inputObj="pageMsg.adminPost"></prof-input>
          </div>
        </div>
        <div class="row-flex-unit">
          <div class="row-flex-unit" style="margin-right:40px">
            <prof-input size="180px" :inputObj="pageMsg.authDept"></prof-input>
          </div>
          <div class="row-flex-unit">
            <prof-input size="180px" :inputObj="pageMsg.workTime"></prof-input>
          </div>
        </div>
      </div>
      <div class="cate-button-wapper">
        <div class="next-button" style="float:left;">上一步</div>
        <div class="next-button" style="float:right;">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ProfInput } from '../components'

export default {
  components: {
    ProfInput,
  },

  data() {
    return {
      pageMsg: {
        edu: {name:'学历程度', content:'', alert:false},
        degree: {name:'最高学位', content:'', alert:false},
        major: {name:'所学专业', content:'', alert:false},
        category: {name:'专业类别', content:'', alert:false},
        dept: {name:'工作单位', content:'', alert:false},
        techPost: {name:'专业技术职务', content:'', alert:false},
        adminPost: {name:'现行行政职务', content:'', alert:false},
        authDept: {name:'单位主管部门', content:'', alert:false},
        workTime: {name:'工作时间', content:'', alert:false},
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cate-container {
  position: relative;
  height: 100%;

  .cate-wapper {
    display: flex;
    flex-flow: column;
    width: 800px;
    height: 100%;
    margin: 0 auto;

    .cate-input-wapper {
      flex: 1;
      display: flex;
      flex-flow: column;
      margin: 24px 0;
    }

    .cate-button-wapper {
      flex: 0 0 85px;
      padding: 0 200px;
    }
  }
}
</style>