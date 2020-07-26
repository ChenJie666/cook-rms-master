<template>
  <div class="login-wrap">
    <el-form
            class="login-form"
            label-position="top"
            label-width="80px"
            :rules="rules"
            ref="ruleForm"
            :model="ruleForm">
      <h2>用户登录</h2>
      <el-form-item prop="username" label="用户名">
        <el-input
                v-model="ruleForm.username"
                size="medium"
                aria-placeholder="请输入用户名"
                suffix-icon="el-icon-user-soild"
                autofocus
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input
                v-model="ruleForm.password"
                show-password
                aria-placeholder="请输入密码"
                size="medium"
                @keyup.enter.native="submitForm('ruleForm')"
        ></el-input>
      </el-form-item>
      <el-button class="login-btn" type="primary" size="medium" @click="submitForm('ruleForm')">登录</el-button>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                ruleForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [{required: true, message: "请输入用户名", trigger: "blur"}],
                    password: [{required: true, message: "请输入密码", trigger: "blur"}]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs.ruleForm.validate(valid=> {
                    if (valid) {
                        // let formData = JSON.stringify(this.ruleForm);
                        // let config = {
                        //     header: {"Content-Type":"application/json;charset=UTF-8"}
                        // };
                        // this.$axios.post("/api/11",formData,config).then(res => {
                        //     if (res.status === 200) {
                        //         if (res.data == true) {
                        //             this.$store.state.loginUserName = this.ruleForm.username;
                        //             this.$router.push({
                        //                 path: "/index"
                        //             });
                        //         }else {
                        //             this.$alert("用户名或密码错误","提示");
                        //         }
                        //     }else {
                        //         console.log("error submit!");
                        //         return false;
                        //     }
                        // })
                        // 登录成功 保存token交于vuex管理
                        // 例如 'token',data.token

                        // 登陆账号名称交于vuex管理
                        this.$store.state.loginUserName = this.ruleForm.username;
                        // 跳转路径
                        this.$router.push({path: "/home"});
                        // 提示信息
                        this.$message.success("登录成功")
                        // 后台提供该信息
                        // this.$message.warn(msg)
                    }
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .login-wrap {
    height: 100%;
    background-color: #324152;
    /* 弹性盒子*/
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-wrap .login-form {
    width: 400px;
    background-color: #fff;
    border-radius: 5px;
    padding: 30px;
  }
  .login-wrap .login-btn{
    width: 100%;
  }

</style>
