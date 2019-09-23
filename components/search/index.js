import { KeywordModel } from '../../models/keyword'
import { BookModel } from '../../models/book'
import { paginationBev } from '../behaviors/pagination'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  behaviors: [paginationBev],
  properties: {
    more: String,
  },
  data: {
    historyWords: [],
    hotWords: [],
    q: '',
    searching: false,
    loading: false,
    loadingCenter: false,
  },
  observers: {
    async more() {
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        // 锁的概念
        this.locked()
        const res = await bookModel.search(this.getCurrentStart(), this.data.q)
        this.setMoreData(res.books)
        this.unLocked()
      }
    },
  },
  lifetimes: {
    async attached() {
      try {
        const historyWords = keywordModel.getHistory()
        // 业务请求放到组件里面，复用性是不高的，看业务的需要
        const hotWords = await keywordModel.getHot()
        this.setData({
          historyWords,
          hotWords: hotWords.hot,
        })
      } catch (e) {
        console.log(e)
      }
    },
  },
  methods: {
    onCancel(event) {
      this.initialize()
      this.triggerEvent('cancel', {}, {})
    },

    onDelete() {
      this.initialize()
      this._closeResult()
    },

    async onConfirm(event) {
      this._showResult()
      this._showLoadingCenter()
      const q = event.detail.value || event.detail.text
      this.setData({
        q,
      })
      try {
        const res = await bookModel.search(0, q)
        this.setMoreData(res.books)
        this.setTotal(res.total)
        keywordModel.addToHistory(q)
        this._hideLoadingCenter()
      } catch (e) {
        console.error(e)
      }
    },

    _showLoadingCenter() {
      this.setData({
        loadingCenter: true,
      })
    },

    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false,
      })
    },

    _showResult() {
      this.setData({
        searching: true,
      })
    },

    _closeResult() {
      this.setData({
        searching: false,
        q: '',
      })
    },
  },
})
