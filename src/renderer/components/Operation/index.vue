<template>
  <div class="title-bar">
    <div class="right">
      <img @click="minimize" src="~@/assets/icon_minimize_gery.png">
      <img v-if="!isMaximize" @click="maximize" src="~@/assets/icon_maximize.png">
      <img v-else @click="unmaximize" src="~@/assets/icon_unmaximize.png">
      <img @click="close" src="~@/assets/icon_close_gery.png">
    </div>
  </div>
</template>

<script>
  const { ipcRenderer } = require('electron')
  export default {
    name: 'Operation',
    data () {
      return {
        isMaximize: false
      }
    },
    mounted () {},
    methods: {
      maximize () {
        ipcRenderer.send('maximize')
        this.isMaximize = true
      },
      unmaximize () {
        ipcRenderer.send('unmaximize')
        this.isMaximize = false
      },
      minimize () {
        ipcRenderer.send('minimize')
      },
      close () {
        ipcRenderer.send('close')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .title-bar {
    width: 100%;
    height: 50px;
    z-index: 9;
    -webkit-app-region: drag; // 可拖动
    position: absolute;
    .right {
      position: absolute;
      right: 0;
      top: 0;
      user-select: none;
      -webkit-app-region: no-drag; // 不可拖动
      img {
        width: 16px;
        height: 16px;
        margin: 15px 15px 0 0;
        cursor: pointer;
        user-select: none;
      }
    }
  }
</style>
