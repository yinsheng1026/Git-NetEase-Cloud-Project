import { configureStore } from '@reduxjs/toolkit'
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'

import recommendReducer from '@/views/discover/c-views/recommend/store/recommend'
import playerReducer from '@/views/player/store/player'
const store = configureStore({
  reducer: {
    recommend: recommendReducer,
    player: playerReducer
  }
})

type DispatchType = typeof store.dispatch

export const useAppDispatch: () => DispatchType = useDispatch

//导出对应对的state的类型，为后续组件中使用state做准备
type GetStateFnType = typeof store.getState
export type IRootState = ReturnType<GetStateFnType>
//一步到位，导出自己的UseAppSelect方法
export const UseAppSelect: TypedUseSelectorHook<IRootState> = useSelector
export default store
