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

export function getNewAlbum(limit = 10) {
  return ysRequest.get({
    url: '/album/newest',
    params: {
      limit
    }
  })
}

export function getPlaylistDetail(id: number) {
  return ysRequest.get({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

export function getArtistList(limit = 5) {
  return ysRequest.get({
    url: '/artist/list',
    params: {
      limit
    }
  })
}
