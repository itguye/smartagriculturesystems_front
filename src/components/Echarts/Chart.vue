<template>
  <div id="line_echarts" style="width: 100%; height: 400px"></div>
</template>


<script>
import * as echarts from "echarts";

var myChart;
export default {
  name: "line_echarts",
  data() {
    return {
      arrays: this.$store.state.sensor.data,
      symbol: this.$store.state.sensor.symbol,
      option: {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
        },
        yAxis: {
          type: "value",
          name: "单位:" + this.$store.state.sensor.symbol,
        },
        series: [
          {
            data: [],
            type: "line",
            areaStyle: {},
          },
        ], // An highlighted block
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
          // ,
          // formatter: function (params) {
          //   var relVal = params[0].name;
          //   for (var i = 0, l = params.length; i < l; i++) {
          //     relVal += "<br/>" + params[i].marker + params[i].value + this.symbol;
          //   }
          //   return relVal;
          // },
          formatter: (params) => {
            var relVal = params[0].name;
            for (var i = 0, l = params.length; i < l; i++) {
              relVal +=
                "<br/>" +
                params[i].marker +
                params[i].value +
                this.$store.state.sensor.symbol;
            }
            return relVal;
          },
        },
      },
    };
  },
  methods: {
    init() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById("line_echarts"));
      this.parseData();
      // 根据this.option的数据绘制图表
      this.myChart.setOption(this.option, true);
    },
    getTimes() {
      var i,
        times = [];
      //   const arrays = this.$store.state.sensor.data;
      for (i = 0; i < this.arrays.length; i++) {
        const timetemp = this.format(this.arrays[i].time);
        times.push(timetemp);
      }
      return times;
    },
    getData() {
      var i,
        datas = [];
      //   const arrays = this.$store.state.sensor.data;
      for (i = 0; i < this.arrays.length; i++) {
        datas.push(this.arrays[i].data);
      }
      return datas;
    },
    parseData() {
      this.option.xAxis.data = this.getTimes();
      this.option.series[0].data = this.getData();
    },
    format(value) {
      var dt = new Date(value);
      let year = dt.getFullYear();
      let month = dt.getMonth() + 1;
      let date = dt.getDate();
      let hour = dt.getHours();
      let minute = dt.getMinutes();
      let second = dt.getSeconds();
      return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
    },
  },
  mounted() {
    this.init();
  },
};
</script>