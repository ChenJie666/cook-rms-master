<template>
    <div class="FestivalList">

        <br>
        <!-- 添加记录 -->
        <el-button type="primary" @click="dialogFormVisible = true">添加短消息记录</el-button>
        <el-dialog title="添加节日播报记录" :visible.sync="dialogFormVisible" width="600px">
            <el-form ref="form" :model="shortMessageVO">

                <el-form-item label="起止时间" label-width="100px">
                    <el-date-picker
                            v-model="datetimerange"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间"
                            align="left"
                            :default-time="['00:00:00','00:00:00']"
                            value-format="timestamp">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="设备型号" prop="region" label-width="100px">
                    <el-select v-model="shortMessageVO.deviceModel" placeholder="请选择设备型号">
                        <el-option label="Q6" value="Q6"/>
                    </el-select>
                </el-form-item>

                <el-form-item label="消息类型" prop="region" label-width="100px">
                    <el-select v-model="shortMessageVO.type" placeholder="请选择消息类型">
                        <el-option label="文字" value="1"/>
                        <el-option label="图片" value="2"/>
                    </el-select>
                </el-form-item>

                <el-form-item v-if="shortMessageVO.type==1" label="文本消息内容" prop="desc" label-width="100px">
                    <el-input type="textarea" v-model="shortMessageVO.content"></el-input>
                </el-form-item>

                <el-form-item v-if="shortMessageVO.type==2" label="上传图片">
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
                <el-button type="primary" @click="addOrUpdate()">确 定</el-button>
            </div>
        </el-dialog>

        <br>
        <br>

        <!-- 展示记录 -->
        <el-table :data="records"
                  style="width: 100%" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="right" label-width="150px" inline class="demo-table-expand">
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
                            <el-link target="_blank" type="primary" :href="props.row.imageUrl">{{props.row.imageUrl}}
                            </el-link>
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
            <el-table-column fixed prop="index"/>
            <el-table-column label="消息类型" prop="typeName" width="100px"/>
            <el-table-column label="图片" prop="exp" width="150px">
                <template slot-scope="scope">
                    <span>{{scope.row.content}}</span>
                    <el-image
                            style="width:80%; height: 30%"
                            :src="scope.row.imageUrl"
                            :preview-src-list=[scope.row.imageUrl]
                            fit="contain"
                            lazy>
                        <div v-if="scope.row.imageUrl===''" slot="error" class="image-slot">
                            <!--                                <i class="el-icon-picture-outline"/>-->
                        </div>
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column label="开始时间" prop="startDatetime"/>
            <el-table-column label="结束时间" prop="endDatetime"/>
            <el-table-column label="设备型号" prop="deviceModel"/>
            <el-table-column label="创建时间" prop="createTime"/>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button @click="dialogFormVisible=true" type="text" size="small">编辑</el-button>
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
    import shortmessage from '../../api/application/shortmessage'
    import moment from 'moment'

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
                shortMessageVO: {
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
                    url: "",
                    md5: "",
                    size: null
                },
                //时间范围
                datetimerange: []
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
            addOrUpdate(id){
                if (id === null) {
                    this.addShortMessage();
                } else {
                    this.
                    this.updateShortMessage(id);
                }
            },
            addShortMessage() {
                let endTimestamp = this.datetimerange.pop() / 1000;
                let startTimestamp = this.datetimerange.pop() / 1000;
                console.log(startTimestamp + "-" + endTimestamp);
                this.shortMessageVO.imageUrl = this.fileVO.url;
                console.log("***fileVO.url" + this.fileVO.url);
                console.log("***shortMessageVO.imageUrl" + this.shortMessageVO.imageUrl)
                this.shortMessageVO.startTime = startTimestamp;
                this.shortMessageVO.endTime = endTimestamp;
                console.log("***addShortMessage:" + this.shortMessageVO);
                shortmessage.addShortMessage(this.shortMessageVO).then(res => {
                    this.getShortMessageList(this.pageCurrent);
                    console.log(res);
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                    this.dialogFormVisible = false;
                    this.dialogVisible = false;
                    this.fileVO = {url: "", md5: "", size: null};
                    this.shortMessageVO.content = ""
                }).catch(error => {
                    console.log(error)
                });
            },
            updateShortMessage() {
                shortmessage.updateShortMessage()
            },
            deleteById(id) {
                this.$confirm('确认删除该记录？', '提示', {
                    confirmButtonClass: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        shortmessage.deleteShortMessage(id)
                            .then(res => {
                                this.getShortMessageList(this.pageCurrent);
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
                this.getShortMessageList(this.pageCurrent)
            },
            handleCurrentChange(pageCurrent) {
                this.pageCurrent = pageCurrent;
                this.getShortMessageList(this.pageCurrent)
            },
            //文件上传功能
            handleRemove(file, fileList) {
                //文件列表移除文件时的钩子
                console.log("handleRemove" + file, fileList);
                this.fileVO = {url: "", md5: "", size: null};
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
            },
            //大图预览
            srcList(index) {
                let images = this.records.map(item => item.imageUrl);
                let imagePre = images.slice(0, index);
                let imageSuf = images.slice(index);
                return imageSuf.push(imagePre);
            },
        },
        computed: {
            //通过该计算属性得到当前页所有图片地址集合，用于遍历
            // srcList() {
            //     return this.records.map(item => item.imageUrl);
            // }
        },
        watch: {
            //添加需要展示的属性
            records() {
                let p = 0;
                this.records.map(record => {
                    record.index = (this.pageCurrent - 1) * this.pageSize + ++p;

                    // record.startDatetime = timeutils.toDatetime(record.startTime);
                    // record.endDatetime = timeutils.toDatetime(record.endTime);
                    record.startDatetime = moment(record.startTime * 1000).format('YYYY-MM-DD HH:mm:ss')
                    record.endDatetime = moment(record.endTime * 1000).format('YYYY-MM-DD HH:mm:ss')

                    record.typeName = (record.type === 1 ? '文字' : '图片')
                })
            }
        }

    }
</script>
