<template>
  <div style="padding: 6px">
    <!--搜索部分-->
    <el-card v-show="showSearch" style="margin-bottom: 6px">
      <el-form
        :model="listQuery"
        ref="queryForm"
        :inline="true"
        v-show="showSearch"
        label-width="68px"
        style="margin-bottom: -20px"
      >
        <el-form-item label="策略名称" prop="keyword">
          <el-input
            v-model="listQuery.keyword"
            placeholder="请输入策略名称"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="handleSearchList()"
            >搜索</el-button
          >
          <el-button
            icon="el-icon-refresh"
            size="mini"
            @click="handleResetSearch()"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <!--按钮操作部分-->
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5" style="margin-bottom: 10px">
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
            >新增</el-button
          >
        </el-col>

        <el-col :span="1.5" style="margin-bottom: 10px">
          <el-button
            type="success"
            plain
            icon="el-icon-delete-solid"
            size="mini"
            @click="handleCheckDelete"
            >批量删除</el-button
          >
        </el-col>

        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            @click="handleExport"
            >导出</el-button
          >
        </el-col>
      </el-row>
      <!--数据展示部分-->
      <div class="table-container">
        <el-table
          :data="sceneList"
          @selection-change="handleSelectionChange"
          v-loading="listLoading"
          border
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="策略名称" align="center" prop="ruleName" />
          <!-- <el-table-column label="用户ID" align="center" prop="userId" />
          <el-table-column label="用户名称" align="center" prop="userName" /> -->
          <el-table-column
            label="条件表达式"
            align="center"
            prop="expressions"
          />

          <el-table-column
            label="开始时间"
            align="center"
            prop="createTime"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.startTime | formatDateTime }} </span>
            </template>
          </el-table-column>

          <el-table-column
            label="结束时间"
            align="center"
            prop="createTime"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.endTime | formatDateTime }} </span>
            </template>
          </el-table-column>

          <el-table-column
            label="执行间隔(分)"
            align="center"
            prop="intervalTime"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.intervalTime | intervalTimeFormat }} </span>
            </template>
          </el-table-column>

          <el-table-column label="执行动作" align="center" prop="ation" />

          <el-table-column
            label="创建时间"
            align="center"
            prop="createTime"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.createTime | formatDateTime }} </span>
            </template>
          </el-table-column>
          <el-table-column
            label="修改时间"
            align="center"
            prop="updateTime"
            width="180"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.updateTime | formatDateTime }} </span>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center" prop="remark" />
          <el-table-column
            label="操作"
            align="center"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
                >修改</el-button
              >
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <!--分页查询部分-->
    <div class="pagination-container" style="margin-top: 10px">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[10, 15, 20]"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 添加或修改场景联动对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="16">
            <el-form-item label="策略名称" prop="sceneName">
              <el-input v-model="form.sceneName" placeholder="请输入策略名称" />
            </el-form-item>
          </el-col>

          <el-col :span="10">
            <el-form-item label="执行间隔" prop="intervalTime">
              <el-input
                v-model.number="form.intervalTime"
                placeholder="请输入执行间隔时间(分钟)"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="16">
            <el-form-item label="执行时间" prop="time">
              <!--执行时间-->
              <div
                class="block"
                style="float: left; padding: 3px 0; border: none"
              >
                <el-date-picker
                  v-model="form.time"
                  type="datetimerange"
                  align="right"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format="yyyy-MM-dd HH:mm:ss"
                  :default-time="['12:00:00', '08:00:00']"
                  @change="updateCHartsTimes"
                >
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="触发器" prop="griggers">
              <el-select
                v-model="form.condition"
                placeholder="请选择"
                size="small"
                style="margin-bottom: 10px"
              >
                <el-option
                  v-for="item in triggerConditions"
                  :key="getUuiD(item.value)"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <div
                v-for="(item, index) in form.triggers"
                :key="getUuiD(item.key)"
                style="
                  margin-bottom: 15px;
                  border: 1px solid #ddd;
                  padding: 10px;
                "
              >
                <el-row>
                  <el-col :span="4">
                    <el-select
                      v-model="item.source"
                      placeholder="请选择"
                      size="small"
                      @change="changeTriggerSource"
                    >
                      <el-option
                        v-for="subItem in sensorSource"
                        :key="getUuiD(subItem.value)"
                        :label="subItem.label"
                        :value="subItem.value"
                      >
                      </el-option>
                    </el-select>
                  </el-col>

                  <el-col :span="2" :offset="1" v-if="index != 0">
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      @click="removeTriggerItem(index)"
                      size="mini"
                      >删除</el-button
                    >
                  </el-col>
                </el-row>
                <!--设备-->
                <el-row>
                  <el-col :span="4">
                    <el-select
                      v-model="item.sensorName"
                      placeholder="请选择"
                      size="small"
                    >
                      <el-option
                        v-for="subItem in modelTypes"
                        :key="getUuiD(subItem.value)"
                        :label="subItem.label"
                        :value="subItem.value"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="5" :offset="1">
                    <el-select
                      v-model="item.operator"
                      placeholder="请选择操作符"
                      size="small"
                    >
                      <el-option key="=" label="等于(=)" value="=" />
                      <el-option key="!=" label="不等于(!=)" value="!=" />
                      <el-option key=">" label="大于(>)" value=">" />
                      <el-option key="<" label="小于(<)" value="<" />
                      <el-option key=">=" label="大于等于(>=)" value=">=" />
                      <el-option key="<=" label="小于等于(<=)" value="<=" />
                      <el-option
                        key="contain"
                        label="包含(contain)"
                        value="contain"
                      />
                      <el-option
                        key="notcontain"
                        label="不包含(not contain)"
                        value="notcontain"
                      />
                    </el-select>
                  </el-col>
                  <el-col :span="5" :offset="1">
                    <el-input
                      v-model="item.value"
                      placeholder="值"
                      size="small"
                    />
                  </el-col>
                </el-row>
              </div>
              <div>
                +
                <a style="color: #409eff" @click="addTriggerItem()"
                  >添加触发器</a
                >
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="执行动作">
              <div
                v-for="(item, index) in form.actions"
                :key="getUuiD(index)"
                style="
                  margin-bottom: 15px;
                  border: 1px solid #ddd;
                  padding: 10px;
                "
              >
                <el-row>
                  <el-col :span="4">
                    <el-select
                      v-model="item.source"
                      placeholder="请选择"
                      size="small"
                    >
                      <el-option
                        v-for="subItem in controlSource"
                        :key="getUuiD(subItem.value)"
                        :label="subItem.label"
                        :value="subItem.value"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                </el-row>
                <!---设备-->
                <el-row>
                  <el-col :span="4">
                    <el-select
                      v-model="item.actionName"
                      placeholder="请选择"
                      size="small"
                    >
                      <el-option
                        v-for="ats in actions_service"
                        :key="getUuiD(ats.value)"
                        :label="ats.label"
                        :value="ats.value"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="4" :offset="1">
                    <el-select
                      v-model="item.act"
                      placeholder="请选择"
                      size="small"
                    >
                      <el-option
                        v-for="at in actions"
                        :key="getUuiD(at.value)"
                        :label="at.label"
                        :value="at.value"
                      >
                      </el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="2" :offset="1" v-if="index != 0">
                    <!-- <a style="color: #f56c6c" @click="removeActionItem(index)"
                      >删除</a
                    > -->
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      @click="removeActionItem(index)"
                      size="mini"
                      >删除</el-button
                    >
                  </el-col>
                </el-row>
              </div>
              <div>
                +
                <a style="color: #409eff" @click="addActionItem()"
                  >添加执行动作</a
                >
              </div>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item label="备注" prop="remark">
              <el-input
                v-model="form.remark"
                type="textarea"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
    
<script>
import {
  updateScene,
  addScene,
  getAllList,
  delScene,
  getSceneById,
} from "@/api/policies";
import { getDeviceList } from "@/api/sensor";
import { formatDate } from "@/utils/date";
import { delChecksRules, exportMemberList } from "@/api/policies";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  keyword: null,
};
export default {
  data() {
    return {
      listLoading: false,
      // 遮罩层
      loading: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 场景联动表格数据
      sceneList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示Cron表达式弹出层
      openCron: false,
      // 传入的表达式
      expression: "",
      // 触发器的索引，用于接收传入的表达式
      triggerIndex: 0,
      // 查询参数
      queryParams: {
        // pageNum: 1,
        // pageSize: 10,
        sceneName: null,
        userId: null,
        userName: null,
      },
      listQuery: Object.assign({}, defaultListQuery),
      // 触发器源 1=传感器，2=控制器
      // triggerSource: [
      //   {
      //     value: "sensor",
      //     label: "传感器",
      //   },
      //   {
      //     value: "controlDevice",
      //     label: "控制器",
      //   },
      // ],
      //控制器操作
      sensorSource: [
        {
          value: "sensor",
          label: "传感器",
        },
      ],
      controlSource: [
        {
          value: "controlDevice",
          label: "控制器",
        },
      ],
      actions: [
        {
          value: false,
          label: "关",
        },
        {
          value: true,
          label: "开",
        },
      ], // 控制器列表
      actions_service: [],
      // 传感器列表
      modelTypes: [],
      // 触发器条件
      triggerConditions: [
        {
          value: "and",
          label: "满足所有条件",
        },
        {
          value: "or",
          label: "满足任一条件",
        },
      ],
      // 表单参数
      form: {
        condition: "and", // 触发器条件
        triggers: [], // 传感器条件
        actions: [], // 控制器执行规则
        time: [], // 执行时间
        startTime: null,
        endTime: null,
        intervalTime: null,
      },
      // 表单校验
      rules: {
        intervalTime: [{ type: "number", message: "执行间隔必须为数字值" }],
        sceneName: [
          {
            required: true,
            message: "场景名称不能为空",
            trigger: "blur",
          },
        ],
        userId: [
          {
            required: true,
            message: "用户ID不能为空",
            trigger: "blur",
          },
        ],
        userName: [
          {
            required: true,
            message: "用户名称不能为空",
            trigger: "blur",
          },
        ],
        triggers: [
          {
            required: true,
            message: "触发器不能为空",
            trigger: "blur",
          },
        ],
        actions: [
          {
            required: true,
            message: "执行动作不能为空",
            trigger: "blur",
          },
        ],
      },
      /** 触发器源改变事件 **/
      changeTriggerSource(data) {
        //this.setTriggerSource();
      },
    };
  },
  created() {
    this.getList();
    this.getDeviceList();
  },
  filters: {
    formatDateTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    intervalTimeFormat(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      return time;
    },
  },
  methods: {
    /** 重置按钮操作 */
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    } /** 搜索按钮操作 */,
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    } /** 改变页面大小操作 */,
    handleSizeChange(val) {
      console.log("修改页面大小");
      console.log(val);
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    } /** 改变起始位置操作 */,
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    updateCHartsTimes(times) {
      // 表单时间
      this.form.time = [times[0], times[1]];
      console.log(this.form);
    },
    /** 查询场景联动列表 */
    getList() {
      this.listLoading = true;
      // 分页查询的数据
      getAllList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.sceneList = response.data.list;
        this.total = response.data.total;
      });
    },
    getDeviceList() {
      // 获取符号表中的数据
      var temp = [];
      getDeviceList(null, null, null, null).then((response) => {
        temp = response.data;
        this.modelTypes = [];
        this.actions_service = [];
        for (var i = 0; i < temp.length; i++) {
          // 传感器
          if (temp[i].type === "0") {
            this.modelTypes.push({
              value: temp[i].ruleName,
              label: temp[i].name,
            });
          } else if (temp[i].type === "1") {
            // 控制器
            this.actions_service.push({
              value: temp[i].ruleName,
              label: temp[i].name,
            });
          }
        }

        console.log(this.modelTypes);
        console.log(this.actions_service);
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        time: [],
        sceneId: null,
        sceneName: null,
        userId: null,
        userName: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        intervalTime: null,
        condition: "and", // 触发器条件
        triggers: [
          {
            source: "sensor",
            sensorName: "",
            operator: "",
            value: null,
          },
        ],
        actions: [
          {
            source: "controlDevice",
            actionName: "",
            act: null,
          },
        ],
      };
      //this.resetForm("form");
    },
    getUuiD(randomLength) {
      randomLength = 4;
      return Number(
        Math.random().toString().substr(2, randomLength) + Date.now()
      ).toString(36);
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      console.log(selection);
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加策略联动";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      getSceneById(row.id).then((response) => {
        this.form = response.data;
        this.form.time = [response.data.startTime, response.data.endTime];
        console.log("从后端返回数据");
        console.log(this.form);
        this.open = true;
        this.title = "修改场景联动";
      });
      /** 删除按钮操作 */
    },
    handleDelete(row) {
      delScene(row.id).then((response) => {
        if (response.data === "success") {
          this.getList(); // 加载数据
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        }
      });
    } /** 导出按钮操作 */,
    handleExport() {
      exportMemberList().then((response) => {
        this.downloadFile(response, "智慧农业监测系统策略记录表.xlsx");
        this.$message({
          showClose: true,
          message: "导出成功",
          type: "success",
        });
      });
    },
    // 下载文件
    downloadFile(res, fileName) {
      const content = res.data;
      const blob = new Blob([content]);
      if ("download" in document.createElement("a")) {
        // 非IE下载
        const elink = document.createElement("a");
        elink.download = fileName;
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href); // 释放URL 对象
        document.body.removeChild(elink);
      } else {
        // IE10+下载
        navigator.msSaveBlob(blob, fileName);
      }
    },
    /** 提交按钮 */
    submitForm() {
      // 验证表单
      this.$refs["form"].validate((valid) => {
        // 验证成功
        if (valid) {
          if (this.form.time.length >= 2) {
            this.form.startTime = this.form.time[0];
            this.form.endTime = this.form.time[1];
          }
          if (this.form.id != null) {
            // 表示是修改数据
            updateScene(this.form).then((response) => {
              // this.$modal.msgSuccess("修改成功");
              if (response.data === "success") {
                this.open = false;
                this.getList(); // 加载数据
                this.$message({
                  type: "success",
                  message: "修改成功!",
                });
              }
            });
          } else {
            // 表示添加数据
            addScene(this.form).then((response) => {
              if (response.data === "success") {
                this.open = false;
                this.getList(); // 加载数据
                this.$message({
                  type: "success",
                  message: "添加成功!",
                });
              }
            });
          }
        }
      });
    } /** 批量删除 */,
    handleCheckDelete() {
      // 表示没有勾选
      if (this.ids.size == 0 || this.ids == null) {
        this.$message({
          message: "请先勾选需要删除的记录",
          type: "warning",
        });
        return;
      }

      // 弹出确认删除提示框
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 表勾选了
          delChecksRules(this.ids)
            .then((response) => {
              if (response.data === "success") {
                this.getList();
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              }
            })
            .catch((err) => {
              // 出现异常
              this.$message.error(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /** 添加动作 */
    addActionItem() {
      this.form.actions.push({
        source: "controlDevice",
        actionName: "",
        act: null,
      });
    },
    /** 删除动作 */
    removeActionItem(index) {
      this.form.actions.splice(index, 1);
    },
    /** 添加触发器 */
    addTriggerItem() {
      // this.setTriggerSource();
      this.form.triggers.push({
        source: "sensor",
        sensorName: "",
        operator: "",
        value: null,
      });
    },
    /** 删除触发器 */
    removeTriggerItem(index) {
      this.form.triggers.splice(index, 1);
      // this.setTriggerSource();
    },
  },
};
</script>
    