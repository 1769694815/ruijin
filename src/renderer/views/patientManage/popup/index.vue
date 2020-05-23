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
            prop="iconographyNum"
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
            prop="idCard"
            label="身份证号:"
            :label-width="formLabelWidth">
              <el-input
                v-model="formData.idCard"
                :disabled="operationStatus == 1"
                autocomplete="off"
                placeholder="请输入身份证号"
              />
          </el-form-item>
        </el-col>
        <el-col :xs="12" :lg="12">
          <el-form-item
            prop="phone"
            label="手机号码:"
            :label-width="formLabelWidth">
              <el-input
                v-model="formData.phone"
                :disabled="operationStatus == 1"
                autocomplete="off"
                placeholder="请输入手机号码"
              />
          </el-form-item>
        </el-col>
        <el-col v-if="operationStatus == 1" :xs="12" :lg="12">
          <el-form-item
            prop="birthday"
            label="出生日期:"
            :label-width="formLabelWidth">
              <el-input
                v-model="formData.birthday"
                disabled />
          </el-form-item>
        </el-col>
        <el-col v-if="operationStatus == 1" :xs="12" :lg="12">
          <el-form-item
            prop="age"
            label="年龄:"
            :label-width="formLabelWidth">
              <el-input
                v-model="formData.age"
                autocomplete="off"
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
        <el-col v-if="operationStatus == 1" :xs="12" :lg="12">
          <el-form-item
            prop="lastRecordsTime"
            label="最近回访时间:"
            :label-width="formLabelWidth">
              <el-input
                disabled
                v-model="formData.lastRecordsTime"
                placeholder="无"
              />
          </el-form-item>
        </el-col>
        <el-col :xs="12" :lg="12">
          <el-form-item
            prop="nextRecordsTime"
            label="下次回访时间:"
            :label-width="formLabelWidth">
              <el-date-picker
                v-model="formData.nextRecordsTime"
                align="right"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 100%"
                placeholder="请选择下次回访时间"
                :disabled="operationStatus == 1"
                :picker-options="pickerOptions" />
          </el-form-item>
        </el-col>
        <el-col v-if="operationStatus != 0" :xs="24" :lg="24">
          <el-form-item
            prop="followUpRecords"
            label="回访记录："
            :label-width="formLabelWidth">
            <el-collapse accordion>
              <el-collapse-item>
                <template slot="title">
                  <p style="font-size: 16px">共{{ recordCount }}条</p>
                </template>
                <div class="block">
                  <el-timeline
                    v-for="(item, index) in formData.followUpRecords"
                    :key="index">
                    <el-timeline-item :timestamp="item.time" placement="top">
                      <el-card>
                        <h4>第{{ index + 1 }}次回访记录</h4>
                        <p>{{ item.content }}</p>
                      </el-card>
                    </el-timeline-item>
                  </el-timeline>
                </div>
              </el-collapse-item>
            </el-collapse>
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
    var checkTime = (rule, value, callback) => {
      console.log('value', value)
      if (value) {
        let inputTime = new Date(value).getTime()
        let newTime = new Date().getTime()
        console.log('inputTime', inputTime, newTime)
        if (inputTime < newTime) {
          callback(new Error(rule.message))
        }
      }
    }
    return {
      formData: JSON.parse(JSON.stringify(this.form)),
      formRules: {
        username: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }],
        iconographyNum: [{
          required: true,
          message: '请输入影像号',
          trigger: 'blur'
        }],
        idCard: [{
          required: true,
          message: '请输入18位身份证号',
          trigger: 'blur',
          min: 18,
          max: 18
        }],
        phone: [{
          required: true,
          message: '请输11位手机号码',
          trigger: 'blur',
          min: 11,
          max: 11
        }],
        category: [{
          required: true,
          message: '请输入病理',
          trigger: 'blur'
        }],
        lastRecordsTime: [{
          validator: checkTime,
          required: false,
          message: '请选择正确的随访时间',
          trigger: 'change'
        }]
      },
      formLabelWidth: '120px',
      pickerOptions: {
        disableDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '一周后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }, {
          text: '半个月后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 14);
            picker.$emit('pick', date);
          }
        }, {
          text: '一个月后',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 4);
            picker.$emit('pick', date);
          }
        }]
      }
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
    'formData.idCard': function (val) {
      this.getBirthdayAndAge(val)
    }
  },
  computed: {
    recordCount () {
      return this.formData.followUpRecords && this.formData.followUpRecords.length || 0
    }
  },
  methods: {
    getBirthdayAndAge (val) {
      let str = val.slice(6, 14)
      let year = str.slice(0, 4)
      let month = str.slice(4, 6)
      let day = str.slice(-2)
      let newTime = new Date().getTime()
      let birthdayTime = new Date(`${year}-${month}-${day}`).getTime()
      this.formData.birthday = `${year}年${month}月${day}日`
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
