<template>
  <div id="index">
    <header class="header">
      <div class="logo">
        <a href="."></a>
        <span>长春站</span>
      </div>

      <div class="setting">
        <a href="javascript:void(0);">沈阳局用户03</a>
        <a href="javascript:void(0);">∨</a>
        <a href="javascript:void(0);">08月30日 周三 10:56</a>
      </div>
      <nav>
        <el-menu :default-active="activeIndex" mode="horizontal" :router=true class="menu" @select="handleSelect">
          <el-menu-item index="index">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">设备监控</template>
            <el-menu-item index="2-1">监控设备树</el-menu-item>
            <el-menu-item index="2-2">铁路地图</el-menu-item>
          </el-submenu>
          <el-submenu index="asset">
            <template slot="title">设备管理</template>
            <el-menu-item index="assets">设备列表</el-menu-item>
            <el-menu-item index="3-2">设备报废</el-menu-item>
            <el-menu-item index="3-3">设备资料</el-menu-item>
            <el-menu-item index="3-3">字典管理</el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">故障管理</template>
            <el-menu-item index="4-1">故障上报</el-menu-item>
            <el-menu-item index="4-2">故障处理</el-menu-item>
            <el-menu-item index="4-3">故障查询</el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">报警管理</template>
            <el-menu-item index="5-1">模板配置</el-menu-item>
            <el-menu-item index="5-2">用户组配置</el-menu-item>
            <el-menu-item index="5-3">设备组配置</el-menu-item>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title">监控配置</template>
            <el-menu-item index="6-1">区域配置</el-menu-item>
          </el-submenu>
        </el-menu>
      </nav>
    </header>
    <div class="content">
       <router-view></router-view>
    </div>
   
  </div>
</template>

<script>
import config from '../config'

export default {
  name: 'app',
  data() {
    return {
      activeIndex: '1'
    }
  },

  methods: {
    handleSelect(key, path) {
      // console.log(key, path)
    }
  }
}
</script>

<style lang="scss">
ul {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  color: #fff;
}

#index {
  header.header {
    height: 49px;
    line-height: 49px;
    width: 100%;
    background: #033983;
    color: #fff;

    .logo {
      float: left;
      height: inherit;

      a {
        display: inline-block;
        width: 89px;
        height: 23px;
        background: url("../assets/TFlogo.svg");
        background-size: contain;
        margin-top: 15px;
        margin-left: 50px;
      }

      span {
        margin-left: 16px;
        font-size: 18px;
        font-weight: bold;
      }
    }

    nav {
      width: 600px;
      height: inherit;
      margin: 0 auto;
      position: relative;
      line-height: inherit;
      height: 100%;

      .menu {
        background: none;
        height: 100%;
      }

      .el-menu-item,
      .el-submenu__title {
        height: inherit;
        line-height: inherit;
        width: 95px;
        min-width: 0;
        text-align: center;
        color: #fff;
        background: initial;
        i {
          display: none;
        }
      }

      .el-menu-item.is-active {
        color: #fff;
        background: initial;
      }

      .el-submenu {
        height: inherit;
      }

      .el-menu-item:hover,
      .el-submenu.is-active .el-submenu__title,
      .el-submenu:hover .el-submenu__title {
        border-bottom: 3px solid #ff0034;
      }
      .el-submenu.is-active .el-submenu__title,
      .el-submenu__title:hover {
        background: initial;
      }

      .el-submenu>.el-menu {
        top: initial;
        background: rgba(3, 57, 131, 0.9);
        width: 95px;
        border: none;
        padding: 0;
      }

      .el-submenu>.el-menu .el-menu-item {
        font-size: 12px;
        height: initial;
        line-height: initial;
        border-bottom: none;
        color: #CECBCB;
        padding: 8px;
      }

      .el-submenu>.el-menu .el-menu-item:hover {
        border-bottom: none;
        color: #fff;
      }
    }

    .setting {
      float: right;
      height: inherit;
      padding-left: 5px;
      padding-right: 5px;
      box-sizing: border-box;
      background: #0066cb;
      text-align: center;
      position: relative;
    }
  }

  .content{
    padding: 20px;
  }
}
</style>
