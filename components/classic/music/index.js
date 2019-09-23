import { classicBeh } from '../classic-beh'

const backAudioManager = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: String,
    title: String,
  },
  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc: './images/player@pause.png',
    playSrc: './images/player@play.png',
    playIng: false,
  },
  lifetimes: {
    attached() {
      this._recoverStatus()
      this._monitorSwitch()
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      if (!this.data.playIng) {
        this.setData({
          playIng: true,
        })
        backAudioManager.src = this.properties.src
        backAudioManager.title = this.properties.title
      } else {
        this.setData({
          playIng: false,
        })
        backAudioManager.pause()
      }
    },
    // 恢复状态
    _recoverStatus() {
      if (backAudioManager.paused) {
        this.setData({
          playIng: false,
        })
        return
      }

      if (backAudioManager.src == this.properties.src) {
        this.setData({
          playIng: true,
        })
      }
    },
    _monitorSwitch() {
      backAudioManager.onPlay(() => {
        this._recoverStatus()
      })
      backAudioManager.onPause(() => {
        this._recoverStatus()
      })
      backAudioManager.onStop(() => {
        this._recoverStatus()
      })
      backAudioManager.onEnded(() => {
        this._recoverStatus()
      })
    },
  },
})
