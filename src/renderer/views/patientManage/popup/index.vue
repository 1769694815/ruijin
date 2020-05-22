<template>
  <el-dialog
    :visible="dialogVisible"
    :title="operationStatus | dialogTitle"
    :destory-on-close="true"
    @close="closeDialog">
    <el-row
      style="padding: 0 20px;"
      :span="24">
      <el-form
        ref="dataForm"
        :rules="formRules"
        :model="formData">
        <el-col :xs="12" :lg="12">
          <el-form-item
            prop="username"
            label="姓名:"
            :label-width="formLabelWidth">
              <el-input
                v-model="formData.username"
                :disabled="operationStatus == 1"
                autocomplete="off"
                placeholder="请输入姓名"
              />
          </el-form-item>
        </el-col>
        <el-col :xs="12" :lg="12">
          <el-form-item
            prop="username"
            label="影像号:"
            :label-width="formLabelWidth">
              <el-input
                v-model="formData.iconographyNum"
                :disabled="operationStatus == 1"
                autocomplete="off"
                placeholder="请输入影像号"
              />
          </el-form-item>
        </el-col>
        <el-col :xs="12" :lg="12">
          <el-form-item
            prop="birthday"
            label="出生日期:"
            :label-width="formLabelWidth">
              <el-date-picker
                v-model="formData.birthday"
                :disabled="operationStatus == 1"
                type="date"
                placeholder="选择日期或输入(2020-05-20)"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                style="width: 100%;">
              </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :lg="12">
          <el-form-item
            prop="age"
            label="年龄:"
            :label-width="formLabelWidth">
              <el-input
                v-model="formData.age"
                autocomplete="off"
                placeholder="请输入年龄"
                disabled
              />
          </el-form-item>
        </el-col>
        <el-col :xs="12" :lg="12">
          <el-form-item
            prop="category"
            label="病理:"
            :label-width="formLabelWidth">
              <el-input
                v-model="formData.category"
                :disabled="operationStatus == 1"
                autocomplete="off"
                placeholder="请输入病理"
              />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="24">
          <el-form-item
            prop="note"
            label="备注:"
            :label-width="formLabelWidth">
              <el-input
                :disabled="operationStatus == 1"
                :autosize="{ minRows: 2, maxRows: 4}"
                type="textarea"
                v-model="formData.note"
                placeholder="请输入备注"
                autocomplete="off"
              />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div
      slot="footer"
      class="doalog-footer"
    >
      <el-button
        v-if="operationStatus === 0"
        type="primary"
        size="small"
        @click="create"
      >保 存</el-button>
      <el-button
        v-if="operationStatus === 2"
        type="primary"
        size="small"
        @click="update"
      >修 改</el-button>
      <el-button
        size="small"
        @click="closeDialog"
      >取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      formData: JSON.parse(JSON.stringify(this.form)),
      formRules: {},
      formLabelWidth: '90px',
    }
  },
  props: {
    form: {
      type: Object,
      default: function () {
        return {}
      }
    },
    operationStatus: {
      type: Number,
      default: 0
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  filters: {
    dialogTitle (type) {
      const titleMap = {
        0: '新 增',
        1: '查 看',
        2: '编 辑',
        3: '删 除'
      }
      return titleMap[type]
    } 
  },
  watch: {
    'formData.birthday': function (val) {
      this.getAge(val)
    }
  },
  methods: {
    getAge (val) {
      let newTime = new Date().getTime()
      let birthdayTime = new Date(val).getTime()
      this.formData.age = Math.ceil((newTime - birthdayTime) / (360 * 24 * 60 * 60 * 1000))
    },
    create () {
      this.$emit('create', this.formData)
    },
    update () {
      this.$emit('update', this.formData)
    },
    closeDialog () {
      this.$emit('closeDialog')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
