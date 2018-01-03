<template> 
    <header id="nav" style="width:100%">
      <div id="header">
        <el-row  type="flex" justify="space-between" align="middle" class="header" :class="classWeb">
          <el-col :span="5" class="nav-img">
            <!--img src="/static/img/logo.png"-->
          </el-col>
          <el-col :span="2" class="nav">
  <a href="#">标题标1</a>
          </el-col>
          <el-col :span="2" class="nav curr">
  <a href="#">标题题2</a>
          </el-col>
          <el-col :span="2" class="nav">
  <a href="#">标标题3</a>
          </el-col>
          <el-col :span="2" class="nav">
  <a href="#">标题题4</a>
          </el-col>
          <el-col :span="2" class="nav">
  <a href="#">题标题5</a>
          </el-col>
          <el-col :span="5" class="nav-input">
            <el-input placeholder="电影、电视剧、影人" v-model="input5" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between" align="middle" class="header" :class="classIpad">
          <el-col :span="8" class="nav-img">
            <img src="/static/img/logo.png">
          </el-col>
          <el-col :span="4" class="nav">
  <a href="#">标题标题1</a>
          </el-col>
          <el-col :span="4" class="nav curr">
  <a href="#">标题标题2</a>
          </el-col>
          <el-col :span="8" class="nav-input">
            <el-input placeholder="电影、电视剧、影人" v-model="input5" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-row  type="flex" justify="center" align="middle" class="header" :class="classPhone" id="down22">
          <el-col :span="12" class="nav-img" style="text-align:center;">
            <img src="/static/img/logo.png" class="img">
          </el-col>
          <el-col :span="12" style="text-align:center;">
          <el-dropdown split-button type="primary">
            <a href="#">标题一</a>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><a href="#">标题二</a></el-dropdown-item>
              <el-dropdown-item><a href="#">标题三</a></el-dropdown-item>
              <el-dropdown-item><a href="#">标题四</a></el-dropdown-item>
              <el-dropdown-item><a href="#">标题五</a></el-dropdown-item>
              <el-dropdown-item><a href="#">标题六</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </el-col>
        </el-row>
      </div>
      <div  :class="classPhone" id="header-phone">
      <el-row  type="flex" class="header" :class="classPhone">
        <el-col :span="24" class="nav-img" style="text-align:center;">
            <el-input placeholder="电影、电视剧、影人" v-model="input5">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </el-col>
      </el-row>
      </div>
    </header>
</template>
<script>
  import 'assets/Lib'
  export default {
    data () {
      return {
        classWeb: 'hidden-sm-and-down',
        classIpad: 'hidden-md-and-up hidden-xs-only',
        classPhone: 'hidden-md-and-up hidden-sm-only',
        input5: ''
      }
    },
    mounted () {
      // window.onscroll = function () {
      //   let t = document.documentElement.scrollTop || document.body.scrollTop
      //   let nav = document.getElementById('nav')
      //   if (t >= 100) {
      //     nav.style.position = 'fixed'
      //   } else {
      //     nav.style.position = ''
      //   }
      // }
    },
    methods: {
      handleClick () {
        alert('button click')
      }
    }
  }
</script>
<style scoped>
#nav{
  z-index: 100000;
  position:fixed;
}
a{
  text-decoration:none;
}
.img{
  margin-top:10px;
  max-width:100%;
}
#header{
  background-color: #ebebeb;
  height:70px;
}
.header{
  max-width:1200px;
  height: 100%;
  margin: 0 auto;
}
.nav{
  text-align:center;
  font-size:16px;
  height: 100%;
  display:inline-flex;
  justify-content:center;
  align-items: center;
  cursor:pointer;
  color: #FFFFFF;
}
.nav-input .nav-img{
  text-align:center;
  font-size:20px;
  height: 100%;
  display:inline-flex;
  justify-content:center;
  align-items: center;
  color: #FFFFFF;
  display: inline-flex;
  justify-content:center;
  align-items: center;
}
.nav a {
  color: #08c68a;
  font-size: 16px;
  text-decoration:none;
  padding:5px 10px;
}
.nav a:hover{
  background:#08c68a;
  display:inline-block;
  color:#fff;
  border-radius:20px;
}
.curr a{
  background:#08c68a;
  display:inline-block;
  color:#fff;
  border-radius:20px;
}

.curr a:hover{
  color:#fff;
}
.input-with-select{
  background-color: #fff;
  width: 90%;
  margin-left: 5%;
}
</style>
<style>
#down22 .el-button--primary{
  background:#08c68a !important;
  border:#08c68a !important;
  vertical-align:bottom;
}

#down22 .el-button--primary a{
  font-size:20px !important;
  color:#fff;
}

#down22 .el-dropdown__icon{
  font-size:20px !important;
}

.el-dropdown-menu{
  width:117px !important;
  text-align:center;
}

.el-dropdown-menu li a{
  color:#333 !important;
}

.el-dropdown-menu li a:hover{
  color:#08c68a !important;
}

#app .el-button{
  border:1px solid #08c68a !important;
}
#app .el-input__inner{
  border:1px solid #08c68a !important;
  border-right:0px !important
}
.el-carousel__arrow{
  font-size: 20px !important;
}
</style>
