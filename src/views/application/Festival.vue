<template>
    <div class="">

        <el-table :data="records" style="width: 100%">
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
                pageSize: 5
            })
        },
        created() {
            this.getHolidayList(1)
        },
        methods: {
            getHolidayList(pageCurrent) {
                this.pageCurrent = pageCurrent;
                festival.getHolidayList(this.pageCurrent, this.pageSize)
                    .then(response => {
                        console.log(response);
                        let data = response.data;
                        this.total = data.total;
                        this.pages = data.pages;
                        this.records = data.records;
                        this.pageCurrent = data.pageCurrent;
                        this.pageSize = data.pageSize;
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
                            .then(response => {
                                this.getHolidayList(1)
                                console.log(response)
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

        },
        computed: {
            getFileName(url) {
                console.log(url)
                let number = url.lastIndexOf('/');
                console.log(number)
                return url.substr(number + 32)
            }
        }
    }
</script>
