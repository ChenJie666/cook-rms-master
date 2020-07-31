<template>
    <div class="FestivalList">

        <br>
        <!-- 添加记录 -->
        <el-button type="primary" @click="dialogFormVisible = true">添加语言包</el-button>
        <el-dialog title="添加语言包" :visible.sync="dialogFormVisible" width="600px">

            <el-form label-position="right" label-width="130px" :model="voiceFirmwareVO">
                <el-form-item label="MCU固件版本号">
                    <el-input
                            placeholder="MCU固件版本号"
                            v-model="voiceFirmwareVO.mcuVersion"
                            clearable>
                    </el-input>
                </el-form-item>

                <el-form-item label="语言固件版本号">
                    <el-input
                            placeholder="语言固件版本号"
                            v-model="voiceFirmwareVO.voiceVersion"
                            clearable>
                    </el-input>
                </el-form-item>

                <el-form-item label="总 分 包 数">
                    <el-input-number
                            v-model="voiceFirmwareVO.packageCount"
                            :min="1"
                            :max="10"
                            label="分包数"/>
                </el-form-item>

                <el-form-item label="每 个 包 大 小 ">
                    <el-input
                            placeholder="每个包大小"
                            v-model="voiceFirmwareVO.packageSize"
                            clearable>
                    </el-input>
                </el-form-item>
                <el-form-item label="文件上传">
                    <el-upload
                               action="/cloud/application/upload"
                               list-type="picture-card"
                               :on-preview="handlePictureCardPreview"
                               :on-remove="handleRemove"
                               :on-success="handleSuccess">
                        <i class="el-icon-plus"/>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="fileVO.webUrl" alt="">
                    </el-dialog>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addVoiceFirmware">确 定</el-button>
                <!--                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>-->
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
                        <el-form-item label="MCU固件版本号">
                            <span>{{props.row.mcuVersion}}</span>
                        </el-form-item>
                        <el-form-item label="语言固件版本号">
                            <span>{{props.row.voiceVersion}}</span>
                        </el-form-item>
                        <el-form-item label="链接地址">
                            <el-link target="_blank" type="primary" :href="props.row.url">{{props.row.url}}</el-link>
                        </el-form-item>
                        <el-form-item label="文件大小">
                            <span>{{props.row.size}}</span>
                        </el-form-item>
                        <el-form-item label="MD5值">
                            <span>{{props.row.md5}}</span>
                        </el-form-item>
                        <el-form-item label="总分包数">
                            <span>{{props.row.packageCount}}</span>
                        </el-form-item>
                        <el-form-item label="每个包大小">
                            <span>{{props.row.packageSize}}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{props.row.createTime}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="序号" fixed prop="index" width="70px"/>
            <el-table-column label="MCU固件版本号" prop="mcuVersion"/>
            <el-table-column label="语音固件版本号" prop="voiceVersion"/>
            <el-table-column label="文件名" prop="name"/>
            <el-table-column label="创建时间" prop="createTime"/>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button @click="updateVoice()" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteById(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <br>

        <!-- 分页功能 -->
        <el-pagination class="el-pagination"
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
    import voice from '../../api/application/voice'

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
                voiceFirmwareVO: {
                    id: null,
                    mcuVersion: "",
                    voiceVersion: "",
                    url: "",
                    size: null,
                    md5: "",
                    packageCount: null,
                    packageSize: null
                },
                //文件上传
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
            this.getVoiceList(1)
        },
        methods: {
            //增删改查功能
            getVoiceList(pageCurrent) {
                // console.log("pageCurrent:" + this.pageCurrent + "--pageSize:" + this.pageSize)
                this.pageCurrent = pageCurrent;
                voice.getVoiceList(this.pageCurrent, this.pageSize)
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
            addVoiceFirmware() {
                this.voiceFirmwareVO.md5 = this.fileVO.md5;
                this.voiceFirmwareVO.size = this.fileVO.size;
                this.voiceFirmwareVO.url = this.fileVO.url;
                voice.addVoice(this.voiceFirmwareVO).then(res => {
                    this.getVoiceList(this.pageCurrent);
                    console.log(res);
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                    this.dialogFormVisible = false;
                    this.dialogVisible = false;
                    this.fileVO.url = {url: "", md5: "", size: null};
                }).catch(error => {
                    console.log(error)
                })
            },
            updateVoice() {
                voice.updateVoice()
            },
            deleteById(id) {
                this.$confirm('确认删除该记录？', '提示', {
                    confirmButtonClass: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        voice.deleteVoice(id)
                            .then(res => {
                                this.getVoiceList(this.pageCurrent);
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
                this.getVoiceList(this.pageCurrent)
            },
            handleCurrentChange(pageCurrent) {
                this.pageCurrent = pageCurrent;
                this.getVoiceList(this.pageCurrent)
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
