import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getBanner } from '../service/recommend'

export const fetchBannerDataAction = createAsyncThunk(
  'banners',
  async (arg, { dispatch }) => {
    const res = await getBanner()
    console.log(res.data.banners)
    dispatch(changeBannersAction(res.data.banners))
  }
)

//定义状态接口
interface IRecommendState {
  banners: any[]
}
//定义初始状态
const initialState: IRecommendState = {
  banners: []
}
//创建 recommendSlice
const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
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

export const { changeBannersAction } = recommendSlice.actions
export default recommendSlice.reducer
