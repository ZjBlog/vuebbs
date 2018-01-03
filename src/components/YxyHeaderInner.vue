<template>
  <div class="yxy-header-inner">
    <top-inner></top-inner>
    <main-inner></main-inner>
  </div>
</template>

<script>
  import TopInner from './YxyHeader/TopInner'
  import MainInner from './YxyHeader/MainInner'
  export default {
    components: {
      TopInner,
      MainInner
    },
    created () {
    }
  }
</script>

<style lang="css">
</style>
