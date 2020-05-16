<template>
  <div>
    <el-button type="primary" @click="goBack">返回</el-button>
    <p>这是主页</p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {}
  },
  methods: {
    goBack () {
      this.$router.push('/')
    }
  }
}
</script>