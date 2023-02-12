<template>
  <div>
    <el-card class="box-card">
      <div class="text item">
        <el-table
          :data="
            tableData.filter(
              (data) =>
                !search ||
                data.name.toLowerCase().includes(search.toLowerCase())
            )
          "
          style="width: 100%; height: 100%"
        >
          <el-table-column label="上线时间" prop="date"> </el-table-column>
          <el-table-column label="姓名" prop="name"> </el-table-column>
          <el-table-column label="地址" prop="address"> </el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="{}">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"
              />
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                >修改</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div style="text-align: center; padding-top: 20px">
        <el-pagination small layout="prev, pager, next" :total="pageSize">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
       pageSize:1, 
       pageNum:50,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      search: "",
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    init() {
      // 获取后端用户数据
      getAllUsers(this.search, this.pageSize, this.pageNum)
        .then((response) => {
          // 后端返回数据
          const result = response.data;
          // 将数据放入到store
          console.log(result)
        })
        .catch((error) => {
          // 弹出用户未登入
          console.log(error);
        });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>