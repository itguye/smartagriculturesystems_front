<template>
  <div>
    <el-table :data="getTableData" style="width: 100%">
      <el-table-column label="传感器">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数值">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ getOnline }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium"
                >{{ scope.row.data |dataIsNull}}{{  scope.row.data ==null? '':scope.row.symbol }}</el-tag
              >
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <!-- <template>
        <span style="margin-left: 10px">{{ getOnline }}</span>
      </template> -->
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            type="success"
            >修改</el-button
          >
          <el-button
            size="mini"
            @click="handleDelete(scope.$index, scope.row)"
            type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="传感器" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="规则名">
          <el-input
            v-model="form.ruleName"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备名">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="符号名">
          <el-input v-model="form.symbol" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Cancel">取 消</el-button>
        <el-button type="primary" @click="handleDialogUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  
  <script>
import { updateDeviceSymbol, deleteDeviceSymbol } from "@/api/symbol";
export default {
  data() {
    return {
      // tableData: ,
      dialogFormVisible: false,
      form: {
        name: "",
        symbol: "",
        ruleName: "",
      },
    };
  },filters: {
    dataIsNull(data) {
      if (data == null || data === "") {
        return "N/A";
      }
      return data;
    },
  },
  methods: {
    reSet(){
      this.form =  {
        name: "",
        symbol: "",
        ruleName: "",
      }
      this.dialogFormVisible = false;
    },
    handleEdit(index, row) {
      // 弹出对话框
      // this.open(row);
      this.dialogFormVisible = true;
      this.form.name = row.name;
      this.form.symbol = row.symbol;
      this.form.ruleName = row.ruleName;
    },
    handleDelete(index, row) {
     
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteDeviceSymbol(row.ruleName)
            .then((response) => {
              if (response.data === "success") {
                this.$message({
                  message: "删除成功,将在下次数据获取后进行更新!",
                  type: "success",
                });
              }
            })
            
        })
        this.reSet();
    },
    Cancel() {
      this.reSet();
    },
    handleDialogUpdate() {
      updateDeviceSymbol(this.form)
        .then((response) => {
          if (response.data === "success") {
            this.$message({
              message: "修改成功,将在下次数据获取后进行更新!",
              type: "success",
            });
          }
          this.dialogFormVisible = false;
        })
        this.reSet();
    },
  },
  computed: {
    getTableData() {
      return this.$store.state.devices.sensorData;
    },
    getOnline() {
      return this.$store.state.devices.connection_info;
    },
  },
};
</script>

<style lang="less" scoped>
</style>