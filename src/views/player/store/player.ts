import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSongDetail, getSongLyric } from '../app-player-bar/service/player'
import { ILyricInfo, parseLyric } from '@/utils/parse-lyric'
import type { IRootState } from '@/store'

//此处state类型IRootState为先前在封装网络请求时候定义的
export const fetchCurrentSongAction = createAsyncThunk<
  void,
  number,
  { state: IRootState }
>('currentSong', (id: number, { dispatch, getState }) => {
  //获取歌曲信息
  //1、查看当前播放歌曲在播放列表中是否存在
  //获取playSongList
  const playSongList = getState().player.playSongList
  const findIndex = playSongList.findIndex((item) => item.id === id)
  if (findIndex === -1) {
    //没有找到相同的
    getSongDetail(id).then((res) => {
      const song = res.data.songs[0]
      //将song放到currentSong中
      const newPlaySongList = [...playSongList]
      newPlaySongList.push(song)
      dispatch(changeCurrentSongAction(song))
      dispatch(changePlaySongListAction(newPlaySongList))
      dispatch(changePlaySongIndexAction(newPlaySongList.length - 1))
    })
  } else {
    //找到相同的item
    const song = playSongList[findIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndexAction(findIndex))
  }

  // getSongDetail(id).then((res) => {
  //   const song = res.data.songs[0]
  //   dispatch(changeCurrentSongAction(song))
  // })

  getSongLyric(id).then((res) => {
    const lyricString = res.data.lrc.lyric
    // 此时获取到的为用换行符分割的长字符串
    //对其进行格式化后获取到的是元素为对象的数组
    const lyrics = parseLyric(lyricString)
    dispatch(changeLyricsAction(lyrics))
  })
})

export const changeMusicAction = createAsyncThunk<
  void,
  boolean,
  { state: IRootState }
>('changeMusic', (isNext, { dispatch, getState }) => {
  //1、判断是上一首还是下一首
  const player = getState().player
  const playMode = player.playMode
  const songIndex = player.playSongIndex
  const songList = player.playSongList
  //2、根据不同模式计算下一首的索引
  let newIndex = songIndex
  if (playMode === 1) {
    //随机播放
    newIndex = Math.floor(Math.random() * songList.length)
  } else {
    //单曲循环或顺序播放（但是就算是单曲循环，主动点击下一首都会切换）
    newIndex = isNext ? songIndex + 1 : songIndex - 1
    if (newIndex > songList.length - 1) newIndex = 0
    if (newIndex < 0) newIndex = songList.length - 1
  }
  const song = songList[newIndex]
  dispatch(changeCurrentSongAction(song))
  dispatch(changePlaySongIndexAction(newIndex))
  //切换音乐时候，歌词自动更新
  getSongLyric(song.id).then((res) => {
    const lyricString = res.data.lrc.lyric
    // 此时获取到的为用换行符分割的长字符串
    //对其进行格式化后获取到的是元素为对象的数组
    const lyrics = parseLyric(lyricString)
    dispatch(changeLyricsAction(lyrics))
  })
})

interface IPlayerState {
  currentSong: any
  lyrics: ILyricInfo[]
  lyricIndex: number
  //存储准备播放歌曲的数组
  playSongList: any[]
  //当前播放歌曲的索引
  playSongIndex: number
  //记录播放模式
  playMode: number
}

const initialState: IPlayerState = {
  currentSong: {},
  lyrics: [],
  lyricIndex: -1,
  //存储准备播放歌曲的数组
  playSongList: [
    {
      name: 'Matches',
      mainTitle: null,
      additionalTitle: null,
      id: 419646507,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 101860,
          name: 'Stephen Walking',
          tns: [],
          alias: []
        },
        {
          id: 205684,
          name: 'Ephixa',
          tns: [],
          alias: []
        },
        {
          id: 14055238,
          name: 'Aaron Richards',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 25,
      st: 0,
      rt: null,
      fee: 8,
      v: 46,
      crbt: null,
      cf: '',
      al: {
        id: 34751302,
        name: 'Matches',
        picUrl:
          'https://p2.music.126.net/B_w3NFX5XGUlYCeUETYLFA==/109951163311379666.jpg',
        tns: [],
        pic_str: '109951163311379666',
        pic: 109951163311379660
      },
      dt: 233454,
      h: {
        br: 320000,
        fid: 0,
        size: 9340387,
        vd: -56629,
        sr: 44100
      },
      m: {
        br: 192000,
        fid: 0,
        size: 5604249,
        vd: -54068,
        sr: 44100
      },
      l: {
        br: 128000,
        fid: 0,
        size: 3736181,
        vd: -52414,
        sr: 44100
      },
      sq: {
        br: 866640,
        fid: 0,
        size: 25290167,
        vd: -56623,
        sr: 44100
      },
      hr: null,
      a: null,
      cd: '1',
      no: 1,
      rtUrl: null,
      ftype: 0,
      rtUrls: [],
      djId: 0,
      copyright: 0,
      s_id: 0,
      mark: 17180139520,
      originCoverType: 0,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 12,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      displayTags: null,
      markTags: [],
      single: 0,
      noCopyrightRcmd: null,
      mv: 0,
      rtype: 0,
      rurl: null,
      mst: 9,
      cp: 729016,
      publishTime: 1467590400000
    },
    {
      name: '偏执Beat',
      mainTitle: null,
      additionalTitle: null,
      id: 2690545481,
      pst: 0,
      t: 0,
      ar: [
        {
          id: 14587823,
          name: 'Eee.T',
          tns: [],
          alias: []
        }
      ],
      alia: [],
      pop: 100,
      st: 0,
      rt: '',
      fee: 8,
      v: 44,
      crbt: null,
      cf: '',
      al: {
        id: 267727346,
        name: '偏执Beat',
        picUrl:
          'https://p2.music.126.net/dLAd74vjH7p9TcXER5VlsQ==/109951170680104925.jpg',
        tns: [],
        pic_str: '109951170680104925',
        pic: 109951170680104930
      },
      dt: 168048,
      h: {
        br: 320002,
        fid: 0,
        size: 6723885,
        vd: -41435,
        sr: 48000
      },
      m: {
        br: 192002,
        fid: 0,
        size: 4034349,
        vd: -38873,
        sr: 48000
      },
      l: {
        br: 128002,
        fid: 0,
        size: 2689581,
        vd: -37080,
        sr: 48000
      },
      sq: null,
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
      mark: 17179877376,
      originCoverType: 0,
      originSongSimpleData: null,
      tagPicList: null,
      resourceState: true,
      version: 10,
      songJumpInfo: null,
      entertainmentTags: null,
      awardTags: null,
      displayTags: null,
      markTags: [],
      single: 0,
      noCopyrightRcmd: null,
      mv: 0,
      mst: 9,
      cp: 0,
      rtype: 0,
      rurl: null,
      publishTime: 0
    }
  ],
  //当前播放歌曲的索引
  playSongIndex: -1,
  playMode: 0 //0：顺序 1：顺序 2：单曲
}

const playSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload
    },
    changeLyricsAction(state, { payload }) {
      state.lyrics = payload
    },
    //保存歌词索引
    changeLyricIndexAction(state, { payload }) {
      state.lyricIndex = payload
    },
    changePlaySongIndexAction(state, { payload }) {
      state.playSongIndex = payload
    },
    changePlaySongListAction(state, { payload }) {
      state.playSongList = payload
    },
    changePlayModeAction(state, { payload }) {
      state.playMode = payload
    }
  }
})

export default playSlice.reducer
export const {
  changeCurrentSongAction,
  changeLyricsAction,
  changeLyricIndexAction,
  changePlaySongIndexAction,
  changePlaySongListAction,
  changePlayModeAction
} = playSlice.actions
