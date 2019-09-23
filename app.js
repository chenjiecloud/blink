App({
  globalData: {},
  // 小程序初始化完成时触发，全局只触发一次
  onLaunch(options) {
    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(res => {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })

    updateManager.onUpdateReady(() => {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: res => {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        },
      })
    })

    updateManager.onUpdateFailed(err => {
      // 新版本下载失败
      console.log(err)
    })
  },
  // 小程序启动，或从后台进入前台显示时触发
  onShow(options) {},
  // 小程序从前台进入后台时触发
  onHide() {},
  // 小程序发生脚本错误或 API 调用报错时触发
  onError(msg) {
    console.log(
      '%cmsg: ',
      'color: MidnightBlue; background: Aquamarine; font-size: 20px;',
      msg,
    )
  },
  // 小程序要打开的页面不存在时触发
  onPageNotFound(res) {
    wx.redirectTo({
      url: 'pages/classic/classic',
    })
  },
})
