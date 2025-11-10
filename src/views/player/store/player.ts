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
      //格式为：要进行解析
      // [00:09.09]粤语词：张健晖
      // [00:12.21]原唱：蔡依林
      const lyrics = parseLyric(lyricString)
      dispatch(changeLyricsAction(lyrics))
    })
  }
)

interface IPlayerState {
  currentSong: any
  lyrics: ILyricInfo[]
}

const initialState: IPlayerState = {
  currentSong: {},
  lyrics: []
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
    }
  }
})

export default playSlice.reducer
export const { changeCurrentSongAction, changeLyricsAction } = playSlice.actions
