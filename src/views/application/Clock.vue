<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-cloudy"/> 应用云</el-breadcrumb-item>
                <el-breadcrumb-item><i class="el-icon-alarm-clock"/> 时钟管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <el-button type="primary" @click="addClock">添加当天时钟</el-button>

            <el-button type="success" @click="dialogFormVisible = true">添加自定义时钟</el-button>
            <el-dialog :title="getTitle" :visible.sync="dialogFormVisible" @close="resetObj">
                <el-form ref="form" :model="clockVO">

                    <el-form-item label="时钟日期" label-width="100px">
                        <el-date-picker
                                v-model="clockVO.clockDay"
                                type="date"
                                align="left"
                                :default-value="getDate"
                                value-format="yyyy-MM-dd"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="阴历月" prop="region" label-width="100px">
                        <el-select v-model="clockVO.lunarMonth" filterable placeholder="请选择阴历月">
                            <el-option v-for="item in lunarMonth"
                                       :key="item.value"
                                       :value="item.value"
                                       :label="item.value"
                                       :disabled="item.disabled"/>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="阴历日" prop="region" label-width="100px">
                        <el-select v-model="clockVO.lunarDay" filterable placeholder="请选择阴历日">
                            <el-option v-for="item in lunarDay"
                                       :key="item.value"
                                       :value="item.value"
                                       :label="item.value"
                                       :disabled="item.disabled"/>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="星期" prop="region" label-width="100px">
                        <el-select v-model="clockVO.week" filterable placeholder="请选择星期">
                            <el-option
                                    v-for="item in week"
                                    :key="item.value"
                                    :value="item.value"
                                    :label="item.label"
                                    :disabled="item.disabled"/>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="24节气" prop="region" label-width="100px">
                        <el-select v-model="clockVO.solarTerms" filterable clearable placeholder="可搜索节气">
                            <el-option
                                    v-for="item in solarTerm"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value"
                                    :disabled="item.disabled"/>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="节假日" prop="region" label-width="100px">
                        <el-select v-model="clockVO.holiday" filterable clearable placeholder="可搜索节假日">
                            <el-option
                                    v-for="item in holiday"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.value"
                                    :disabled="item.disabled"/>
                        </el-select>
                    </el-form-item>

                </el-form>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancelOperation">取 消</el-button>
                    <el-button type="primary" @click="addOrUpdate()">确 定</el-button>
                </div>

            </el-dialog>

            <div style="margin: 20px;"></div>

            <el-table :data="records" style="width: 100%" :header-cell-style="{background: '#F6F7FB'}" border>
                <el-table-column align="center" fixed label="时钟日期" prop="clockDay"/>
                <el-table-column align="center" label="星期" prop="weekname"/>
                <el-table-column align="center" label="阴历月" prop="lunarMonth"/>
                <el-table-column align="center" label="阴历日" prop="lunarDay"/>
                <el-table-column align="center" label="节假日" prop="holiday"/>
                <el-table-column align="center" label="24节气" prop="solarTerms"/>
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

<style scoped src="../../assets/css/application/application.css"/>

<script>
    import clock from "../../api/application/clock"
    import moment from "moment";

    export default {
        name: "",
        data() {
            return ({
                pageCurrent: 1,
                pageSize: 15,
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
                },
                lunarMonth: [{
                    value: '请选择阴历月',
                    disabled: true
                }, {value: '一月'}, {value: '二月'}, {value: '三月'}, {value: '四月'}, {value: '五月'}, {value: '六月'}, {value: '七月'}, {value: '八月'}, {value: '九月'}, {value: '十月'}, {value: '十一月'}, {value: '十二月'}],
                lunarDay: [{
                    value: '请选择阴历日',
                    disabled: true
                }, {value: '初一'}, {value: '初二'}, {value: '初三'}, {value: '初四'}, {value: '初五'}, {value: '初六'}, {value: '初七'}, {value: '初八'}, {value: '初九'}, {value: '初十'}, {value: '十一'}, {value: '十二'}, {value: '十三'}, {value: '十四'}, {value: '十五'}, {value: '十六'}, {value: '十七'}, {value: '十八'}, {value: '十九'}, {value: '二十'}, {value: '廿一'}, {value: '廿二'}, {value: '廿三'}, {value: '廿四'}, {value: '廿五'}, {value: '廿六'}, {value: '廿七'}, {value: '廿八'}, {value: '廿九'}, {value: '三十'}],
                week: [{
                    value: '请选择星期',
                    disabled: true
                }, {value: '0', label: '星期一'}, {value: '1', label: '星期二'}, {value: '2', label: '星期三'}, {
                    value: '3',
                    label: '星期四'
                }, {value: '4', label: '星期五'}, {value: '5', label: '星期六'}, {value: '6', label: '星期日'}],
                solarTerm: [{
                    value: '请选择节气',
                    disabled: true
                }, {value: '立春'}, {value: '雨水'}, {value: '惊蛰'}, {value: '春分'}, {value: '清明'}, {value: '谷雨'}, {value: '立夏'}, {value: '小满'}, {value: '芒种'}, {value: '夏至'}, {value: '小暑'}, {value: '大暑'}, {value: '立秋'}, {value: '处暑'}, {value: '白露'}, {value: '秋分'}, {value: '寒露'}, {value: '霜降'}, {value: '立冬'}, {value: '小雪'}, {value: '大雪'}, {value: '冬至'}, {value: '小寒'}, {value: '大寒'}],
                holiday: [{
                    value: '请选择节假日',
                    disabled: true
                }, {value: '元旦节'}, {value: '春节'}, {value: '清明节'}, {value: '劳动节'}, {value: '端午节'}, {value: '中秋节'}, {value: '国庆节'}],
                dialogFormVisible: false,
                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
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
            addOrUpdate() {
                if (this.clockVO.id == null) {
                    this.addDiyClock()
                } else {
                    this.updateClock()
                }
            },
            setObj(id) {
                let list = this.records.filter(record => {
                    return record.id === id
                });
                let data = list.pop();
                this.clockVO.id = data.id;
                this.clockVO.clockDay = data.clockDay;
                this.clockVO.solarTerms = data.solarTerms;
                this.clockVO.holiday = data.holiday;
                this.clockVO.week = data.week + '';
                this.clockVO.lunarMonth = data.lunarMonth;
                this.clockVO.lunarDay = data.lunarDay;

                this.dialogFormVisible = true;
            },
            resetObj() {
                this.clockVO = {
                    id: null,
                    clockDay: "",
                    solarTerms: "",
                    holiday: "",
                    week: null,
                    lunarMonth: "",
                    lunarDay: "",
                };

            },
            cancelOperation() {
                this.resetObj();
                this.dialogFormVisible = false;
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
            addDiyClock() {
                clock.addDiyClock(this.clockVO)
                    .then(response => {
                        this.getClock(this.pageCurrent);
                        this.$message({
                            type: 'success',
                            message: '添加自定义时钟成功!'
                        });
                        this.dialogFormVisible = false;
                        this.resetObj();
                    }).catch(error => {
                    console.log(error)
                })
            },
            updateClock() {
                clock.updateClock(this.clockVO)
                    .then(response => {
                        this.getClock(this.pageCurrent);
                        this.$message({
                            type: 'success',
                            message: '更新时钟成功!'
                        });
                        this.dialogFormVisible = false;
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
        },
        computed: {
            getTitle() {
                if (this.clockVO.id == null) {
                    return "添加时钟记录"
                } else {
                    return "修改时钟记录"
                }
            },
            getDate() {
                if (this.clockVO.clockDay === '') {
                    this.clockVO.clockDay = moment().format('YYYY-MM-DD');
                }
            }
        },
        watch: {
            records() {
                this.records.map(record => {
                    let week = record.week;
                    switch (week) {
                        case 0:
                            record.weekname = "星期一";
                            break;
                        case 1:
                            record.weekname = "星期二";
                            break;
                        case 2:
                            record.weekname = "星期三";
                            break;
                        case 3:
                            record.weekname = "星期四";
                            break;
                        case 4:
                            record.weekname = "星期五";
                            break;
                        case 5:
                            record.weekname = "星期六";
                            break;
                        case 6:
                            record.weekname = "星期日";
                            break;
                        default:
                            record.weekname = "Error";
                            break;
                    }
                })
            }
        }
    }

</script>
