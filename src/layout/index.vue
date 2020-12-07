<template>
  <div class="index">
    <head-nav></head-nav>
    <div class="index-bg-wapper">
      <img src="../assets/background.png">
    </div>

    <div class="index-content-container">
      <div id="fixed-nav" style="height: 64px"></div>
      <div class="index-content-wapper">
        <app-main></app-main>
      </div>
    </div>
  </div>
</template>

<script>
import { HeadNav, AppMain } from './components'

export default {

  components: { 
    HeadNav,
    AppMain,
  },
}
</script>

<style lang="scss" scoped>
.index {
  height: 100vh;
  position: relative;
  overflow: hidden;
  .index-bg-wapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    z-index: -1;
  }

  .index-content-container {
    background: transparent;
    height: 100%;
    width: 100%;
    display: flex;
    flex-flow: column;
    .index-content-wapper {
      flex: 1;
    }
  }
}
</style>