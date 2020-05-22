<!--
 * @Date: 2020-02-14 17:09:18
 * @LastEditors: xwen
 * @Author: xw
 * @LastEditTime: 2020-05-22 16:46:53
 * @Description: 表格组件
 -->
<template>
  <div class="x__table">
    <div class="x__menu">
      <div class="x__menu__left">
        <template>
          <el-button
            v-if="addBtn"
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="handleCreate"
          >新 增</el-button>
          <slot
            v-else
            name="menuLeft"
          />
        </template>
      </div>
      <div class="x__menu__right">
        <el-tooltip
          placement="top"
          content="刷新"
        >
          <el-button
            icon="el-icon-refresh"
            size="small"
            circle
            @click="handleRefresh"
          />
        </el-tooltip>
        <el-tooltip
          placement="top"
          content="显隐"
        >
          <el-button
            icon="el-icon-menu"
            size="small"
            tooltip
            circle
            @click="hideVisible = true"
          />
        </el-tooltip>
      </div>
    </div>
    <el-table
      :key="tableKey"
      v-loading="tableLoading"
      :data="tableData"
      row-key="id"
      :tree-props="treeProps"
      border
      stripe
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <!-- 复选框 -->
      <el-table-column
        v-if="selection"
        type="selection"
        align="center"
        width="55"
      />
      <el-table-column
        v-if="index"
        type="index"
        label="序号"
        align="center"
        width="50"
      >
        <template slot-scope="scope">
          <span>{{ scope.$index + (page.current - 1) * page.size + 1 }}</span>
        </template>
      </el-table-column>
      <template v-for="item in tableOption">
        <el-table-column
          v-if="!item.hide"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :align="item.align || 'center'"
          :show-overflow-tooltip="item.overHidden || true"
        >
          <template slot-scope="scope">
            <slot
              v-if="item.slot"
              :name="scope.column.property"
              :row="scope.row"
              :$index="scope.$index"
            />
            <!-- 有默认数据 -->
            <span v-else-if="(item.dicData && item.dicData.length) || item.dicUrl">
              <el-tag v-if="scope.row[scope.column.property] !== null || scope.row[scope.column.property] !== ''">{{ scope.row[scope.column.property] | statusFilter(item.dicData, item.dicProp) }}</el-tag>
            </span>
            <!-- 链接跳转 -->
            <span
              v-else-if="item.link"
            >
              <el-link :href="scope.row[scope.column.property]" target="_blank">{{ scope.row[scope.column.property] }}</el-link>
            </span>
            <!-- 图片 -->
            <span
              v-else-if="item.img"
            >
              <el-image
                :src="scope.row[scope.column.property]"
                lazy
                class="img"
                @click="imgView(scope.row[scope.column.property])"
              >
                <div slot="error" class="image-slot">
                  <span class="el-image__error">加载失败</span>
                </div>
              </el-image>
            </span>
            <span v-else>{{ scope.row[scope.column.property] }}</span>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        label="操作"
        align="center"
        :min-width="menuWidth"
        :fixed="menuFixed"
      >
        <template slot-scope="scope">
          <slot
            name="menu"
            :row="scope.row"
            :$index="scope.$index"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <Pagination
      v-show="page.total>0"
      :total="page.total"
      :page.sync="page.current"
      :limit.sync="page.size"
      @pagination="pageChange"
    />
    <el-dialog
      :visible.sync="hideVisible"
      title="多选"
    >
      <el-checkbox-group
        v-model="checkList"
        @change="checkChange"
      >
        <el-checkbox
          v-for="item in tableOption"
          :key="item.prop"
          :label="item.prop"
        >{{ item.label }}</el-checkbox>
      </el-checkbox-group>
    </el-dialog>
    <el-dialog
      :visible.sync="imgVisible"
      title="图片"
    >
      <el-image
        :src="imgUrl"
        lazy
        class="maxImg"
      />
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination/index'
export default {
  name: 'XTable',
  components: {
    Pagination
  },
  filters: {
    statusFilter(status, list, prop = { value: 'value', label: 'label' }) {
      let result
      for (const i in list) {
        const item = list[i]
        if (status === item[prop.value]) {
          result = item[prop.label]
        }
      }
      return result
    }
  },
  props: {
    selection: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    index: {
      type: Boolean,
      default: function() {
        return true
      }
    },
    addBtn: {
      type: Boolean,
      default: function() {
        return true
      }
    },
    tableKey: {
      type: Number,
      default: function() {
        return 0
      }
    },
    tableLoading: {
      type: Boolean,
      default: function() {
        return true
      }
    },
    tableData: {
      type: Array,
      default: function() {
        return []
      }
    },
    tableOption: {
      type: Array,
      default: function() {
        return []
      }
    },
    page: {
      type: Object,
      default: function() {
        return {
          total: 0,
          current: 1,
          page: 10
        }
      }
    },
    menuWidth: {
      type: String,
      default: function() {
        return '160'
      }
    },
    menuFixed: {
      type: String,
      default: function() {
        return 'right'
      }
    },
    excelTableData: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 导出数据
    excel: {
      type: Boolean,
      default: false
    },
    // 树形表格
    treeProps: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      hideVisible: false,
      checkList: [],
      imgVisible: false,
      imgUrl: ''
    }
  },
  watch: {
    excel: function(val) {
      if (val) {
        // 处理原数据，根据关键字枚举
        const data = JSON.parse(JSON.stringify(this.excelTableData))
        this.createTableData(data)
      }
    }
  },
  created() {
    this.tableOption.forEach(ele => {
      if (!ele.hide) {
        this.checkList.push(ele.prop)
      }
      if (ele.dicUrl && !ele.slot) {
        const isUrl = ele.dicUrl.indexOf('/') > -1
        if (isUrl) {
          http(ele.dicUrl).then(res => {
            ele.dicData = res.data.data
          })
        } else {
          remote(ele.dicUrl).then(res => {
            ele.dicData = res.data.data
          })
        }
      }
    })
  },
  methods: {
    checkChange(val) {
      let list = JSON.parse(JSON.stringify(this.tableOption))
      list = list.map(ele => {
        ele.hide = !this.checkList.includes(ele.prop)
        return ele
      })
      this.$emit('update:tableOption', list)
    },
    handleCreate() {
      this.$emit('handle-create')
    },
    handleRefresh() {
      this.$emit('refresh-change')
    },
    pageChange() {
      this.$emit('page-change')
    },
    imgView(url) {
      this.imgUrl = url
      this.imgVisible = true
    },
    createTableData(data) {
      data.map(item => {
        this.tableOption.map(val => {
          if (val.dicData && val.dicData.length > 0) {
            item[val.prop] = this.statusFilter(item[val.prop], val.dicData, val.dicProp)
          }
        })
      })
      this.$emit('excel-data', data)
    },
    statusFilter(status, list, prop = { value: 'value', label: 'label' }) {
      let result
      for (const i in list) {
        const item = list[i]
        if (status === item[prop.value]) {
          result = item[prop.label]
        }
      }
      return result
    },
    handleSelectionChange(val) {
      this.$emit('selection-change', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.img {
  width: 100px;
  height: auto;
  max-height: 100px;
  cursor: pointer;
  .image-slot {
    width: 100%;
    height: 100%;
  }
}
.maxImg {
  width: 100%;
  height: auto;
}
</style>
