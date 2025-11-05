import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getBanner, getHotRecommend, getNewAlbum } from '../service/recommend'
// import { data } from 'react-router-dom'

export const fetchBannerDataAction = createAsyncThunk(
  'banners',
  async (arg, { dispatch }) => {
    const res = await getBanner()
    dispatch(changeBannersAction(res.data.banners))
  }
)

export const fetchHotRecommendAction = createAsyncThunk(
  'hotRecommend',
  async (arg, { dispatch }) => {
    const res = await getHotRecommend(8)
    console.log(res.data.result)
    dispatch(changeHotRecommendAction(res.data.result))
  }
)

export const fetchNewAlbumAction = createAsyncThunk(
  'newAlbum',
  async (arg, { dispatch }) => {
    const res = await getNewAlbum(8)
    dispatch(changeNewAibumAction(res.data.albums))
  }
)

//定义状态接口
interface IRecommendState {
  banners: any[]
  //添加类型定义
  hotRecommends: any[]
  newAlbums: any[]
}
//定义初始状态
const initialState: IRecommendState = {
  banners: [],
  //添加对象
  hotRecommends: [],
  newAlbums: []
}
//创建 recommendSlice
const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    },
    //添加方法
    changeHotRecommendAction(state, { payload }) {
      state.hotRecommends = payload
    },
    changeNewAibumAction(state, { payload }) {
      state.newAlbums = payload
    }
  }
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchBannerDataAction.pending, () => {
  //       console.log('pending')
  //     })
  //     .addCase(fetchBannerDataAction.fulfilled, (state, { payload }) => {
  //       state.banners = payload
  //     })
  //     .addCase(fetchBannerDataAction.rejected, () => {
  //       console.log('rejected')
  //     })
  // }
})

export const {
  changeBannersAction,
  changeHotRecommendAction,
  changeNewAibumAction
} = recommendSlice.actions
export default recommendSlice.reducer
