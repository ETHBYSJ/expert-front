<template>
  <div class="apply-container">
    <div class="apply-wapper adaptive-apply-width">
      <page-title></page-title>

      <div class="apply-content-container adaptive-height">
        <div class="apply-left-container">
          <prof-nav></prof-nav>
        </div>

        <div class="apply-right-container">
          <div class="apply-right-wapper" v-show="leftStatus===1">
            <div class="right-content-title">基本信息</div>
            <div class="right-content-wapper">
              <base-message @jump="jump"></base-message>
            </div>
          </div>

          <div class="apply-right-wapper" v-show="leftStatus===2">
            <div class="right-content-title">专业类别</div>
            <div class="right-content-wapper">
              <major-category @jump="jump"></major-category>
            </div>
          </div>

          <div class="apply-right-wapper" v-show="leftStatus===3">
            <div class="right-content-title">专攻领域</div>
            <div class="right-content-wapper">
              <major-field @jump="jump"></major-field>
            </div>
          </div>

          <div class="apply-right-wapper" v-show="leftStatus===4">
            <div class="right-content-title">个人履历</div>
            <div class="right-content-wapper">
              <person-history @jump="jump"></person-history>
            </div>
          </div>

          <div class="apply-right-wapper" v-show="leftStatus===5">
            <div class="right-content-title">意见评价</div>
            <div class="right-content-wapper">
              <person-opinion @jump="jump"></person-opinion>
            </div>
          </div>

          <div class="apply-right-wapper" v-show="leftStatus===6">
            <div class="right-content-title">申报完成</div>
            <div class="right-content-wapper">
              <finish-apply></finish-apply>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue'
import { ProfNav } from './components'
import { BaseMessage, MajorCategory, MajorField, PersonHistory, PersonOpinion, FinishApply } from './pages'

export default {
  components: { 
    ProfNav,
    PageTitle,
    // pages
    BaseMessage,
    MajorCategory,
    MajorField,
    PersonHistory,
    PersonOpinion,
    FinishApply,
  },

  data() {
    return {
      leftStatus: 1,
    }
  },

  activated() {
    this.leftStatus = 1
  },

  methods: {
    jump(step) {
      this.leftStatus += step
    },
  }
  
}
</script>

<style lang="scss">
.apply-container {
  position: relative;

  .apply-wapper {
    margin: 0 auto;
    padding: 0 14px;

    .apply-content-container {
      position: relative;

      .apply-left-container {
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    
      .apply-right-container {
        height: 100%;
        margin-left: 240px;
        border: 2px solid #5CC0FE;
        background: #ffffff;

        .apply-right-wapper {
          display: flex;
          flex-flow: column;
          width: 860px;
          margin: 0 auto;
          height: 100%;

          .right-content-wapper {
            flex: 1;
          }
        }
      }
    }
  }
}
</style>