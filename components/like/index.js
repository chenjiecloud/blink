Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
      value: false,
    },
    count: {
      type: Number,
      value: 0,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc: 'images/like.png',
    noSrc: 'images/like@dis.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike() {
      const like = this.properties.like
      let count = this.properties.count
      count = like ? count - 1 : count + 1
      this.setData({
        count,
        like: !like,
      })
      // 发起自定义事件，激活一个事件 triggerEvent
      const behavior = this.properties.like ? 'like' : 'cancel'
      const myEventDetail = { behavior }
      this.triggerEvent('onLikeFun', myEventDetail)
    },
  },
})

// 组件应该只关注组件内部的逻辑，相关业务代码应写在组件的使用方
