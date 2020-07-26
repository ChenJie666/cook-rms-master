<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
    export default {
        name: "MyBread",
        data() {
            return {
                // level1: '',
                // level2: ''
            }
        },
        // props 值字符串数组 用法与data一直  传值   组件属性
        props:['level1','level2']
    }
</script>

<style scoped>

</style>
