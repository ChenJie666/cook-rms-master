<template>
  <el-card>
    <my-bread level1="数据看板" level2="App端数据"></my-bread>

    <div id="main" style="width: 600px;height: 400px">

    </div>

  </el-card>
</template>

<script>
    var echarts = require('echarts');
    export default {
        name: "AppEcharts",
        data() {
            return{

            }
        },
        mounted() {
           this.useEcharts();
        },
        methods: {
          useEcharts() {
              // 基于准备好的dom，初始化echarts实例
              let myChart = echarts.init(document.getElementById('main'));

              // 指定图表的配置项和数据
              let option = {
                  title: {
                      text: 'ECharts 入门示例'
                  },
                  tooltip: {},
                  legend: {
                      data:['销量']
                  },
                  xAxis: {
                      data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                  },
                  yAxis: {},
                  series: [{
                      name: '销量',
                      type: 'bar',
                      data: [5, 20, 36, 10, 10, 20]
                  }]
              };

              // 使用刚指定的配置项和数据显示图表。
              myChart.setOption(option);

          }
        }
    }
</script>

<style scoped>

</style>
