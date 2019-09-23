import { HTTP } from '../utils/http'

class ClassicModel extends HTTP {
  // 获取最新一期
  getLatest(sCallback) {
    this.request({
      url: 'classic/latest',
      success: res => {
        sCallback(res)
        this._setLatestIndex(res.index)
      },
    })
  }

  // 获取当前一期的上一期 | 获取当前一期的下一期
  getClassic(index, nextOrPrevious, sCallback) {
    let key =
      nextOrPrevious === 'next'
        ? this._getKey(index + 1)
        : this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: res => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        },
      })
    } else {
      sCallback(classic)
    }
  }

  getMyFavor(success) {
    const params = {
      url: 'classic/favor',
      success: success,
    }
    this.request(params)
  }

  getById(cid, type, success) {
    let params = {
      url: `classic/${type}/${cid}`,
      success: success,
    }
    this.request(params)
  }

  isFirst(index) {
    return index === 1 ? true : false
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return latestIndex === index ? true : false
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }

  _getKey(index) {
    let key = 'classic-' + index
    return key
  }
}

// 注重性能，用户体验，需要做缓存，但是，做缓存是需要考虑的东西是很多的
// 频繁发送请求也是需要加入缓存的机制
export { ClassicModel }
