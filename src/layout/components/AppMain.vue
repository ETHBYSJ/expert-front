<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.app-main {
  height: 100%;
  width: 100%;
}
</style>