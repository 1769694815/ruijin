
<template>
  <div class="dashboard-container">
    <p @click="sendNotification">首页</p>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
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
    },
    sendNotification () {
      const myNotification = new Notification('标题', {
        body: '通知正文内容'
      })
      myNotification.onclick = () => {
        console.log('通知被点击')
      }
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
