<template>
  <div class="apply-container">
    <div class="apply-wapper adaptive-apply-width">
      <page-title></page-title>

      <div class="apply-content-container adaptive-height">
        <div class="apply-left-wapper">
          <prof-nav></prof-nav>
        </div>

        <div class="apply-right-wapper">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue'
import ProfNav from './components/ProfNav.vue'

export default {
  components: { 
    ProfNav,
    PageTitle,
  },

  data() {
    return {
      leftStatus: 1,
    }
  }
  
}
</script>

<style lang="scss" scoped>
.apply-container {
  position: relative;

  .apply-wapper {
    margin: 0 auto;
    padding: 0 14px;

    .apply-content-container {
      position: relative;

      .apply-left-wapper {
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    
      .apply-right-wapper {
        height: 100%;
        margin-left: 240px;
        border: 2px solid #5CC0FE;
        background: #ffffff;
      }
    }
  }
}
</style>