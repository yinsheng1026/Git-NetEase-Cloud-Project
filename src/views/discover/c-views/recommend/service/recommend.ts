import ysRequest from '@/service'

export function getBanner() {
  return ysRequest.get({
    url: '/banner'
  })
}

export function getHotRecommend(limit = 30) {
  return ysRequest.get({
    url: '/personalized',
    params: {
      limit
    }
  })
}
