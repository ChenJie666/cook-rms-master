<template>
    <div class="">

        <br>
        <el-button type="primary" @click="addClock">添加当天时钟</el-button>

        <div style="margin: 20px;"></div>

        <el-table :data="records" style="width: 100%" border>
            <el-table-column fixed label="时钟日期" prop="clockDay"/>
            <el-table-column label="星期" prop="week"/>
            <el-table-column label="阴历月" prop="lunarMonth"/>
            <el-table-column label="阴历日" prop="lunarDay"/>
            <el-table-column label="节假日" prop="holiday"/>
            <el-table-column label="24节气" prop="solarTerms"/>
            <el-table-column label="创建时间" prop="createTime"/>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <el-button @click="deleteById(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

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


<script>
    import clock from "../../api/application/clock"

    export default {
        name: "",
        data() {
            return ({
                pageCurrent: 1,
                pageSize: 10,
                total: 0,
                pages: 0,
                records: [],
                clockVO: {
                    id: null,
                    clockDay: "", //时钟日期
                    solarTerms: "", //24节气
                    holiday: "", //节假日
                    week: null, //周几
                    lunarMonth: "", //阴历月
                    lunarDay: "", //阴历日
                }
            })
        },
        created() {
            this.getClock(1)
        },
        methods: {
            getClock(pageCurrent) {
                this.pageCurrent = pageCurrent;
                clock.getClockList(pageCurrent, this.pageSize)
                    .then(response => {
                        let data = response.data;
                        this.records = data.records;
                        this.total = data.total;
                        this.pages = data.pages;
                        this.current = data.current;
                        this.size = data.size;
                    }).catch(error => {
                    console.error(error)
                })
            },
            addClock() {
                clock.addClock()
                    .then(response => {
                        this.getClock(this.pageCurrent);
                        this.$message({
                            type: "success",
                            message: "添加当前日期成功!"
                        })
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
                    clock.deleteClock(id)
                        .then(response => {
                            this.getClock(this.pageCurrent);
                            this.$message({
                                type: "success",
                                message: "删除当前日期成功!"
                            })
                        }).catch(error => {
                        console.log(error)
                    })
                }).catch(error => {
                    console.log(error)
                })
            },
            //分页功能
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.getClock(this.pageCurrent)
            },
            handleCurrentChange(pageCurrent) {
                this.pageCurrent = pageCurrent;
                this.getClock(this.pageCurrent)
            }
        }
    }

</script>
