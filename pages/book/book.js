import { BookModel } from '../../models/book'
import { random } from '../../utils/common.js'

const bookModel = new BookModel()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getHotList()
  },

  async getHotList() {
    try {
      const hotList = await bookModel.getHotList()
      this.setData({
        books: hotList,
      })
    } catch (e) {
      console.error(e)
    }
  },

  onBookTo(e) {
    const bid = e.detail.bid
    wx.navigateTo({
      url: `/pages/book-detail/book-detail?bid=${bid}`,
    })
  },

  onSearching() {
    this.setData({
      searching: true,
    })
  },

  onCancel(event) {
    this.setData({
      searching: false,
    })
  },

  onReachBottom() {
    this.setData({
      more: random(16),
    })
  },
})
