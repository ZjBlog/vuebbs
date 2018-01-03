<template>
  <!-- Static navbar -->
  <nav id="navtopinner" class="navbar navbar-default navbar-static-top" role="navigation">
    <div class="container1">
      <div id="navbar">
        <ul class="ul-nav">
          <li><a href="/">首页</a><span></span></li>
          <li><a href="#">标题一</a></li>
          <li><a href="#">标题二</a></li>
          <li><a href="#">标题三</a></li>
          <li><a href="#">标题四</a></li>
          <li><a href="#">标题五</a></li>
        </ul>
        <ul class="ul-list">
          <li v-if="user.authenticated">
            <a href="#">
              <i class="fa fa-user-o" aria-hidden="true"></i>
              <span>欢迎您 , {{user.nickname}}<span class="shu">|</span></span>
            </a>
          </li>
          <li v-if="user.authenticated"><a href="/" class="gongzuo">工作空间<span class="shu">|</span></a>
          </li>
          <li v-if="!user.authenticated"><a href="/pages/login.html">登录</a></li>
          <li v-if="user.authenticated" class="parson">
            <el-dropdown trigger="click">
              <a href="javascript:void(0);" @click="logout" class="el-dropdown-link">
                <span>退出登录</span>
                <!-- <i class="el-icon-caret-bottom el-icon--right"></i> -->
              </a>
            </el-dropdown>
            <!-- <el-dropdown trigger="click">
              <a href="javascript:void(0);" class="el-dropdown-link">
                <span>个人设置</span>
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </a>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <a href="/module/personal/profile.html">
                    <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                    <span>个人设置</span>
                  </a>
                </el-dropdown-item>
                <el-dropdown-item>
                  <i class="fa fa-sign-out" aria-hidden="true"></i>
                  <span @click="logout">退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
          </li>
        </ul>
      </div><!--/.nav-collapse -->
    </div>
  </nav>
</template>

<script>
  import ls from 'local-storage'
  export default {
    data () {
      return {
        user: {
          workSpace: '',
          authenticated: true,
          nickname: 'Json'
        }
      }
    },
    components: {
    },
    mounted () {
      if (!ls('login')) {
        window.location.href = '/'
      }
    },
    methods: {
      logout () {
        ls.clear()
        window.location.href = '/'
      }
    }
  }
</script>

<style lang="css" scoped>
  #navtopinner {
    padding: 0 10px;
    height: 30px;
    min-height: 30px;
    margin-bottom: 0 !important;
    background-color: #eff5f9;
    font-size: 12px;
  }

  #navtopinner li a {
    line-height: 30px;
    padding-top: 0px;
    padding-bottom: 0px;
    font-size: 12px;
  }

  .ul-nav span, .shu {
    font-size: 13px;
    margin-left: 10px;
    color: #C1D0D2;
  }

  .gongzuo {
    color: #1fa0ff;
  }
</style>
