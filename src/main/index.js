'use strict'

import { app, BrowserWindow, ipcMain, Tray, Menu } from 'electron'
// import '../renderer/store'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let tray
const isDevelopment = process.env.NODE_ENV === 'development'
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`


function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    width: 1000,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // 设置托盘
    tray = new Tray(`static/icon.png`)
  } else {
    tray = new Tray(`${__dirname}/static/icon.png`)
  }
  // 创建渲染窗口
  createWindow()  
  // 设置托盘菜单
  const trayContextMenu = Menu.buildFromTemplate([
    {
      label: '打开',
      click: () => {
        app.show()
      }
    },
    {
      label: '退出',
      click: () => {
        app.quit()
      }
    }
  ])

  tray.setToolTip('myApp')
  tray.on('click', () => {
    mainWindow.show()
  })
  tray.on('right-click', () => {
    tray.popUpContextMenu(trayContextMenu)
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('changWindowSize', e =>
  mainWindow.setSize(1050, 700)
)

ipcMain.on('close', e =>
  mainWindow.hide()
)

ipcMain.on('minimize', e =>
  mainWindow.minimize()
)

ipcMain.on('maximize', e =>
  mainWindow.maximize()
)

ipcMain.on('unmaximize', e =>
  mainWindow.unmaximize()
)

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
