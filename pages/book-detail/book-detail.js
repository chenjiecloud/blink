import { BookModel } from '../../models/book'
import { LikeModel } from '../../models/like.js'

const bookModel = new BookModel()
const likeModel = new LikeModel()

Page({
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false,
  },

  onLoad(options) {
    const { bid } = options
    this.getBookDetail(bid)
  },

  async getBookDetail(bid) {
    wx.showLoading()
    try {
      const detail = await bookModel.getDetail(bid)
      const comments = await bookModel.getComments(bid)
      const likeStatus = await bookModel.getLikeStatus(bid)
      this.setData({
        book: detail,
        comments: comments.comments,
        likeStatus: likeStatus.like_status,
        likeCount: likeStatus.fav_nums,
      })
    } catch (e) {
      console.log(e)
    }
    wx.hideLoading()
  },

  onLike(event) {
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },

  onFakePost(event) {
    this.setData({
      posting: true,
    })
  },

  onCancel(event) {
    this.setData({
      posting: false,
    })
  },
  // 发送短评
  async onPost(event) {
    const comment = event.detail.text || event.detail.value
    if (!comment) {
      return
    }
    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none',
      })
      return
    }
    try {
      await bookModel.postComment(this.data.book.id, comment)
    } catch (e) {
      console.log(e)
    }
    wx.showToast({
      title: '+ 1',
      icon: 'none',
    })
    this.data.comments.unshift({
      content: comment,
      nums: 1,
    })
    this.setData({
      comments: this.data.comments,
      posting: false,
    })
  },
})
