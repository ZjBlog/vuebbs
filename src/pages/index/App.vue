<template>
  <div id="app">
      <hdzy-header></hdzy-header>
      <div style="height:70px;"></div>
      <div class="con">
        <el-row class="limitW">  
          <el-col :md="18" :xs="24" :sm="24">
            <carousel></carousel>
          </el-col>
          <el-col :md="6" class="hidden-sm-and-down">
            9999999
          </el-col>
        </el-row>
      </div>
        <yxy-footer></yxy-footer>
  </div>
</template>
<script>
  import YxyFooter from 'components/YxyFooter'
  import HdzyHeader from 'components/HdzyHeader'
  import carousel from './components/carousel'
  export default {
    data () {
      return {
        num: 1.123450000005
      }
    },
    components: {
      YxyFooter,
      HdzyHeader,
      carousel
    },
    mounted () {
    },
    methods: {
      test () {
        this.$http.get('/api_yw/comm/weike/subject', {params: {stage: '01'}}).then(res => {
          console.info(res)
        }).catch((res) => {
          console.log(res)
        })
      }
    }
  }
</script>
<style>
.con{
  min-height: 1500px;
  text-align: center;
  width: 100%;
}
.limitW{
  max-width: 1200px;
  margin: 0 auto;
}
</style>
