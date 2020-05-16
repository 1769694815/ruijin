<!--
 * @Author: xwen
 * @Date: 2020-05-16 10:58:19
 * @LastEditTime: 2020-05-17 01:22:00
 * @LastEditors: xwen
 * @Description: 
--> 
# ruijin

> An electron-vue project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```

#### electron的安装
``` bash
# 单独设置镜像（即时已经全局设置镜像过了）
npm config set electron_mirror http://npm.taobao.org/mirrors/electron/

# 设置要安装的版本
npm config set electron_custom_dir "8.3.0"

```

#### electron-vue
注意node版本
建议使用cnpm安装

---

#### electron打包
``` bash

# electron-builder 版本改为19.19.1

# 手动下载打包资源文件

## 设置淘宝镜像：
npm set ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/
### 或者是在C:\Users\用户名下找到.npmrc直接添加
ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/

## 下载对应的资源文件
> C:\Users\dell\AppData\Local\electron-builder\Cache\app-builder            app-builder-v0.6.1-x64
> C:\Users\dell\AppData\Local\electron-builder\Cache\nsis                   nsis-3.0.1.13
> C:\Users\dell\AppData\Local\electron-builder\Cache\nsis-resources         nsis-resources-3.3.0
> C:\Users\dell\AppData\Local\electron-builder\Cache\winCodeSign            winCodeSign-1.9.0

```

#### 白屏问题
```` bash
找到配置文件 .electron-vue/webpack.renderer.config.js
let whiteListedModules = ['vue']
//将上面这句改为
let whiteListedModules = ['vue' , 'vue-router', 'axios', 'vuex', 'vue-electron']

注释 ...Object.keys(dependencies || {}).filter(d => !whiteListedModules.includes(d))

重新打包即可！

````

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
