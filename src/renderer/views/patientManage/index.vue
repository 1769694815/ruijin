<template>
  <div class="app-container calendar-list-container">
    <el-form
      :inline="true"
      class="search"
      size="medium">
      <el-form-item
        label="姓名:"
        label-width="80px">
        <el-input
          v-model="searhForm.username"
          type="text"
          size="small"
          placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item
        label="手机号:"
        label-width="80px">
        <el-input
          v-model="searhForm.phone"
          type="text"
          size="small"
          placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item
        label="病理:"
        label-width="80px">
        <el-input
          v-model="searhForm.category"
          type="text"
          size="small"
          placeholder="请输入病理" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          @click="handleFilter"
        >搜 索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="default"
          icon="el-icon-delete"
          size="small"
          @click="handleEmpty"
        >清 空</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <Xtable
      :table-key="tableKey"
      :table-loading="tableLoading"
      :table-data="tableData"
      :page="page"
      menu-width="200px"
      :table-option.sync="tableOption"
      @handle-create="handleCreate"
      @refresh-change="handleFilter"
      @page-change="getList">
        <template
          slot="menu"
          slot-scope="scope">
          <el-button
            type="text"
            icon="el-icon-view"
            size="mini"
            @click="handleView(scope.row)"
          >查看
          </el-button>
          <el-button
            type="text"
            icon="el-icon-view"
            size="mini"
            @click="handleUpdate(scope.row)"
          >编辑
          </el-button>
          <!-- <el-button
            type="text"
            size="mini"
            icon="el-icon-delete"
            @click="handleDelete(scope.row, scope.index)"
          >删除
          </el-button> -->
        </template>
    </Xtable>
    <popup ref="popup" :form="form" v-if="dialogVisible" :dialogVisible="dialogVisible" :operationStatus="operationStatus" @create="create" @update="update" @closeDialog="closeDialog" />
  </div>
</template>

<script>
import tableOption from '@/curd/patientManage.js'
import Popup from './popup/index'
export default {
  name: 'PatientMange',
  components: {
    Popup
  },
  data () {
    return {
      tableKey: 0,
      tableLoading: false,
      tableData: [],
      tableOption: tableOption,
      page: {
        total: 0,
        current: 1,
        size: 10
      },
      searhForm: {},
      operationStatus: 0,
      dialogVisible: false,
      form: {}
    }
  },
  created () {
    this.getListCount()
    this.getList()
  },
  methods: {
    getListCount () {
      this.$db.count('user').then(res => {
        this.page.total = res
      })
    },
    getList () {
      let lowerBound = (this.page.current - 1) * this.page.size + 1
      let upperBound = this.page.current * this.page.size
      this.$db.getAllMatching('user', { index: 'id', query: IDBKeyRange.bound(lowerBound, upperBound) }).then(res => {
        this.tableData = res
      })
    },
    handleFilter () {},
    handleEmpty () {},
    handleView (row) {
      this.dialogVisible = true
      this.operationStatus = 1
      this.form = row
    },
    handleUpdate (row) {
      this.dialogVisible = true
      this.operationStatus = 2
      this.form = row
    },
    handleDelete () {},
    handleCreate () {
      this.dialogVisible = true
      this.operationStatus = 0
    },
    create (form) {
      this.$children[2].$refs.dataForm.validate(valid => {
        if (valid) {
          this.tableLoading = true
          this.$db.add('user', form).then(res => {
            this.tableLoading = false
            this.dialogVisible = false
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            })
            this.getList()
            // 判断设定下次随访时间  加入随访计划 DOTO
          })
        }
      })
    },
    // 添加带随访计划中 DOTO

    update (form) {
      this.$children[2].$refs.dataForm.validate(valid => {
        if (valid) {
          this.tableLoading = true
          this.$db.put('user', form).then(res => {
            this.tableLoading = false
            this.dialogVisible = false
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            })
            this.getList()
          })
        }
      })
    },
    closeDialog () {
      this.dialogVisible = false
      this.operationStatus = 0
    }
  }
}
</script>
