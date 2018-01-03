<template>
    <div>
      <el-carousel  height="400px" class="hidden-xs-only">
        <el-carousel-item v-for="item in items" :key="item">
          <a href="#">
            <img :src="item" class="bj1"/>
          </a>
        </el-carousel-item>
      </el-carousel>
      <el-carousel  height="170px" class="hidden-md-and-up hidden-sm-only" arrow="always">
        <el-carousel-item v-for="item in items" :key="item">
          <a href="#">
            <img :src="item" class="bj1"/>
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>

</template>
<script>
  export default {
    data () {
      return {
        hei: '400px',
        items: ['http://ww1.sinaimg.cn/large/828dc694gy1fk8g9pe6k4j20s20ciwrc.jpg', 'http://ww1.sinaimg.cn/large/828dc694gy1fk7dgl7c9kj20s20citrl.jpg', 'http://ww1.sinaimg.cn/large/828dc694gy1fjy24799exj20s20citlp.jpg', 'http://ww1.sinaimg.cn/large/828dc694gy1fk8g9pe6k4j20s20ciwrc.jpg']
      }
    },
    components: {
    },
    mounted () {
    },
    methods: {
    }
  }
</script>
<style scoped>
.bj1{
  width: 100%;
  height: 100%;
}
.bj{
  width: 100%;
  height: 400px;
  background: no-repeat;
}
</style>
