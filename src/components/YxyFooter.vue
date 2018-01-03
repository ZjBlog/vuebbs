<template>
  <footer id="footer" class="text-center">
    <p style="font-size:14px;margin-bottom: 15px;">&copy;2016-2017 {{copyright}}</p>
  </footer>
</template>

<script>
  export default {
    data () {
      return {
        copyright: 'footer'
      }
    }
  }
</script>

<style lang="css" scoped>
  #footer {
    text-align: center;
    padding-top: 30px;
    padding-bottom: 30px;
    color: #FFF;
    background-color: #475669;
  }
</style>
