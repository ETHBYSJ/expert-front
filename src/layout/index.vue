<template>
  <div class="index">
    <head-nav></head-nav>
    <div class="index-bg-wapper">
      <img src="@/assets/background.png">
    </div>

    <div class="index-content-container">
      <div style="height: 72px"></div>
      <app-main></app-main>
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

<style lang="scss">
.index {
  height: 100vh;
  position: relative;

  .index-bg-wapper {
    overflow: hidden;
    img {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      z-index: -1;
    }
  }

  .index-content-container {
    background: transparent;
  }
}
</style>