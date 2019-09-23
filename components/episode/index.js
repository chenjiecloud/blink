// components/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: Number,
  },
  /**
   * 组件的初始数据
   */
  data: {
    months: [
      '一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月',
    ],
    _index: 0,
    year: 0,
    month: '',
  },
  // 据监听器和属性的 observer 相比，数据监听器更强大且通常具有更好的性能
  observers: {
    index(index) {
      const _index = index < 10 ? '0' + index : index
      this.setData({
        _index,
      })
    },
  },
  lifetimes: {
    attached() {
      this.formatTime()
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    formatTime() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth()
      const months = this.data.months
      this.setData({
        year,
        month: months[month],
      })
    },
  },
})
