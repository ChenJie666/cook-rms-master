<template>
    <div class="weather">

        <el-button type="primary" @click="addWeather">添加当天天气</el-button>

        <div style="margin-top: 20px;">
            <el-button type="success" @click="getWeather(1,searchFactor)">查询天气</el-button>
            <el-button type="info" @click="this.clearSearchFactor">清空条件</el-button>
            <el-date-picker style="width: 150px"
                            v-model="searchFactor.searchDate"
                            align="right"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            :picker-options="pickerOptions">
            </el-date-picker>

            <el-input style="margin-right: 10px;width: 150px" placeholder="输入城市" v-model="searchFactor.searchCity" clearable/>

        </div>


        <div style="margin: 10px;"></div>

        <el-table :data="records" style="width: 100%" border>
            <el-table-column label="日期" prop="weatherDay"/>
            <el-table-column fixed label="城市id" prop="cityCode"/>
            <el-table-column fixed label="城市名" prop="cityName"/>
            <el-table-column label="当前气温" prop="temp"/>
            <el-table-column label="最高温度" prop="highTemp"/>
            <el-table-column label="最低温度" prop="lowTemp"/>
            <el-table-column label="天气序号" prop="weatherId"/>
            <el-table-column label="天气说明" prop="desc"/>
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

<style scoped src="../../assets/css/application.css"/>

<script>
    import weather from "../../api/application/weather"
    import moment from "moment"

    export default {
        name: "",
        data() {
            return ({
                pageCurrent: 1,
                pageSize: 10,
                total: 0,
                pages: 0,
                records: [],
                weatherDay: "",
                searchFactor: {
                    searchDate: "",
                    searchCity: ""
                },
                // clockVO: {
                //     id: null,
                //     cityCode: "", //城市id
                //     cityName: "", //城市名
                //     weatherDay: "", //日期
                //     temp: null, //当前气温
                //     highTemp: null, //最高温度
                //     lowTemp: null, //最低温度
                //     weatherId: null, //天气序号
                //     desc: "" //天气说明
                // },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
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
                },
            })
        },
        created() {
            this.searchFactor.weatherDay = moment().format('YYYY-MM-DD');
            this.getWeather(1)
        },
        methods: {
            getWeather(pageCurrent) {
                this.pageCurrent = pageCurrent;
                console.log("***searchFactor" + this.searchFactor);
                console.log("***searchDate" + this.searchFactor.searchDate);
                console.log("***searchCity" + this.searchFactor.searchCity);
                weather.getWeatherList(pageCurrent, this.pageSize, this.searchFactor)
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
            addWeather() {
                weather.addWeather()
                    .then(response => {
                        this.getWeather(this.pageCurrent);
                        this.$message({
                            type: "success",
                            message: "添加当前日期城市天气成功!"
                        })
                    }).catch(error => {
                    console.log(error)
                })
            },
            deleteById(id) {
                weather.deleteWeather(id)
                    .then(response => {
                        this.getWeather(this.pageCurrent);
                        this.$message({
                            type: "success",
                            message: "删除天气记录成功!"
                        })
                    })
            },
            //分页功能
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.getWeather(this.pageCurrent)
            },
            handleCurrentChange(pageCurrent) {
                this.pageCurrent = pageCurrent;
                this.getWeather(this.pageCurrent)
            },
            //清空查询条件
            clearSearchFactor(){
                this.searchFactor = {searchDate: "", searchCity: ""};
                this.getWeather(1)
            }
        }
    }

</script>
