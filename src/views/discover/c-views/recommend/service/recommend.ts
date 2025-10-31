import ysRequest from '@/service'

export function getBanner() {
  return ysRequest.get({
    url: '/banner'
  })
}
