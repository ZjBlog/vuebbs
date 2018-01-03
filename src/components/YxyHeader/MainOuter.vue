<template>
  <nav id="main-outer">
    <div class="container">
      <el-row :span="24">
        <el-col :span="5">
          <a href="/#">
            <img class="logo" src="/static/img/logo.png" alt="logo" style="margin-top:-3px;max-height:50px !important;">
          </a>
        </el-col>
        <el-col :span="18" :offset="1" class="pull-right">
          <el-menu mode="horizontal">
            <el-menu-item index="1" v-bind:class="{ active: isActive1 }">
              <a href="/">首页</a>
              <span></span>
            </el-menu-item>
            <el-menu-item index="2">
              <a href="/">标题一</a>
              <span></span>
            </el-menu-item>
            <el-menu-item index="3">
              <a href="/">标题二</a>
              <span></span>
            </el-menu-item>
            <el-menu-item index="4">
              <a href="/">标题三</a>
              <span></span>
            </el-menu-item>
            <el-menu-item index="5">
              <a href="/">标题四</a>
              <span></span>
            </el-menu-item>
            <el-menu-item index="6">
              <a href="/">标题五</a>
              <span></span>
            </el-menu-item>
            <el-menu-item index="6">
              <a href="/pages/admin.html">后台管理</a>
              <span></span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </nav>
</template>

<script>
  import 'assets/Lib'
  export default {
    data () {
      return {
        isActive1: false,
        isActive2: false,
        isActive3: false,
        isActive4: false,
        isActive5: false,
        isActive6: false,
        isActive7: false
      }
    },
    mounted () {
      this.isActive1 = window.location.pathname.indexOf('home/index.html') > 0 || window.location.pathname === '/'
    }
  }
</script>

<style lang="css" scoped>
  #main-outer {
    height: 80px;
    line-height: 80px;
    margin-bottom: 2px;
    background-color: #FFF !important;
  }

  .container {
    width: 1200px !important;
    margin: auto;
  }

  ul.el-menu {
    background-color: #FFF !important;
  }

  li.el-menu-item {
    font-size: 18px;
    font-weight: bold;
    height: 43px !important;
    line-height: 43px;
    padding: 0px !important;
    margin: 19px 20px 0 20px;
  }

  li.el-menu-item a {
    color: #333;
    font-size: 20px;
    font-weight: normal;
    display: inline-block !important;
    padding: 0 5px;
  }

  li.el-menu-item span {
    height: 3px;
    background: #fff;
    display: block;
    margin: auto;
  }

  li.el-menu-item.active a,
  li.el-menu-item:hover a {
    color: #1fa0ff;
  }

  li.el-menu-item:hover span {
    background: #1fa0ff;
  }

  li.el-menu-item {
    color: #333;
    font-size: 20px;
    font-weight: normal;
    border-bottom: 2px solid #fff !important;
  }

  li.el-menu-item.active,
  li.el-menu-item:hover {
    background: none;
    color: #1fa0ff;
  }

  li.el-menu-item.active span {
    background: #1fa0ff;
  }

</style>
