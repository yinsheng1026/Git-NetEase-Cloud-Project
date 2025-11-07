import { createSlice, current } from '@reduxjs/toolkit'

interface IPlayerState {
  currentSong: any
}

const initialState: IPlayerState = {
  currentSong: {
    name: 'Electronic ibuprofen',
    mainTitle: null,
    additionalTitle: null,
    id: 2734939313,
    pst: 0,
    t: 0,
    ar: [
      {
        id: 53508466,
        name: 'MerrinZephyr',
        tns: [],
        alias: []
      }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: '',
    fee: 8,
    v: 39,
    crbt: null,
    cf: '',
    al: {
      id: 281072532,
      name: 'Electronic ibuprofen',
      picUrl:
        'https://p2.music.126.net/cNmbKnh4tmnL6K_h3WKjSQ==/109951171831606684.jpg',
      tns: [],
      pic_str: '109951171831606684',
      pic: 109951171831606690
    },
    dt: 135000,
    h: {
      br: 320003,
      fid: 0,
      size: 5402166,
      vd: -85500,
      sr: 44100
    },
    m: {
      br: 192003,
      fid: 0,
      size: 3241317,
      vd: -82932,
      sr: 44100
    },
    l: {
      br: 128003,
      fid: 0,
      size: 2160893,
      vd: -81303,
      sr: 44100
    },
    sq: {
      br: 943598,
      fid: 0,
      size: 15925731,
      vd: -85491,
      sr: 44100
    },
    hr: null,
    a: null,
    cd: '01',
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 17180008448,
    originCoverType: 0,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 5,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    displayTags: [],
    markTags: [],
    single: 0,
    noCopyrightRcmd: null,
    mv: 0,
    rtype: 0,
    rurl: null,
    mst: 9,
    cp: 0,
    publishTime: 0
  }
}

const playSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {}
})

export default playSlice.reducer
