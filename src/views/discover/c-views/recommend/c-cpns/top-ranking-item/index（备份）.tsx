//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { RankingItemWrapper } from './style'
import { getImageSize } from '@/utils/format'
// import { it } from 'node:test'
import { useAppDispatch } from '@/store'
import { fetchCurrentSongAction } from '@/views/player/store/player'

interface IProps {
  children?: ReactNode
  itemData: any
}

const TopRankingItem: FC<IProps> = (props) => {
  const { itemData } = props
  const { tracks = [] } = itemData
  //获取到当前点击的item的id
  const dispatch = useAppDispatch()
  function handlePlayClick(id: number) {
    dispatch(fetchCurrentSongAction(id))
  }
  return (
    <RankingItemWrapper>
      <div className="header">
        <div className="image">
          <img src={getImageSize(itemData.coverImgUrl, 80)} alt="" />
          <a href="" className="sprire_cover"></a>
        </div>
        <div className="info">
          <div className="name">{itemData.name}</div>
          <div>
            <button className="sprite_02 btn play"></button>
            <button className="sprite_02 btn favor"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {/* 因为ts无法推导出tracks的类型，所以有时候需要自己下定义 */}
        {tracks.slice(0, 10).map((item: any, index: number) => {
          return (
            <div className="list-item" key={item.id}>
              <div className="index">{index + 1}</div>
              {/* 将歌曲名字和按钮们放在一个类，方便后续对名字过长部分进行隐藏 */}
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="operator">
                  {/* 三个操作按钮 */}
                  {/* 点击play按钮便可以播放当前音乐 */}
                  <button
                    className="btn sprite_02 play"
                    onClick={() => handlePlayClick(item.id)}
                  ></button>
                  <button className="btn sprite_icon2 add"></button>
                  <button className="btn sprite_02 favor"></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="footer">
        <a href="#/discover/ranking">查看全部 &gt;</a>
      </div>
    </RankingItemWrapper>
  )
}

export default memo(TopRankingItem)
