import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getArtistList,
  getBanner,
  getHotRecommend,
  getNewAlbum,
  getPlaylistDetail
} from '../service/recommend'
// import { data } from 'react-router-dom'

export const fetchRecommendDateAction = createAsyncThunk(
  'fetchdata',
  (_, { dispatch }) => {
    getBanner().then((res) => {
      dispatch(changeBannersAction(res.data.banners))
    })
    getHotRecommend(8).then((res) => {
      dispatch(changeHotRecommendAction(res.data.result))
    })
    getNewAlbum().then((res) => {
      dispatch(changeNewAibumAction(res.data.albums))
    })
    getArtistList(5).then((res) => {
      dispatch(changSettleSingerAction(res.data.artists))
    })
  }
)

//做一个数组方便存放
const rankingIds = [19723756, 3779629, 2884035]
export const fetchRankingDataAction = createAsyncThunk(
  'rankingData',
  (_, { dispatch }) => {
    //   方法一：对三组数据单独处理
    // for (const id of rankingIds) {
    //   getPlaylistDetail(id).then((res) => {
    //     switch (id) {
    //       case rankingIds[0]:
    //       dispatch...
    //         break
    //       case rankingIds[1]:
    //       dispatch...
    //         break
    //       case rankingIds[2]:
    //       dispatch...
    //         break
    //     }
    //   })
    // }
    //方法二:将三组数据放到一个数组里面管理
    //发出去的顺序是固定的，但是接收的顺序不一定是一样的，因为网络的原因
    const promises: Promise<any>[] = []
    // 步骤1：按顺序创建Promise并放入数组
    for (const id of rankingIds) {
      promises.push(getPlaylistDetail(id)) // 按 [0, 1, 2] 的顺序添加
    }
    // 步骤2：Promise.all 等待所有Promise完成
    Promise.all(promises).then((res) => {
      // res数组顺序与promises数组顺序严格对应
      const playlist = res
        .filter((item) => item.playlist)
        .map((item) => item.data.playlist)
      dispatch(changeRankingsAction(playlist))
    })
  }
)

//定义状态接口
interface IRecommendState {
  banners: any[]
  //添加类型定义
  hotRecommends: any[]
  newAlbums: any[]
  // 三个数据分开单独管理
  // upRanking: any
  // newRanking: any
  // originRanking: any
  rankings: any[]
  settleSingers: any[]
}
//定义初始状态
const initialState: IRecommendState = {
  banners: [],
  //添加对象
  hotRecommends: [],
  newAlbums: [],
  // 三个数据分开单独管理
  // upRanking: {},
  // newRanking: {},
  // originRanking: {},
  rankings: [],
  settleSingers: []
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
    },
    changeRankingsAction(state, { payload }) {
      state.rankings = payload
    },
    changSettleSingerAction(state, { payload }) {
      state.settleSingers = payload
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
  changeNewAibumAction,
  changeRankingsAction,
  changSettleSingerAction
} = recommendSlice.actions
export default recommendSlice.reducer
