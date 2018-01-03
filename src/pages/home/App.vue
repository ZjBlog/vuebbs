<template>
  <div class="index-box">
    <div class="header">
      <div class="box1">
        <div class="logo"></div>
      </div>
      <div class="box2" :class="{'fixed': isFixed}">
        <div class="bb">
          <div class="menu">
            <div class="a" :class="{active: 0 === menuIndex}" @click="menuEvent(0)">
              <span class="title">网站首页</span>
              <span class="english">Home</span>
            </div>
            <div class="a" v-for="(item, index) in menuList" :class="{active: index + 1 === menuIndex}"
                 @click="menuEvent(index + 1)">
              <span class="title">{{ item.text }}</span>
              <span class="english">{{ item.english }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="banner">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide bg1">这世上最快的捷径就是脚踏实地</div>
          <div class="swiper-slide bg2">笔耕不掇，天道酬勤</div>
          <div class="swiper-slide bg3">十年磨一剑，一朝试锋芒</div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="kuai-box" :id="index1 + 1" v-for="(listItem, index1) in menuList" :class="{bgfff: index1 % 2 === 1}">
      <div class="kuai-main">
        <h3>{{ listItem.text }}</h3>
        <div class="desc">{{ listItem.desc }}</div>
        <div class="list">
          <div class="item" @click="location(item)" v-for="(item, index2) in listItem.items" :class="{nom: (index2 + 1) % 3 === 0}">
            <div class="shadow"></div>
            <div class="img-box">
              <img :src="item.img" :class="{img: index1 === 1}"/>
              <div class="imgma-box" if="item.imgma">
                <img :src="item.imgma" class="imgma"/>
              </div>
            </div>
            <div :class="{descinfo1: index1 === 1, descinfo: index1 !== 1}">
              <div class="a-box">
                <h6>{{ item.title }}</h6>
                <span class="time">{{ item.time }}</span>
                <p :class="{height: index1 === 0}" :title="item.content">{{ item.content }}</p>
                <div class="button" v-if="index1 === 0">
                  <div class="btn" @click="officeSitEvent(item, false)">查看[官网]</div>
                  <div class="btn" @click="officeSitEvent(item, true)">查看[模仿]</div>
                </div>
              </div>
            </div>
          </div>
          <div class="kong"></div>
        </div>
      </div>
      <div style="width: 100%;height: 70px;"></div>
    </div>
    <div class="footer">
      <div class="bo">猥琐发育，别浪!</div>
      <canvas id="c"></canvas>
    </div>
  </div>
</template>

<script>
  import data from 'assets/bbs/data.json'
  export default {
    name: 'app',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        isFixed: false,
        menuIndex: 0,
        menuList: [],
        indexHeight: [0]
      }
    },
    created () {
      this.menuList = data.menuList
    },
    mounted () {
      window.aa()
      var me = this
      var s = new window.Swiper('.swiper-container', {
        loop: true,
        direction: 'horizontal',
        speed: 500,
        autoplay: 5000,
        autoplayDisableOnInteraction: false,
        pagination: '.swiper-pagination',
        paginationClickable: true
      })
      console.info(s)
      for (var i = 1; i <= this.menuList.length; i++) {
        var el = document.getElementById(i.toString())
        this.indexHeight.push(el.offsetTop - 60)
      }
      window.onscroll = function () {
        var t = document.documentElement.scrollTop || document.body.scrollTop
        if (t >= 115) me.isFixed = true
        else me.isFixed = false
        for (var i = 0; i < me.indexHeight.length; i++) {
          if (t >= me.indexHeight[i] && t < me.indexHeight[i + 1]) me.menuIndex = i
          if (t >= me.indexHeight[i]) me.menuIndex = i
        }
      }
    },
    methods: {
      menuEvent (id) {
        var el = document.getElementById(id.toString())
        if (id === 0) window.$.scrollTo(0, 600, {axis: 'y'})
        else window.$.scrollTo(el.offsetTop - 60, 600, {axis: 'y'})
      },
      location (item) {
        if (!item.site) {
          if (item.href) window.open(item.href)
        }
      },
      officeSitEvent (item, sign) {
        if (sign) window.open(item.site.model)
        else {
          if (item.site.official !== '') window.open(item.site.official)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  canvas{
	position: absolute;
	cursor: crosshair;
  width:100%;
  height:300px;
  }
  .index-box {
    background: #efefef;
    min-width: 1200px;
    .footer {
      position: relative;
      background: url("https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/home/GIF2.gif") no-repeat center center;
      background-size: 150%;
      width: 100%;
      height: 300px;
      .bo {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        background: rgba(0, 0, 0, 0.4);
        line-height: 300px;
        text-align: center;
        font-size: 50px;
        color: #fff;
      }

    }
    .kuai-box {
      width: 100%;
      &.bgfff {
        background: #fff;
      }
      .kuai-main {
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        h3 {
          text-align: center;
          padding: 30px 0 0 0;
          font-weight: 800;
          font-size: 33px;
          margin: 15px;
        }
        .desc {
          text-align: center;
          font-size: 16px;
        }
        .list {
          width: 100%;
          height: 100%;
          font-size: 0;
          .item {
            width: 30%;
            height: 348px;
            background: #fff;
            margin-top: 50px;
            margin-right: 5%;
            display: inline-block;
            cursor: pointer;
            position: relative;
            &.nom {
              margin-right: 0;
            }

            .shadow {/* 渐变阴影 */
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
              opacity: 0;
              transition: opacity 0.7s;
              z-index: 0;
            }
            &:hover .shadow {
              opacity: 1;
            }
            &:hover .descinfo {
              height: 180px;
              top: 150px;
            }
            &:hover .img {
              height: 0;
            }
            .img-box {
              width: 100%;
              height: 225px;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
                transition: height 0.5s;
              }
              .imgma-box {
                width: 100%;
                height: 100%;
                position: relative;
                background: #333;
                .imgma {
                  height: 150px;
                  width: 150px;
                  display: block;
                  position: absolute;
                  margin: auto;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                }
              }
            }

            .descinfo {
              width: 100%;
              height: 105px;
              top: 225px;
              background: #fff;
              padding-top: 5%;
              overflow: hidden;
              position: absolute;
              transition: all 0.5s;
              .a-box {
                width: 90%;
                height: 88%;
                font-size: 16px;
                margin: 0 5% 4% 5%;
                overflow: hidden;
                h6 {
                  margin: 0;
                  padding: 0;
                  line-height: 20px;
                  font-size: 16px;
                  font-weight: normal;
                  &:hover {
                    color: #f7a327;
                  }
                }
                .time {
                  font-size: 12px;
                  line-height: 30px;
                }
                p {
                  font-size: 13px;
                  color: #888;
                  line-height: 20px;
                  margin: 0;
                  &.height {
                    height: 40px;
                  }
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                }
                .button {
                  width: 100%;
                  height: 50px;
                  font-size: 0;
                  margin-top: 20px;
                  .btn {
                    width: 40%;
                    height: 36px;
                    display: inline-block;
                    margin: 0 5%;
                    background: red;
                    color: #fff;
                    font-size: 14px;
                    text-align: center;
                    line-height: 36px;
                    border-radius: 18px;
                    &:hover {
                      background: #dd161e;
                    }
                  }
                }
              }
            }
            .descinfo1 {
              width: 100%;
              height: 105px;
              top: 225px;
              background: #fff;
              padding-top: 5%;
              overflow: hidden;
              position: absolute;
              transition: all 0.5s;
              .a-box {
                width: 90%;
                height: 88%;
                font-size: 16px;
                margin: 0 5% 4% 5%;
                overflow: hidden;
                h6 {
                  margin: 0;
                  padding: 0;
                  line-height: 20px;
                  font-size: 16px;
                  font-weight: normal;
                  &:hover {
                    color: #f7a327;
                  }
                }
                .time {
                  font-size: 12px;
                  line-height: 30px;
                }
                p {
                  font-size: 13px;
                  color: #888;
                  line-height: 20px;
                  margin: 0;
                  height: 40px;

                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                }
              }
            }
          }
          .kong {
            width: 5%;
            height: 100px;
            display: inline-block;
          }
        }
      }
    }
    .header {
      width: 100%;
      height: 180px;
      color: #333;
      background: #fff;
      .box1 {
        width: 100%;
        margin: 0 auto;
        height: 115px;
        border-bottom: 1px solid #eee;
        .logo {
          width: 1200px;
          height: 115px;
          margin: 0 auto;
          background: url("https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/home/logo.jpg") no-repeat center center;
          background-size: 260px;
        }
      }
      .box2 {
        width: 100%;
        height: 65px;
        background: #fff;
        border-bottom: 1px solid #dedede;
        &.fixed {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 10;
        }
        .bb {
          width: 1200px;
          margin: 0 auto;
          height: 100%;
          .menu {
            width: 100%;
            height: 65px;
            display: flex;
            flex-flow: row;
            .a {
              height: 65px;
              line-height: 65px;
              width: 100%;
              text-align: center;
              text-decoration: none;
              box-sizing: border-box;
              color: #333;
              cursor: pointer;
              &.active {
                background: #fcaa31;
                color: #fff !important;
              }
              &:hover {
                color: #fcaa31;
              }
              .title {
                width: 100%;
                display: block;
                line-height: 20px;
                margin-top: 12px;
                font-size: 18px;
              }
              .english {
                width: 100%;
                display: block;
                margin-top: 3px;
                line-height: 20px;
                font-size: 15px;
              }
            }
          }
        }
      }
    }

    .banner {
      width: 100%;
      min-width: 1200px;
      height: 500px;
      position: relative;
      top: 0;
      .swiper-slide {
        font-size: 70px;
        color: #fff;
        line-height: 500px;
        text-align: center;
        text-shadow: 5px 5px 14px rgba(0, 0, 0, 0.6);
      }
      .bg1 {
        height: 100%;
        background: url("https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/home/banner/banner1.png") no-repeat center center;
        background-size: 100%;
      }
      .bg2 {
        height: 100%;
        background: url("https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/home/banner/banner2.png") no-repeat center center;
        background-size: 100%;
      }
      .bg3 {
        height: 100%;
        background: url("https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/home/banner/banner4.png") no-repeat center center;
        background-size: 100%;
      }
      .bg4 {
        height: 100%;
        background: url("https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/home/banner/banner4.png") no-repeat center center;
        background-size: 100%;
      }
      .bg5 {
        height: 100%;
        background: url("https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/home/banner/banner5.png") no-repeat center center;
        background-size: 100%;
      }
      .bg6 {
        height: 100%;
        background: url("https://raw.githubusercontent.com/beautifulBoys/beautifulBoys.github.io/master/source/home/banner/banner6.png") no-repeat center center;
        background-size: 100%;
      }
      .swiper-container {
        height: 500px;
      }
    }
  }


</style>
