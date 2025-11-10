import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { getSongDetail, getSongLyric } from '../app-player-bar/service/player'
import { ILyricInfo, parseLyric } from '@/utils/parse-lyric'

export const fetchCurrentSongAction = createAsyncThunk(
  'currentSong',
  (id: number, { dispatch }) => {
    //获取歌曲信息
    getSongDetail(id).then((res) => {
      const song = res.data.songs[0]
      dispatch(changeCurrentSongAction(song))
    })

    getSongLyric(id).then((res) => {
      const lyricString = res.data.lrc.lyric
      // 此时获取到的为用换行符分割的长字符串
      //对其进行格式化后获取到的是元素为对象的数组
      const lyrics = parseLyric(lyricString)
      dispatch(changeLyricsAction(lyrics))
    })
  }
)

interface IPlayerState {
  currentSong: any
  lyrics: ILyricInfo[]
  lyricIndex: number
}

const initialState: IPlayerState = {
  currentSong: {},
  lyrics: [],
  lyricIndex: -1
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
    }
  }
})

export default playSlice.reducer
export const {
  changeCurrentSongAction,
  changeLyricsAction,
  changeLyricIndexAction
} = playSlice.actions
