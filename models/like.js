import { HTTP } from '../utils/http'

class LikeModel extends HTTP {
  // 进行点赞 | 取消点赞
  like(behavior, artId, category) {
    let url = behavior === 'like' ? 'like' : 'like/cancel'
    this.request({
      url,
      method: 'POST',
      data: {
        art_id: artId,
        type: category,
      },
    })
  }

  // 获取点赞信息
  getClassicLikeStatus(artId, category, sCallback) {
    this.request({
      url: `classic/${category}/${artId}/favor`,
      success: sCallback,
    })
  }
}

export { LikeModel }
