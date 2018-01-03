<template>
  <!-- Static navbar -->
  <nav id="navtopouter">
    <div class="container">
      <div id="navbar">
        <ul class="ul-list">
          <li v-if="user.authenticated">
            <a href="#">
              <i class="fa fa-user-o" aria-hidden="true"></i>
              <span>欢迎您 , {{user.nickname}}<span class="shu">|</span></span>
            </a>
          </li>
          <li v-if="user.authenticated">
            <a href="/">工作空间<span class="shu">|</span></a>
          </li>
          <li v-if="!user.authenticated">
            <a href="/pages/login.html">
              <i class="fa fa-user" aria-hidden="true"></i>
              登录</a></li>
          <li v-if="user.authenticated">
            <el-dropdown trigger="click">
              <a href="#" class="el-dropdown-link">
                <span>个人设置</span>
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </a>
              <el-dropdown-menu slot="dropdown" class="parson">
                <el-dropdown-item>
                  <a href="/">
                    <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                    <span>个人设置</span>
                  </a>
                </el-dropdown-item>
                <el-dropdown-item>
                  <a href="#" @click="logout">
                    <i class="fa fa-sign-out" aria-hidden="true"></i>
                    <span>退出登录</span>
                  </a>

                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
          authenticated: ls('login'),
          nickname: 'Json'
        }
      }
    },
    components: {
    },
    mounted () {
    },
    methods: {
      logout () {
        this.user.authenticated = false
        ls.clear()
      }
    }
  }
</script>

<style lang="css" scoped>
  #navtopouter {
    height: 30px;
    min-width: 1200px;
    min-height: 30px;
    margin-bottom: 0 !important;
    font-size: 12px;
    background-color: #eff5f9;
  }

  .container {
    width: 1200px !important;
    margin: auto;
  }

  #navtopouter li a {
    line-height: 30px;
    padding-top: 0px;
    padding-bottom: 0px;
    font-size: 12px;
  }

  .shu {
    font-size: 13px;
    margin-left: 10px;
    color: #C1D0D2;
  }

  .man {
    margin-inline-end: 30px;
    vertical-align: text-top;
    margin-top: 1px;
    margin-right: 5px;
  }

  .parson a {
    display: block;
    width: 100px;
    text-align: center;
  }

  .parson li {
    padding: 0px !important;
  }

</style>
