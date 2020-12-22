<template>
  <div class="prof-labels-container">
    <div class="prof-labels-title">{{title}}</div>
    <expert-labels :tagsList="tagsList"></expert-labels>
  </div>
</template>

<script>
import ExpertLabels from '@/components/ExpertLabels.vue'

export default {
  components: { ExpertLabels },
  props: {
    title: String,
    tagsList: Array,
  },
}
</script>

<style lang="scss" scoped>
.prof-labels-container {
  position: relative;
  width: 100%;
  height: 100%;

  .prof-labels-title {
    height: 60px;
    font-size: 26px;
    font-weight: bold;
  }
}
</style>