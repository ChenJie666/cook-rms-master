<template>
    <div class="FestivalList">

        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-cloudy"/> 应用云</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-magic-stick"/> 节日列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <!-- 添加记录 -->
            <el-button type="primary" @click="dialogFormVisible = true">添加节日播报记录</el-button>
            <el-dialog title="getTitle" :visible.sync="dialogFormVisible" @close="resetObj">
                <el-form label-position="right" label-width="20px" :model="festivalBroadcast">
                    <el-form-item label="播报日期" label-width="100px">
                        <el-date-picker style="width: 128px"
                                        v-model="festivalBroadcast.broadcastDay"
                                        type="date"
                                        placeholder="选择日期"
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="文件上传" label-width="100px">
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

                    <el-form-item label="文件名称" v-if="fileVO.url !== ''" label-width="100px">
                        <el-input
                                type="textarea"
                                v-model="getNameByUrl"
                                :disabled="true">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="文件地址" v-if="fileVO.url !== ''" label-width="100px">
                        <el-input
                                type="textarea"
                                v-model="fileVO.url"
                                :disabled="true">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="文件md5值" v-if="fileVO.md5 !== ''" label-width="100px">
                        <el-input
                                type="textarea"
                                v-model="fileVO.md5"
                                :disabled="true">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="文件大小" v-if="fileVO.size !== null" label-width="100px">
                        <el-input
                                type="textarea"
                                v-model="fileVO.size"
                                :disabled="true">
                        </el-input>
                    </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancelOperation">取 消</el-button>
                    <el-button type="primary" @click="addOrUpdate">确 定</el-button>
                    <!--                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
                </div>
            </el-dialog>

            <div style="margin: 20px;"></div>

            <!-- 展示记录 -->
            <el-table :data="records"
                      style="width: 100%" :header-cell-style="{background: '#F6F7FB'}" border>
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
                                <el-link target="_blank" type="primary" :href="props.row.url">{{props.row.url}}
                                </el-link>
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
                <el-table-column align="center" label="序号" fixed prop="index" width="100px"/>
                <el-table-column align="center" label="播报日期" prop="broadcastDay"/>
                <el-table-column align="center" label="文件名" prop="name"/>
                <el-table-column align="center" label="创建时间" prop="createTime"/>
                <el-table-column align="center" fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="setObj(scope.row.id)" type="text" icon="el-icon-edit">编辑</el-button>
                        <el-button @click="deleteById(scope.row.id)" type="text" icon="el-icon-delete" style="color: red">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <br>
            <!-- 分页功能 -->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageCurrent"
                    :page-sizes="[15,30,50,100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>

</template>

<style src="../../assets/css/application/application.css"/>

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
                pageSize: 15,
                //添加&更新
                festivalBroadcast: {
                    id: null,
                    broadcastDay: "",
                    url: "",
                    timestamp: null,
                    md5: "",
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
            addOrUpdate() {
                if (this.festivalBroadcast.id == null) {
                    this.addHoliday()
                } else {
                    this.updateHoliday()
                }
            },
            cancelOperation() {
                this.dialogFormVisible = false;
                this.resetObj();
            },
            setObj(id) {
                let list = this.records.filter(record => {
                    return record.id === id
                });
                let data = list.pop();
                this.festivalBroadcast.id = data.id;
                this.festivalBroadcast.broadcastDay = data.broadcastDay;
                this.festivalBroadcast.url = data.url;
                this.festivalBroadcast.timestamp = data.timestamp;
                this.festivalBroadcast.md5 = data.md5;
                this.fileVO.md5 = data.md5;
                this.festivalBroadcast.size = data.size;
                this.fileVO.size = data.size;
                this.fileVO.url = data.url;
                this.dialogFormVisible = true;
            },
            resetObj() {
                this.festivalBroadcast = {
                    id: null,
                    broadcastDay: "",
                    url: "",
                    timestamp: null,
                    md5: "",
                    size: null,
                };
                this.fileVO = {url: "", md5: "", size: null};
            },
            addHoliday() {
                this.festivalBroadcast.md5 = this.fileVO.md5;
                this.festivalBroadcast.size = this.fileVO.size;
                this.festivalBroadcast.url = this.fileVO.url;
                console.log(this.festivalBroadcast);
                festival.addHoliday(this.festivalBroadcast).then(res => {
                    this.getHolidayList(this.pageCurrent);
                    console.log(res);
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    })
                    this.dialogFormVisible = false;
                    this.dialogVisible = false;
                    this.resetObj();
                }).catch(error => {
                    console.log(error)
                })
            },
            updateHoliday() {
                this.festivalBroadcast.url = this.fileVO.url;
                this.festivalBroadcast.md5 = this.fileVO.md5;
                this.festivalBroadcast.size = this.fileVO.size;
                festival.updateHoliday(this.festivalBroadcast)
                    .then(response => {
                        this.getHolidayList(this.pageCurrent);
                        this.$message({
                            type: 'success',
                            message: '更新成功!'
                        });
                        this.dialogFormVisible = false;
                        this.dialogVisible = false;
                        this.resetObj();
                    }).catch(error => {
                    console.log(error)
                })
            },
            deleteById(id) {
                this.$confirm('确认删除该记录？', '提示', {
                    confirmButtonClass: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
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
                }).catch(error => {
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
                this.fileVO.md5 = data.md5;
                this.fileVO.size = data.size;
                console.log("****文件上传成功，fileVO:[" + this.fileVO.url + "," + this.fileVO.md5 + "," + this.fileVO.size);

                this.dialogVisible = false;
            }
        }
        ,
        computed: {
            getTitle() {
                if (this.shortMessageVO.id == null) {
                    return "添加节日播报"
                } else {
                    return "修改节日播报"
                }
            },
            getNameByUrl() {
                if (this.fileVO.url !== "") {
                    return this.fileVO.url.slice(this.fileVO.url.lastIndexOf("/") + 34);
                } else {
                    console.log("getNameByUrl中的URL为空")
                }
            }
        },
        watch: {
            //添加需要展示的属性
            records() {
                let p = 0;
                this.records.map(record => {
                    record.index = (this.pageCurrent - 1) * this.pageSize + ++p;

                    if (record.url != null && record.url.length > 33) {
                        record.name = record.url.slice(record.url.lastIndexOf("/") + 34);
                    }
                })
            }
        }
    }
</script>
