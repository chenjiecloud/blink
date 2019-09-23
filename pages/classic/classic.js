import { ClassicModel } from '../../models/classic'
import { LikeModel } from '../../models/like'

let classicModel = new ClassicModel()
let likeModel = new LikeModel()

Component({
  properties: {
    cid: Number,
    type: Number,
  },
  data: {
    classic: null,
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false,
  },
  lifetimes: {
    attached() {
      const cid = this.properties.cid
      const type = this.properties.type
      if (!cid) {
        classicModel.getLatest(res => {
          this.setData({
            classic: res,
            likeCount: res.fav_nums,
            likeStatus: res.like_status,
          })
        })
      } else {
        classicModel.getById(cid, type, res => {
          this._getLikeStatus(res.id, res.type)
          this.setData({
            classic: res,
            latest: classicModel.isLatest(res.index),
            first: classicModel.isFirst(res.index),
          })
        })
      }
    },
  },

  methods: {
    onLike: function(event) {
      const behavior = event.detail.behavior
      likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
    },
    // 获取当前一期的下一期
    onNext() {
      this._updateClassic('next')
    },
    // 获取当前一期的上一期
    onPrevious() {
      this._updateClassic('previous')
    },

    _updateClassic(nextOrPrevious) {
      const index = this.data.classic.index
      classicModel.getClassic(index, nextOrPrevious, res => {
        this._getLikeStatus(res.id, res.type)
        this.setData({
          classic: res,
          latest: classicModel.isLatest(res.index),
          first: classicModel.isFirst(res.index),
        })
      })
    },

    // 获取点赞信息
    _getLikeStatus(artId, category) {
      likeModel.getClassicLikeStatus(artId, category, res => {
        this.setData({
          likeCount: res.fav_nums,
          likeStatus: res.like_status,
        })
      })
    },
  },
})
