<template>
  <div id="line_echarts" style="width: 100%; height: 400px"></div>
</template>
  
<script>
import * as echarts from "echarts";

export default {
  name: "line_echarts",
  data() {
    return {
      times: [],
      datas: [],
    };
  },
  methods: {
    getTimes() {
      var i,
        times = [];
      const arrays = this.$store.state.sensor.data;
      for (i = 0; i < arrays.length; i++) {
        times.push(arrays[i].time);
      }
      return times;
    },
    getData() {
      var i,
        datas = [];
      const arrays = this.$store.state.sensor.data;
      for (i = 0; i < arrays.length; i++) {
        datas.push(arrays[i].data);
      }
      return datas;
    },
    myEcharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("line_echarts"));
      window.addEventListener("resize", myChart.resize);
      this.times = this.getTimes();
      this.datas = this.getData();
      console.log(this.times);
      console.log(this.datas);
      // 指定图表的配置项和数据
      var option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.times,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.datas,
            type: "line",
            areaStyle: {},
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option,true);
    }
  },
  mounted() {
    this.myEcharts();
  },
watch: {
//观察option的变化
option: {
handler(newVal, oldVal) {

}
}
}
};
</script>
  
  <style>
</style>
  