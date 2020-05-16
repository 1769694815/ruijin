<template>
  <div class="home">
    <div class="header">
      <el-button type="primary" icon="el-icon-arrow-left" size="small" @click="goBack">返回</el-button>
    </div>
    <main>
      <el-table
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          prop="name"
          label="姓名" />
        <el-table-column
          prop="birthday"
          label="出生年月" />
        <el-table-column
          prop="age"
          label="年龄" />
        <el-table-column
          prop="category"
          label="病理" />
        <el-table-column
          prop="note"
          label="备注" />  
      </el-table>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      tableData: [
        {
          name: '张三',
          birthday: '1995年8月',
          age: '45',
          category: '肺癌脑转移',
          note: '备注'
        }, {
          name: '张三',
          birthday: '1995年8月',
          age: '45',
          category: '肺癌脑转移',
          note: '备注'
        }, {
          name: '张三',
          birthday: '1995年8月',
          age: '45',
          category: '肺癌脑转移',
          note: '备注'
        }
      ]
    }
  },
  methods: {
    goBack () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .home {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    padding: 10px 30px;
  }
  .home .header {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
  }
</style>