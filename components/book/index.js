Component({
  /**
   * 组件的属性列表
   */
  properties: {
    book: Object,
    showLike: {
      type: Boolean,
      value: true,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      const bid = this.properties.book.id
      this.triggerEvent('onBookTo', { bid })

      // 直接在组件中写业务，降低了组件的通用性
      // wx.navigateTo({
      //   url: `/pages/book-detail/book-detail?bid=${bid}`,
      // })
    },
  },
})
