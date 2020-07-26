<template>
  <el-card class="box-card">
    <my-bread level1="菜谱管理" level2="菜谱列表"></my-bread>
    <el-row class="searchRow">
      <el-col :span="10">
        <div class="grid-content bg-purple">
          <el-button size="medium" type="success" @click="addMenu()">添加菜谱</el-button>
          <el-button size="medium" type="info" @click="batchAddMenu = true">批量发布</el-button>
          <el-button size="medium" type="warning" @click="batchSoldOut = true">批量下架</el-button>
          <el-button size="medium" type="danger" @click="batchDeleteMenu = true">批量删除</el-button>
        </div>
      </el-col>
      <el-col :span="4" :offset="8">
        <div class="grid-content bg-purple">
          <el-input placeholder="搜索菜谱"
                    v-model="menuName"
                    clearable
                    @clear="loadMenuDataList()">
            <el-button slot="append"  icon="el-icon-search" @click="search()"></el-button>
          </el-input>
        </div>
      </el-col>
    </el-row>

    <el-table
            :data="MenuDataList"
            style="width: 100%"
            border>
      <el-table-column
              type="selection"
              min-width="10">
      </el-table-column>
      <el-table-column
              align="center"
              label="菜谱名称"
              min-width="20"
              prop="name">
      </el-table-column>
      <el-table-column
              align="center"
              label="头图"
              min-width="20">
        <template slot-scope="scope">
          <img :src="scope.row.menuUrl" alt="图片消失" width="50" height="50">
        </template>
      </el-table-column>
      <el-table-column
              align="center"
              label="菜谱Id"
              min-width="10"
              prop="id">
      </el-table-column>
      <el-table-column
              align="center"
              label="菜谱属性"
              min-width="10"
              prop="isOfficial">
      </el-table-column>
      <el-table-column
              align="center"
              label="发布状态"
              min-width="10"
              prop="publishStatus"
              :formatter="isPublishStatus">
      </el-table-column>
      <el-table-column
              align="center"
              label="上传用户"
              min-width="10"
              prop="authorName">
      </el-table-column>
      <el-table-column
              align="left"
              label="操作"
              min-width="10">
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="r_page">
      <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10,20,30,50,100,200,500]"
              :page-size="limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
  import PublishStatusEnums from "../../enums/PublishStatusEnums";
  export default {
        name: "Menu",
        data() {
            return {
                MenuDataList: [],
                limit: 10, // 每页显示的条数
                total: 0, // 总条数
                currentPage: 1, // 当前页
                menuName: '',
            }
        },
        created() {
          this.findCheckMenuList();
        },
        methods: {
            findCheckMenuList() {
                this.$axios.get('/api/menu/findCheckMenuList',{
                    params: {
                        page: this.currentPage,
                        pageSize: this.limit,
                        name: this.menuName
                    }
                }).then(res=> {

                    if(res.status === 200) {
                        if (res.data.data == null) {
                            this.$message.error("该菜谱不存在");
                        }
                        this.MenuDataList = res.data.data.dataList;
                        this.total = res.data.data.total;

                        console.log("请求成功");
                    } else {
                        console.log("请求失败");
                    }
                })
            },
            // 每页显示条数
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                // 改变每页显示的条数
                this.limit = val;
                // 注意: 在改变每页显示的条数时,要将页码显示到第一页
                this.currentPage = 1;
                if (this.menuName != null) {
                    this.search();
                }

                this.findCheckMenuList();
            },
            // 显示第几页
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
                if (this.menuName != null) {
                    this.search();
                }
                this.findCheckMenuList();
            },
            handleEdit(id) {
                // 查询菜谱详情 并对它进行更新操作
                this.$router.push({path: "/menu/detail",
                    query: {
                        id: id
                    }
                })

                // console.log(index, row);
            },
            handleDelete(id) {
                // console.log(index, row);
                // 删除方法 需要传入菜谱Id
                this.$confirm("确认要删除该记录吗?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(()=>{
                    this.$axios.delete("/api/menu/deleteMenu", {
                        params: {
                            menuId: id
                        }
                    }).then(res => {
                        if (res.data.status === 200) {
                            this.$message.success("删除成功");
                            this.findCheckMenuList();
                        } else {
                            this.$alert("删除失败，请刷新后重试!", "提示");
                        }
                    })
                })
            },
            loadMenuDataList() {
                this.findCheckMenuList();
            },
            search() {
                this.currentPage = 1;
                this.findCheckMenuList();
            },
            addMenu() {
                console.log("添加菜谱");
                this.$router.push({path:"/menu/add"})
            },
            isPublishStatus(val) {
                return PublishStatusEnums.isPublishStatus(val.publishStatus)
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

  .r_page {
    float: right;
  }
</style>
