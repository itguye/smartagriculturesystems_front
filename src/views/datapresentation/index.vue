<template>
  <div class="datapresentaionsmain">
    <el-row :gutter="20">
      <el-col :span="24"
        ><div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>传感器</span>
              <el-button
                icon="el-icon-circle-plus"
                style="float: right; padding: 3px 0; border: none"
                @click="addSensor"
              ></el-button>
            </div>
            <div class="text item">
              <sensor_item></sensor_item>
            </div>
          </el-card></div
      ></el-col>
    </el-row>

    <el-row :gutter="20" style="padding-top: 10px">
      <el-col :span="24"
        ><div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>控制器</span>
              <el-button
                icon="el-icon-circle-plus"
                style="float: right; padding: 3px 0; border: none"
                @click="addController"
              ></el-button>
            </div>
            <div class="text item">
              <control_item></control_item>
            </div>
          </el-card></div
      ></el-col>
    </el-row>

    <el-row :gutter="20" style="padding-top: 10px">
      <el-col :span="24"
        ><div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>历史数据</span>

              <el-select
                v-model="value"
                placeholder="请选择"
                style="float: right; padding: 3px 0; border: none"
                size="mini"
                @change="updateCHartsName"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>

              <div
                class="block"
                style="
                  float: right;
                  padding: 3px 0;
                  border: none;
                  padding-right: 20px;
                "
              >
                <!-- <span class="demonstration">带快捷选项</span> -->
                <el-date-picker
                  size="mini"
                  v-model="time"
                  type="datetimerange"
                  :picker-options="pickerOptions"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss"
                  @change="updateCHartsTimes"
                >
                </el-date-picker>
              </div>
            </div>

            <div class="text item">
              <Chart v-if="refresh"></Chart>
            </div>
          </el-card></div
      ></el-col>
    </el-row>

    <el-dialog :title="form.type == 0?'传感器设备':'控制器设备'" :visible.sync="deviceDialogFormVisible">
      <el-form :model="form">
        <el-form-item label="规则名">
          <el-input v-model="form.ruleName" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="设备名">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="符号名" v-if="form.type == 0">
          <el-input v-model="form.symbol" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Cancel">取 消</el-button>
        <el-button type="primary" @click="handleDialogAdd">创 建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import sensor_item from "../datapresentation/sensoritem.vue";
import control_item from "../datapresentation/controlleritem.vue";
import Chart from "@/components/Echarts/Chart.vue";
import { getChartSensorData, getDataList, addDevice,getDeviceList } from "@/api/sensor";
export default {
  data() {
    return {
      deviceDialogFormVisible:false,
      form:{
        ruleName:null,
        name:null,
        symbol:null,
        type:null  //0:传感器  1:控制器
      },
      timer: null,
      refresh: true,
      startTime: this.startTimeDateFormat(),
      endTime: this.endTimeDateFormat(),
      options: [// 传感器
        // {
        //   value: "选项1",
        //   label: "水位",
        // },
        // {
        //   value: "选项2",
        //   label: "温度",
        // },
        // {
        //   value: "选项3",
        //   label: "湿度",
        // },
        // {
        //   value: "选项4",
        //   label: "光照",
        // },
        // {
        //   value: "选项5",
        //   label: "土壤湿度",
        // },
      ],
      value: "水位",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      time: "",
    };
  },
  components: {
    sensor_item,
    control_item,
    Chart,
  },
  methods: {
    getDeviceList() {
      // 获取符号表中的数据
      var temp = [];
      getDeviceList(null, null, null, null).then((response) => {
        temp = response.data;
        this.options = [];
        //this.actions_service = [];
        for (var i = 0; i < temp.length; i++) {
          // 传感器
          if (temp[i].type === "0") {
            this.options.push({
              value: temp[i].ruleName,
              label: temp[i].name,
            });
          } 

          // else if (temp[i].type === "1") {
          //   // 控制器
          //   this.actions_service.push({
          //     value: temp[i].ruleName,
          //     label: temp[i].name,
          //   });
          // }
        }
      });
    },
    handleDialogAdd(){// 通过后端添加设备
      addDevice(this.form).then((response)=>{
        if(response.data === "success"){
          // 表示添加成功
          this.$message({
          message: '添加成功,将在下次数据获取时进行加载!',
          type: 'success'
        });
        }
      });
      this.deviceDialogFormVisible = false;
    },
    Cancel(){
      this.deviceDialogFormVisible = false;
    },
    // 添加传感器
    addSensor() {
      // 加载添加设备的界面
      this.form.type = 0;
      this.deviceDialogFormVisible = true;
    },
    // 添加控制器
    addController() {
      this.form.type = 1;
      this.deviceDialogFormVisible = true;
    },
    watchData() {
      // 移除组件
      this.refresh = false;
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        // 重新渲染组件
        this.refresh = true;
      });
    },
    updateCHartsName(value) {
      this.options.forEach((item) => {
        if (item.value === value) {
          this.value = item.label; // 获取到name
          this.init();
        }
      });
    },
    updateCHartsTimes(times) {
      // 获取时间
      this.startTime = times[0];
      this.endTime = times[1];
      // 通过Axios请求获取后端数据
      this.init();
    },
    //当前日期格式化
    startTimeDateFormat() {
      var date = new Date();
      var year = date.getFullYear();
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      //  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      //  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      //  var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return year + "-" + month + "-" + day + " " + "00:00:00";
    },
    endTimeDateFormat() {
      var date = new Date();
      var year = date.getFullYear();
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      day += 1;
      //  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      //  var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      //  var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return year + "-" + month + "-" + day + " " + "00:00:00";
    },
    init() {
      getChartSensorData(this.value, this.startTime, this.endTime)
        .then((response) => {
          // 后端返回数据
          const result = response.data;
          // 将数据放入到store
          this.$store.commit("getSensorData", result);
          this.watchData();
        })
        .catch((error) => {
          // 弹出用户未登入
          console.log(error);
        });
    },
    initList() {
      // 开启定时器接收数据
      this.timer = window.setInterval(() => {
        getDataList().then((response) => {
          console.log("后端返回数据:" + response.data);
          //const rs =  JSON.parse(response.data)
          this.$store.commit("saveDataResult", response.data);
        });
      }, 1000);
    },
  },
  mounted() {
    this.init();
    this.getDeviceList();
  },
  created() {
    this.initList();
  },
  beforeDestroy() {
    // 关闭定时器
    window.clearInterval(this.timer); // 关闭定时器
  },
};
</script>

<style lang="less" scoped>
.text item {
  width: 100%;
  height: 100%;
}

.datapresentaionsmain {
  width: 100%;
}
</style>

