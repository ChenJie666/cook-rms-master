<template>
    <div class="FestivalList">

        <!-- 添加记录 -->
        <el-button type="text" @click="dialogFormVisible = true">添加节日播报记录</el-button>

        <el-dialog title="添加节日播报记录" :visible.sync="dialogFormVisible">
            <el-form :model="festivalBroadcast">
                <el-form-item label="播报日期" label-width="120px">
                    <!--                    <el-input v-model="festivalBroadcast.broadcastDay" autocomplete="off"></el-input>-->
                    <span class="demonstration"></span>
                    <el-date-picker
                            v-model="festivalBroadcast.broadcastDay"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>

                <el-upload
                        action="/cloud/application/upload"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="fileVO.webUrl" alt="">
                </el-dialog>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>


        <!-- 展示记录 -->
        <el-table :data="records"
                  style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="id">
                            <span>{{props.row.id}}</span>
                        </el-form-item>
                        <el-form-item label="播报日期">
                            <span>{{props.row.broadcastDay}}</span>
                        </el-form-item>
                        <el-form-item label="文件名">
                            <span>{{props.row.name}}</span>
                        </el-form-item>
                        <el-form-item label="链接地址">
                            <span>{{props.row.url}}</span>
                        </el-form-item>
                        <el-form-item label="文件大小">
                            <span>{{props.row.size}}</span>
                        </el-form-item>
                        <el-form-item label="MD5值">
                            <span>{{props.row.md5}}</span>
                        </el-form-item>
                        <el-form-item label="时间戳">
                            <span>{{props.row.timestamp}}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{props.row.createTime}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column fixed type="index"/>
            <el-table-column label="播报日期" prop="broadcastDay"/>
            <el-table-column label="文件名" prop="name"/>
            <el-table-column label="创建时间" prop="createTime"/>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button @click="updateHoliday()" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteById(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <br>

        <!-- 分页功能 -->
        <span class="demonstration"></span>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageCurrent"
                :page-sizes="[10,20,50,100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
    </div>

</template>

<style>
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
    }
</style>

<script>
    import festival from '../../api/application/festival'

    export default {
        name: 'FestivalList',
        data() {
            return ({
                total: 0,
                pages: 0,
                records: [],
                pageCurrent: 1,
                pageSize: 10,
                festivalBroadcast: {
                    broadcastDay: "",
                    url: "",
                    timestamp: null,
                    md5: null,
                    size: null,
                },
                dialogFormVisible: false,
                dialogVisible: false,
                fileVO: {
                    webUrl: "",
                    md5: "",
                    size: null
                }
            })
        },
        created() {
            this.getHolidayList(1)
        },
        methods: {
            //增删改查功能
            getHolidayList(pageCurrent) {
                this.pageCurrent = pageCurrent;
                festival.getHolidayList(this.pageCurrent, this.pageSize)
                    .then(response => {
                        console.log(response);
                        let data = response.data;
                        this.total = data.total;
                        this.pages = data.pages;
                        this.records = data.records;
                        this.pageCurrent = data.current;
                        this.pageSize = data.size;
                    }).catch(error => {
                    console.log(error)
                })
            },
            addHoliday() {
                festival.addHoliday()
            },
            updateHoliday() {
                festival.updateHoliday()
            },
            deleteById(id) {
                this.$confirm('确认删除该记录？', '提示', {
                    confirmButtonClass: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        festival.deleteHoliday(id)
                            .then(response => {
                                this.getHolidayList(1);
                                console.log(response);
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                })
                            }).catch(error => {
                            console.log(error)
                        });
                    })
                    .catch(error => {
                        console.log(error)
                    });
            },
            //分页功能
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.getHolidayList(this.pageCurrent)
            },
            handleCurrentChange(pageCurrent) {
                this.pageCurrent = pageCurrent;
                this.getHolidayList(this.pageCurrent)
            },
            //文件上传功能
            handleRemove(file, fileList) {
                console.log("handleRemove" + file, fileList);
                this.fileVO.webUrl = {webUrl: "",md5: "",size: null};
            },
            handlePictureCardPreview(file) {
                console.log("handlePictureCardPreview:" + file)
                this.dialogImageUrl = fileVO.webUrl;
                this.dialogVisible = true;
            }
        },
        computed: {}
    }
</script>
