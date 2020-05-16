<!--
 * @Author: xwen
 * @Date: 2020-05-16 10:58:19
 * @LastEditTime: 2020-05-16 23:49:35
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

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
