<template>
  <el-card class="box-card">
    <el-form ref="menuForm" :model="formMenu" >
      <el-form-item label="菜谱名称:" label-width="100px">
        <el-input v-model="formMenu.name" placeholder="请输入菜谱名称" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="菜谱难度:" label-width="100px">
        <el-select v-model="formMenu.deg" placeholder="请选择菜谱难度">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
          <el-option label="4" value="4"></el-option>
          <el-option label="5" value="5"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预计用时:" label-width="100px" style="width:200px">
        <el-input v-model="formMenu.tm" ></el-input>
      </el-form-item>
      <el-form-item label="菜谱头图:" label-width="100px" style="width:200px">
        <el-input v-model="formMenu.menuUrl" ></el-input>
      </el-form-item>
<!--      table表格形式可以实现表格的增加一行-->
      <el-form-item label="食材清单:" label-width="100px">
        <el-table
                border
                :data="fl1"
                style="width: 50%">
          <el-table-column fixed="left"  label="食材名称" min-width="30">
            <template slot-scope="scope">
              <el-input v-model="scope.row.name"></el-input>
            </template>
          </el-table-column>
          <el-table-column  label="分量" min-width="20">
            <template slot-scope="scope">
              <el-input v-model="scope.row.weight"></el-input>
            </template>
          </el-table-column>
          <el-table-column
                  fixed="right"
                  label="操作"
                  width="120">
            <template slot-scope="scope">
              <el-button
                      @click.native.prevent="deleteFl(scope.$index, formMenu.fl)"
                      type="text"
                      size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="success" @click="addFlListRow()" round>添加一行</el-button>
      </el-form-item>
      <el-form-item label-width="100px">
        <el-input v-model="formMenu.fl" type="hidden"></el-input>
      </el-form-item>
      <el-form-item label="图文步骤:" label-width="100px">
        <el-table
                border
                :data="formMenu.cookSteps"
                style="width: 70%">
          <el-table-column fixed="left"  label="图片url" min-width="20">
            <template slot-scope="scope">
              <el-input v-model="scope.row.stepUrl"></el-input>
            </template>
          </el-table-column>
          <el-table-column  label="图片说明" min-width="40">
            <template slot-scope="scope">
              <el-input v-model="scope.row.description"></el-input>
            </template>
          </el-table-column>
          <el-table-column
                  fixed="right"
                  label="操作"
                  min-width="10">
            <template slot-scope="scope">
              <el-button
                      @click.native.prevent="deleteCookStep(scope.$index, formMenu.cookSteps)"
                      type="text"
                      size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="success" @click="addCookStepsListRow()" round>添加一行</el-button>
      </el-form-item>
      <el-form-item label="小贴士:" label-width="100px">
        <el-input v-model="formMenu.tip"
                  placeholder="请输入小贴士"
                  style="width:300px"
                  type="textarea"
                  maxlength="200"
                  show-word-limit
                  clearable
        ></el-input>
      </el-form-item>
      <el-form-item label-width="100px">
        <el-checkbox v-model="formMenu.isOfficial">是否发布为官方菜谱</el-checkbox>
      </el-form-item>
      <el-form-item label-width="100px">
        <el-button type="primary" @click="addMenuDraftForm()">存为草稿</el-button>
        <el-button type="primary" @click="addMenuForm()">上传</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
    export default {
        name: "AddMenu",
        data() {
            return {
                formMenu: {
                    // 菜谱的名称
                    name: '',
                    // 菜谱的难度
                    deg: '',
                    // 菜谱预计烹饪时间
                    tm: '',
                    // 图片url地址
                    menuUrl: '',
                    // 传输给后台的食材清单
                    fl: '',
                    // 图文菜谱做菜步骤
                    cookSteps: [],
                    deviceImgs: [],
                    // 小贴士
                    tip: '',
                    // 是否为官方
                    isOfficial: null,
                    publishStatus: null,
                },
                // fl1 为了动态表单
                fl1: [],
            }
        },
        methods: {
            // 添加菜谱
            addFlListRow() {
                this.fl1.push({
                    "name": "",
                    "weight": "",
                })
            },
            addCookStepsListRow() {
                this.formMenu.cookSteps.push({
                    "stepUrl": "",
                    "description": "",
                })
            },
            deleteFl(index, rows) {
                rows.splice(index, 1);
            },
            deleteCookStep(index, rows) {
                rows.splice(index, 1);
            },
            addMenuDraftForm() {
                // 草稿状态为0 menuForm
                console.log("存为草稿")
                this.$refs.menuForm.validate((valid) => {
                    if (valid) {
                        this.formMenu.publishStatus = 0;
                        this.formMenu.fl = JSON.stringify(JSON.parse(this.fl1));
                        // console.log(this.formMenu.fl);
                        // console.log(valid);
                        // 对象转成json对象
                        let formData = JSON.stringify(this.formMenu);
                        let config = {
                            headers: {"Content-Type": "application/json;charset=UTF-8"}
                        };
                        let url = "/api/menu/addMenu";
                        this.$axios.post(url, formData, config).then(res => {
                            if (res.status === 200) {
                                this.$message.success("添加成功");
                                // 防止表单记录上次记录
                                this.formMenu={brand_right:0};
                                // 添加成功跳转到菜谱页面
                                this.$router.push({path:"/menu"});
                            } else {
                                console.log('error submit!!');
                                return false;
                            }
                        });
                    }
                });

            },
            addMenuForm(){
              // 上架状态为1
                console.log("上架");
                this.$refs.menuForm.validate((valid) => {
                    if (valid) {
                        this.formMenu.publishStatus = 1;
                        this.formMenu.fl = JSON.stringify(this.fl1);
                        // console.log(this.formMenu.fl);
                        console.log(valid);
                        // 对象转成json对象
                        let formData = JSON.stringify(this.formMenu);
                        let config = {
                            headers: {"Content-Type": "application/json;charset=UTF-8"}
                        };
                        let url = "/api/menu/addMenu";
                        this.$axios.post(url, formData, config).then(res => {
                            if (res.status === 200) {
                                this.$message.success("添加成功");
                                // 防止表单记录上次记录
                                this.formMenu={brand_right:0};
                                // 添加成功跳转到菜谱页面
                                this.$router.push({path:"/menu"});
                            } else {
                                console.log('error submit!!');
                                return false;
                            }
                        });
                    }
                });

            },

        }
    }
</script>

<style scoped>
  .el-form-item {
    margin: 20px 20px ;
  }
</style>
