<template>
  <div id="app" >
    <yxy-header-inner></yxy-header-inner>
      <div class="container">
          <router-view></router-view>
      </div>
    <yxy-footer></yxy-footer>
  </div>
</template>
<script>
import YxyHeaderInner from 'components/YxyHeaderInner'
import YxyFooter from 'components/YxyFooter'
export default {
  data () {
    return {}
  },
  components: {
    YxyFooter,
    YxyHeaderInner
  }
}
</script>

<style scoped>
.container {
  min-height: 500px;
}
</style>
