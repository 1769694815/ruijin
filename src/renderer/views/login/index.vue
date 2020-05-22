<template>
  <div id="wrapper">
    <operation />
    <img id="logo" src="~@/assets/logo.jpg" alt="electron-vue">
    <!-- <h2 class="title">瑞金医院伽马刀科室</h2> -->
    <main>
      <el-button type="primary" round @click="toHome">查看数据</el-button>
    </main>
  </div>
</template>

<script>
  import Operation from '@/components/Operation'
  export default {
    name: 'Login',
    components: {
      Operation
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      toHome () {
        this.$router.push('/dashboard')
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    border-top: 1px solid transparent;
    background: url('~@/assets/bg.jpg');
    background-size: cover;
    position: relative;
  }

  #logo {
    height: auto;
    display: block;
    margin: 80px auto 20px;
    width: 80px;
  }
  h2.title {
    font-size: 32px;
    text-align: center;
    color: #fff;
  }

  #wrapper main {
    height: calc(100vh - 280px);
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
