<template>
  <div class="page-title-container">
    <div class="page-title-wapper deep-blue-title">
      <span class="page-title-index-text" @click="$router.push('/home')">首页</span>
      <span> —— {{$route.meta.title ? $route.meta.title : ''}}</span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.page-title-container {
  position: relative;

  .page-title-wapper {
    line-height: 80px;

    .page-title-index-text {
      cursor: pointer;
    }
  }
}
</style>