<template>
  <div class="home">
    <div class="header">
      <el-button type="primary" icon="el-icon-arrow-left" size="small" @click="goBack">返回</el-button>
      <el-button type="primary" size="small" @click="add">新增</el-button>
      <el-button type="primary" size="small" @click="del">删除</el-button>
    </div>
    <main>
      <el-table
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          prop="name"
          label="姓名"
          align="center" />
        <el-table-column
          prop="birthday"
          label="出生年月"
          align="center" />
        <el-table-column
          prop="age"
          label="年龄"
          align="center" />
        <el-table-column
          prop="category"
          label="病理"
          align="center" />
        <el-table-column
          prop="note"
          label="备注"
          align="center" />
        <el-table-column
          fixed="right"
          label="操作"
          width="120"
          align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleView(scope)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.$db.getAllMatching('user').then(res => {
        this.tableData = res
      })
    },
    goBack () {
      this.$router.push('/')
    },
    add () {
      this.$db.add('user', { name: 'zansan', birthday: '1950.02', age: '24', category: '3', note: '' })
      this.getList()
    },
    del () {
      this.$db.getAllMatching('user', {
        index: 'name',
        query: IDBKeyRange.only('zansan'),
        includeKeys: 1
      }).then(data => {
        data.map(item => this.$db.delete('user', item.primaryKey))
        this.getList()
      })
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
