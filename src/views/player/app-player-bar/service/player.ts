import ysRequest from '@/service'

export function getSongDetail(ids: number) {
  return ysRequest.get({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

export function getSongLyric(id: number) {
  return ysRequest.get({
    url: '/lyric',
    params: {
      id
    }
  })
}
