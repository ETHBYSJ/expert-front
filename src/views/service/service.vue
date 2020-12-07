<template>
  <div class="service-container">
    <head-nav></head-nav>
    <div class="service-bg-wapper">
      <img src="../assets/background.png">
    </div>
  </div>
</template>

<script>
import HeadNav from "../components/HeadNav.vue"

export default {

  components: { HeadNav },
}
</script>

<style lang="stylus">
.service-container
  height 100vh
  position: relative
  overflow hidden
  .service-bg-wapper
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    --moz-transform translate(-50%, -50%)
    -webkit-transform translate(-50%, -50%)
    z-service -1

</style>