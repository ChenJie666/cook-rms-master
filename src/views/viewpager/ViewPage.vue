<template>
  <el-card class="box-card">
    <!--   面包屑-->
    <!--    / 首页 / 用户管理 / 用户列表-->
    <my-bread level1="轮播图管理" level2="轮播列表"></my-bread>
    <el-row class="searchRow">
      <el-button size="medium" type="success" @click="dialogFormAdd = true">添加轮播</el-button>
    </el-row>

    <el-table
            :data="viewPagerDataList"
            border
            style="width: 100%"
            ref="multipleTable">
      <el-table-column
              align="center"
              type="index"
              label="轮播图序号"
              min-width="2">
      </el-table-column>
      <el-table-column label="配图" min-width="20" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.viewUrl" alt="图片消失" width="50" height="50">
        </template>
      </el-table-column>
      <el-table-column
              align="center"
              prop="viewLink"
              label="跳转链接"
              min-width="16">
      </el-table-column>
      <el-table-column
              align="center"
              prop="sequence"
              label="顺序号"
              min-width="2">
      </el-table-column>
      <el-table-column
            align="center"
            label="未发布/发布"
            min-width="10">
      <template slot-scope="scope">
        <el-tooltip :content="'Switch value: ' + scope.row.publishStatus" placement="top">
        <el-switch v-model="scope.row.publishStatus"
                   active-color="#13ce66"
                   :active-value="1"
                   inactive-color="#ff4949"
                   :inactive-value="0"
                   @change="changeSwitch(scope.row)">
        </el-switch>
        </el-tooltip>
      </template>
    </el-table-column>
      <el-table-column
              align="center"
              prop="createTime"
              label="创建时间"
              min-width="10">
      </el-table-column>
      <el-table-column
              align="center"
              prop="updateTime"
              label="更新时间"
              min-width="10">
      </el-table-column>
      <el-table-column
              align="center"
              label="操作"
              min-width="20">
        <template slot-scope="scope">
          <el-button
                  size="mini" type="warring" icon="el-icon-edit" @click="handleEditViewPager(scope.row)">编辑
          </el-button>
          <el-button
                  size="mini"
                  type="danger" icon="el-icon-delete" @click="handleDeleteViewPager(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--    添加轮播图列表-->
    <el-dialog title="添加轮播图" :visible.sync="dialogFormAdd">
      <el-form :model="viewPager" ref="viewPagerForm">
        <el-form-item label="图片url" prop="viewUrl">
          <el-input v-model="viewPager.viewUrl" clearable></el-input>
        </el-form-item>
        <el-form-item label="跳转链接" prop="viewLink">
          <el-input v-model="viewPager.viewLink" clearable></el-input>
        </el-form-item>
        <el-form-item label="顺序号" prop="sequence">
          <el-input v-model="viewPager.sequence" clearable></el-input>
        </el-form-item>
        <el-form-item label="发布状态" prop="publishStatus">
          <el-select v-model="viewPager.publishStatus" placeholder="请选择是否发布">
            <el-option label="发布" value=1></el-option>
            <el-option label="不发布" value=0></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addViewPager()">提交</el-button>
          <el-button @click="resetForm('viewPagerForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

<!--    修改轮播图的数据-->
    <el-dialog title="修改轮播图" :visible.sync="dialogFormUpdate">
      <el-form :model="updateViewPager" ref="updateViewPagerForm">
        <el-form-item label="图片url" prop="viewUrl">
          <el-input v-model="updateViewPager.viewUrl" clearable></el-input>
        </el-form-item>
        <el-form-item label="跳转链接" prop="viewLink">
          <el-input v-model="updateViewPager.viewLink" clearable></el-input>
        </el-form-item>
        <el-form-item label="顺序号" prop="sequence">
          <el-input v-model="updateViewPager.sequence" clearable></el-input>
        </el-form-item>
        <el-form-item label="发布状态" prop="publishStatus">
<!--          <el-input v-model="updateViewPager.publishStatus" clearable></el-input>-->
          <el-select v-model="updateViewPager.publishStatus" placeholder="请选择是否发布">
            <el-option label="发布" value= "1"></el-option>
            <el-option label="不发布" value= "0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateViewPagerForm()">提交</el-button>
          <el-button @click="resetForm('updateViewPagerForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </el-card>
</template>

<script>
    export default {
        name: "ViewPage",
        data() {
            return {
                viewPagerDataList: [],
                multipleSelection: [],
                dialogFormAdd: false, // 添加弹出框的状态
                dialogFormUpdate: false, // 编辑弹出框的状态
                viewPager: { //添加轮播图数据表单
                    viewUrl: '',
                    viewLink: '',
                    sequence: null,
                    publishStatus: null,
                },
                updateViewPager:{
                    viewUrl: '',
                    viewLink: '',
                    sequence: null,
                    publishStatus: null,
                },
                msg: "", //记录每一条的信息，便于取id
                deleteDate: [],//存放删除的数据
            }
        },
        created() {
            this.findViewPager();
        },
        methods: {
            findViewPager() {
                this.$axios.get("/api/menu/findAllViewPager", {
                    params: {
                        usertype: ''
                    }
                }).then(res => {
                    if (res.status === 200) {
                        this.viewPagerDataList = res.data.data;
                        console.log(res.data.data);
                    } else {
                        this.$alert("查询轮播图列表失败");
                    }
                })
            },
            addViewPager() {
                this.$refs.viewPagerForm.validate((valid) => {
                    if (valid) {
                        console.log(valid);
                        // 对象转成json对象
                        let formData = JSON.stringify(this.viewPager);
                        // console.log(formData);
                        let config = {
                            headers: {"Content-Type": "application/json;charset=UTF-8"}
                        };
                        let url = "/api/menu/addViewPager";
                        this.$axios.post(url, formData, config).then(res => {
                            if (res.status === 200) {
                                this.$message.success("添加成功");
                                // 添加成功弹框消失
                                this.dialogFormAdd = false;
                                // 防止表单记录上次记录
                                this.viewPager={brand_right:0}
                                // 添加成功后刷新界面
                                this.findViewPager();
                            } else {
                                console.log('error submit!!');
                                return false;
                            }
                        });
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            handleDeleteViewPager(id) {
                this.$confirm("确认要删除该记录吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                });
                this.$axios.delete("/api/menu/deleteViewPager", {
                    params: {
                        viewPagerId: id
                    }
                }).then(res => {
                    if (res.data.status === 200) {
                        this.findViewPager();
                    } else {
                        this.$alert("删除失败，请刷新后重试!", "提示");
                    }
                })
            },
            // 编辑轮播图
            handleEditViewPager(row) {
                // 编辑的菜谱对象
                console.log(row);
                this.dialogFormUpdate = true;
                this.updateViewPager = row;
            },
            updateViewPagerForm() {
                this.$refs.updateViewPagerForm.validate((valid) => {
                    if (valid) {
                        // 对象转成json对象
                        let formData = JSON.stringify(this.updateViewPager);
                        console.log(formData);
                        let config = {
                            headers: {"Content-Type": "application/json;charset=UTF-8"}
                        };
                        let url = "/api/menu/updateViewPager";
                        this.$axios.post(url, formData, config).then(res => {
                            if (res.status === 200) {
                                this.$message.success("修改成功");
                                // 添加成功弹框消失
                                this.dialogFormUpdate = false;
                                // 添加成功后刷新界面
                                this.findViewPager();
                            } else {
                                console.log('error submit!!');
                                return false;
                            }
                        });
                    }
                });
            },
            changeSwitch (viewPager) {
                let formData = JSON.stringify(viewPager);
                console.log(formData);
                let config = {
                    headers: {"Content-Type": "application/json;charset=UTF-8"}
                };
                let url = "/api/menu/updateViewPager";
                this.$axios.post(url, formData, config).then(res => {
                    if (res.status === 200) {
                        console.log(viewPager)
                        this.$message.success("修改成功");
                        // 添加成功弹框消失
                        // this.dialogFormUpdate = false;
                        // 添加成功后刷新界面
                         this.findViewPager();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>

  .box-card {
    height: 100%;
  }

  .searchRow {
    margin: 30px 0px 30px 0px;
  }
</style>
