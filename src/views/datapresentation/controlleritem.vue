<template>


  <div>
  
    <el-table :data="getTableData" style="width: 100%">
      <el-table-column label="控制器">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ getOnline }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.data |dataIsNull}}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.state"
            @change="changeSwitch(scope.$index, scope.row)"
          >
          </el-switch>
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
  
    <el-dialog title="控制器" :visible.sync="dialogFormVisible">
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
import { sendMsg } from "@/api/controller";
export default {
  data() {
    return {
      form: {
        name: "",
        ruleName: "",
      },      
      dialogFormVisible: false
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
        ruleName: "",
      }
      this.dialogFormVisible = false;
    },
    handleEdit(index, row) {
      // 弹出对话框
      // this.open(row);
      this.dialogFormVisible = true;
      this.form.name = row.name;
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
    changeSwitch(index, row) {
      const data_temp = row.data;
      const state_temp = row.state;
      let msg = "";
      if(state_temp){
        msg = "\""+row.ruleName+"\"" + ":" + 1;
      }else{
        msg =  "\""+row.ruleName +"\"" + ":" + 0;
      }
    
      sendMsg(msg.toString())
        .then((response) => {
          // 后端返回数据
          const result = response.data;
          if (result === "success") {
            if (state_temp) {
              row.data = "on";
              row.state = true;
            } else {
              row.data = "off";
              row.state = false;
            }
          } else {
            row.data = "off";
            row.state = false;
          }
        })
        
    }
  },
  computed: {
    getTableData() {
      return this.$store.state.devices.controllerData;
    },
    getOnline() {
      return this.$store.state.devices.connection_info;
    },
  }
};
</script>
  
<style lang="less" scoped>
.el-table__row {
  .cell {
    .el-switch {
      padding-right: 20px;
    }
  }
}
</style>