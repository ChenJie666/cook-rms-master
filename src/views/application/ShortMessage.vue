<template>
    <div class="FestivalList">

        <br>
        <!-- 添加记录 -->
        <el-button type="primary" @click="dialogFormVisible = true">添加短消息记录</el-button>
        <el-dialog title="添加节日播报记录" :visible.sync="dialogFormVisible">
            <el-form :model="festivalBroadcast">
                <el-form-item label="播报日期" label-width="120px">
                    <!--                    <el-input v-model="festivalBroadcast.broadcastDay" autocomplete="off"></el-input>-->
                    <span class="demonstration"></span>
                    <el-date-picker
                            v-model="festivalBroadcast.broadcastDay"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>

                <el-upload
                        action="/cloud/application/upload"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-success="handleSuccess">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="fileVO.webUrl" alt="">
                </el-dialog>

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
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="id">
                            <span>{{props.row.id}}</span>
                        </el-form-item>
                        <el-form-item label="消息类型">
                            <span>{{props.row.type}}</span>
                        </el-form-item>
                        <el-form-item label="文本消息内容">
                            <span>{{props.row.content}}</span>
                        </el-form-item>
                        <el-form-item label="图片地址">
                            <span>{{props.row.imageUrl}}</span>
                        </el-form-item>
                        <el-form-item label="开始时间时间戳">
                            <span>{{props.row.startTime}}</span>
                        </el-form-item>
                        <el-form-item label="结束时间时间戳">
                            <span>{{props.row.endTime}}</span>
                        </el-form-item>
                        <el-form-item label="设备型号">
                            <span>{{props.row.deviceModel}}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{props.row.createTime}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column fixed type="index"/>
            <el-table-column label="消息类型" prop="type"/>
            <el-table-column label="文本消息内容" prop="content"/>
            <el-table-column label="图片" prop="imageUrl">
                <template slot-scope="scope">
                    <el-image
                            style="width:100%; height: 100%"
                            :src="scope.row.imageUrl"
                            :preview-src-list=/*[scope.row.imageUrl]*/srcList(scope.row.index)
                            fit="contain"
                            lazy/>
                </template>
            </el-table-column>
            <el-table-column label="开始时间" prop="startTime"/>
            <el-table-column label="结束时间" prop="endTime"/>
            <el-table-column label="设备型号" prop="deviceModel"/>
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
    <!--
    详细信息的样式

    -->
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 120px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
    }


    /*.img {*/

    /*.el-icon-circle-close {*/
    /*    color: white;*/
    /*}*/

    /*}*/


</style>

<script>
    import shortmessage from '../../api/application/shortmessage'

    export default {
        name: 'FestivalList',
        components: {},

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
                    type: null,
                    content: "",
                    imageUrl: "",
                    startTime: null,
                    endTime: null,
                    deviceModel: null
                },
                //文件上传
                dialogFormVisible: false,
                dialogVisible: false,
                fileVO: {
                    webUrl: "",
                    md5: "",
                    size: null
                },
            })
        },
        created() {
            this.getShortMessageList(1)
        },
        methods: {
            //增删改查功能
            getShortMessageList(pageCurrent) {
                // console.log("pageCurrent:" + this.pageCurrent + "--pageSize:" + this.pageSize)
                this.pageCurrent = pageCurrent;
                shortmessage.getShortMessageList(this.pageCurrent, this.pageSize)
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
                this.festivalBroadcast.webUrl = this.fileVO.webUrl;
                console.log("***festivalBroadcast.broadcastDay:" + this.festivalBroadcast.broadcastDay);
                console.log("***festivalBroadcast.webUrl:" + this.festivalBroadcast.webUrl);
                festival.addHoliday(this.festivalBroadcast).then(res => {
                    this.getHolidayList(this.pageCurrent);
                    console.log(res);
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    })
                    this.dialogFormVisible = false;
                    this.dialogVisible = false;
                    this.fileVO.webUrl = {webUrl: "", md5: "", size: null};
                }).catch(error => {
                    console.log(error)
                })
            },
            updateHoliday() {
                shortmessage.updateShortMessage()
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
                this.fileVO.webUrl = {webUrl: "", md5: "", size: null};
            },
            handlePictureCardPreview(file) {
                //点击文件列表中已上传的文件时的钩子
                console.log("***handlePictureCardPreview:" + file);
            },
            handleSuccess(response, file, fileList) {
                //文件上传成功时的钩子
                let data = response.data;
                this.fileVO.webUrl = data.webUrl;
                console.log("****fileVO.webUrl:" + this.fileVO.webUrl);
                this.fileVO.md5 = data.md5;
                this.fileVO.size = data.size;

                this.dialogVisible = false;
            },
            //大图预览
            srcList(index){
                let images = this.records.map(item => item.imageUrl);
                var imagePre = images.slice(0,index);
                var imageSuf = images.slice(index);
                return imageSuf.push(imagePre);
            }
        },
        computed: {
            //通过该计算属性得到当前页所有图片地址集合，用于遍历
            srcList() {
                return this.records.map(item => item.imageUrl);
            }
        }
    }
</script>
