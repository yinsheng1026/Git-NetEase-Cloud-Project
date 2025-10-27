import { configureStore } from '@reduxjs/toolkit'
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'

const store = configureStore({
  reducer: {}
})

type DispatchType = typeof store.dispatch

export const useAppDispatch: () => DispatchType = useDispatch

//导出对应对的state的类型，为后续组件中使用state做准备
type GetStateFnType = typeof store.getState
type IRootState = ReturnType<GetStateFnType>
//一步到位，导出自己的UseAppSelect方法
export const UseAppSelect: TypedUseSelectorHook<IRootState> = useSelector
export default store
