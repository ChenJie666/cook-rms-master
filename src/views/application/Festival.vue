<template>
    <div class="FestivalList">

        <br>
        <!-- 添加记录 -->
        <el-button type="primary" @click="dialogFormVisible = true">添加节日播报记录</el-button>
        <el-dialog title="添加节日播报记录" :visible.sync="dialogFormVisible">
            <el-form label-position="right" label-width="20px" :model="festivalBroadcast">
                <el-form-item label="播报日期" label-width="100px">
                    <el-date-picker
                            v-model="festivalBroadcast.broadcastDay"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="播报日期" label-width="100px">
                    <el-upload
                            action="/cloud/application/upload"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-success="handleSuccess">
                        <i class="el-icon-plus"/>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="fileVO.url" alt="">
                    </el-dialog>
                </el-form-item>


            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addHoliday">确 定</el-button>
                <!--                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
            </div>
        </el-dialog>

        <br>
        <br>

        <!-- 展示记录 -->
        <el-table :data="records"
                  style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="right" label-width="100px" inline class="demo-table-expand">
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
                            <span><a href="url">{{props.row.url}}</a></span>
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
                    <!--                    <el-button @click="updateHoliday()" type="text" size="small">编辑</el-button>-->
                    <el-button @click="deleteById(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <br>

        <!-- 分页功能 -->
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

<style scoped src="../../assets/css/application.css"/>

<script>
    import festival from '../../api/application/festival'

    export default {
        name: 'FestivalList',
        data() {
            return ({
                //分页
                total: 0,
                pages: 0,
                records: [],
                pageCurrent: 1,
                pageSize: 10,
                //添加&更新
                festivalBroadcast: {
                    id: null,
                    broadcastDay: "",
                    url: "",
                    timestamp: null,
                    md5: null,
                    size: null,
                },
                //文件上传
                dialogFormVisible: false,
                dialogVisible: false,
                fileVO: {
                    url: "",
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
                // console.log("pageCurrent:" + this.pageCurrent + "--pageSize:" + this.pageSize)
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
                this.festivalBroadcast.md5 = this.fileVO.md5;
                this.festivalBroadcast.size = this.fileVO.size;
                this.festivalBroadcast.url = this.fileVO.url;
                console.log(this.festivalBroadcast)
                festival.addHoliday(this.festivalBroadcast).then(res => {
                    this.getHolidayList(this.pageCurrent);
                    console.log(res);
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    })
                    this.dialogFormVisible = false;
                    this.dialogVisible = false;
                    this.fileVO.url = {url: "", md5: "", size: null};
                }).catch(error => {
                    console.log(error)
                })
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
                            .then(res => {
                                this.getHolidayList(this.pageCurrent);
                                console.log(res);
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
                //文件列表移除文件时的钩子
                console.log("handleRemove" + file, fileList);
                this.fileVO.url = {url: "", md5: "", size: null};
            },
            handlePictureCardPreview(file) {
                //点击文件列表中已上传的文件时的钩子
                console.log("***handlePictureCardPreview:" + file);
            },
            handleSuccess(response, file, fileList) {
                //文件上传成功时的钩子
                let data = response.data;
                this.fileVO.url = data.url;
                console.log("****fileVO.url:" + this.fileVO.url);
                this.fileVO.md5 = data.md5;
                this.fileVO.size = data.size;

                this.dialogVisible = false;
            }
        },
        computed: {},
        watch: {
            records() {
                this.records.map(record => {
                    if (record.url != null && record.url.length > 33) {
                        record.name = record.url.slice(record.url.lastIndexOf("/") + 34);
                    }
                })
            }
        }
    }
</script>
