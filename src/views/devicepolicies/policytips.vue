<template>
    <el-table :data="tableData" height="250"  style="width: 100%">
      <el-table-column prop="date" label="创建时间" > </el-table-column>
      <el-table-column prop="name" label="策略名" > </el-table-column>
      <el-table-column prop="police" label="策略表达式"> </el-table-column>
    </el-table>
</template>
  
  <script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-03",
          name: "策略1",
          police: "当土壤湿度低于30%时浇水",
        },
        {
          date: "2016-05-02",
          name: "策略2",
          police: "当火焰或烟雾传感器有火/有水时打开蜂鸣器",
        },
        {
          date: "2016-05-04",
          name: "策略3",
          police: "当水位情况低于3cm时,提醒用户浇水",
        }
      ],
    };
  },
};
</script>