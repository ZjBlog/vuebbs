<template>
  <div id="login" class="login">
    <yxy-header-outer></yxy-header-outer>
    <div class="main-img">
      <el-row v-if="!authenticated" style="padding-top: 100px;min-height:500px;">
        <div class="main-center">
          <el-card class="box-card">
            <div class="clearfix" style="text-align:center">
              <span class="denglu">
                <i class="fa fa-link" aria-hidden="true"></i>
                <span>欢迎登录</span>
                <i class="fa fa-link" aria-hidden="true"></i>
              </span>
            </div>
            <el-form :model="credentials" :rules="rules" ref="credentials" label-position="right"
                     class="login-form margin-top-20">
              <el-form-item prop="username" class="margin-top-20">
                <el-input v-model="credentials.username" placeholder="请输入帐号">
                  <template slot="prepend">
                    <i class="fa fa-user" aria-hidden="true"></i>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password" class="margin-top-20" style="margin-top: 17px;">
                <el-input type="password" v-model="credentials.password" placeholder="请输入密码" auto-complete="off">
                  <template slot="prepend">
                    <i class="fa fa-lock" aria-hidden="true"></i>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item>
                <a href="/" class="wang">找回密码</a>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="login('credentials')" :loading="login_loading" style="width:360px;">提交</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </el-row>
    </div>
    <yxy-footer></yxy-footer>
  </div>
</template>

<script>
  import YxyFooter from 'components/YxyFooter'
  import YxyHeaderOuter from 'components/YxyHeaderOuter'
  import ls from 'local-storage'
  export default {
    data () {
      return {
        user: {},
        authenticated: false,
        login_loading: false,
        credentials: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入帐号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      }
    },
    components: {
      YxyFooter,
      YxyHeaderOuter
    },
    mounted () {
      if (ls('login')) {
        this.$message({
          message: '已经登录',
          duration: 2000,
          type: 'success',
          onClose: function () {
            window.location.href = '/'
          }
        })
      }
    },
    methods: {
      login (credentials) {
        console.info('......................')
        const vm = this
        this.$refs[credentials].validate((valid) => {
          if (valid) {
            vm.login_loading = true
            vm.$message({
              message: '正在登录...',
              duration: 3000,
              onClose () {
                ls('login', true)
                window.location.href = '/'
              }
            })
          } else {
            vm.$refs[credentials].resetFields()
            vm.$message({
              message: '请重新登录',
              duration: 2000
            })
            return false
          }
        })
      }
    }
  }
</script>

<style lang="css">
  .login-form {
    width: 360px;
  }

  .el-form-item {
    margin-bottom: 0px !important;
  }

  .main-center {
    width: 400px;
    margin: auto;
    border-top: 2px solid #1fa0ff;
  }

  .login {
    background: #eff2f7;
  }

  .denglu {
    font-size: 26px;
    color: #8593a6;
    text-align: center;
    line-height: 80px;
  }

  .denglu span {
    color: #1fa0ff;
    margin: 0 10px;
  }

  .el-input {
    width: 360px;
  }

  .main-img {
    width: 100%;
    min-width: 1200px;
  }

  .margin-top-20 {
    margin-top: 10px;
  }

  .wang {
    float: right;
    font-size: 14px;
    color: #526072;
  }

  .el-input__inner {
    height: 32px !important;
  }


</style>
