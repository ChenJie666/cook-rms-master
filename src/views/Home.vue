<template>
    <el-container class="container">
        <el-header>
            <div class="header">
                <div class="logo">
                    <img class="login-header-img" src="../assets/img/icon_logo@2x.png" alt=""/>
                    <span class="login-header-title login-header-title-split">&nbsp;|&nbsp;</span>
                    <span class="login-header-title">智慧菜谱管理系统</span>
                </div>
                <div class="user-info">
      <span class="el-dropdown-link">
        <img class="user-logo" src="../assets/img/user.jpg" alt=""/>
        姓名:{{username}}
        <el-button type="info" @click="logout">退出登陆</el-button>
      </span>
                </div>
            </div>
        </el-header>
        <el-container>
            <el-aside class="aside" width="250px">
                <!--          侧边栏-->
                <!--        开启路由模式-->
                <el-menu
                        :router="true"
                        :unique-opened="true"
                >
                    <!--            1-->
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>菜谱管理</span>
                        </template>
                        <el-menu-item index="/menu">
                            <i class="el-icon-food"></i>
                            <span>菜谱列表</span>
                        </el-menu-item>
                        <el-menu-item index="/menu/draft">
                            <i class="el-icon-folder-checked"></i>
                            <span>草稿箱</span>
                        </el-menu-item>
                    </el-submenu>
                    <!--            2-->
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-orange"></i>
                            <span>设备管理</span>
                        </template>
                        <el-menu-item index="2-1">
                            <i class="el-icon-cpu"></i>
                            <span>设备列表</span>
                        </el-menu-item>
                        <el-menu-item index="2-2">
                            <i class="el-icon-bank-card"></i>
                            <span>下柜平台列表</span>
                        </el-menu-item>
                    </el-submenu>
                    <!--            3-->
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-camera"></i>
                            <span>轮播图管理</span>
                        </template>
                        <el-menu-item index="/user">
                            <i class="el-icon-picture"></i>
                            <span>轮播图设置</span>
                        </el-menu-item>
                    </el-submenu>
                    <!--            4-->
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-coin"></i>
                            <span>数据看板</span>
                        </template>
                        <el-menu-item index="/echarts">
                            <i class="el-icon-mobile-phone"></i>
                            <span>App端数据</span>
                        </el-menu-item>
                    </el-submenu>
                    <!--            5-->
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>系统管理</span>
                        </template>
                        <el-menu-item index="5-1">
                            <i class="el-icon-user-solid"></i>
                            <span>管理员列表</span>
                        </el-menu-item>
                        <el-menu-item index="5-2">
                            <i class="el-icon-user"></i>
                            <span>角色管理</span>
                        </el-menu-item>
                    </el-submenu>
                    <!--          6-->
                    <el-submenu index="6">
                        <template slot="title">
                            <i class="el-icon-cloudy"/>
                            <span>应用云管理</span>
                        </template>
                        <el-menu-item index="/application/clock">
                            <i class="el-icon-alarm-clock"/>
                            <span>时钟更新</span>
                        </el-menu-item>
                        <el-menu-item index="/application/weather">
                            <i class="el-icon-sunny"/>
                            <span>天气更新</span>
                        </el-menu-item>
                        <el-menu-item index="/application/festival">
                            <i class="el-icon-magic-stick"/>
                            <span>节日列表</span>
                        </el-menu-item>
                        <el-menu-item index="/application/shortmessage">
                            <i class="el-icon-printer"/>
                            <span>短消息列表</span>
                        </el-menu-item>
                        <el-menu-item index="/application/voice">
                            <i class="el-icon-phone-outline"/>
                            <span>语音包列表</span>
                        </el-menu-item>
                        <el-menu-item index="/application/devicepush">
                            <i class="el-icon-s-promotion"/>
                            <span>物模型推送</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main class="main">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Home",
        beforeCreate() {
            // 获取token  vuex中获取  const token = ...
            // 无 进入到登陆页 if (!token)   this.$router.push({path: 'login'})
            // if token 有 -> 继续渲染  if ()
        },
        data() {
            return {
                username: this.$store.state.loginUserName,
            }
        },
        methods: {
            logout() {
                this.$confirm("确认要退出登录吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.$message.success('退出成功');
                    /*//确认退出，清除token
                    localStorage.removeItem('token')*/
                    this.$router.push({path: '/login'})
                })

            }
        }
    }
</script>

<style>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
        background-color: black;
    }

    .header .logo {
        float: left;
        width: 400px;
        display: flex;
        align-items: center;
        text-align: left;
        padding-left: 59px;
    }

    .login-header-img {
        width: 198px;
        height: 43px;
    }

    .login-header-title {
        font-size: 20px;
        color: #fff;
        font-family: "Microsoft YaHei", 微软雅黑, "Microsoft JhengHei", 华文细黑, STHeiTi;
        font-weight: bold;
    }

    .login-header-title-split {
        font-size: 24px;
    }

    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 14px;
        color: #fff;
    }

    .user-info .el-dropdown-link {
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }

    .user-info .user-logo {
        position: absolute;
        left: 0;
        top: 15px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .container {
        height: 100%;
    }

    .header {
        background-color: #b3c0d1;
    }

    .aside {
        background-color: #d3dce6;
        margin: 10px 0px 0px 0px;
    }

    .main {
        background-color: #e9eef3;
        height: 100%;
    }
</style>
