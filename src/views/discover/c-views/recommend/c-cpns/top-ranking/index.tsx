//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { RankingWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { UseAppSelect } from '@/store'
import TopRankingItem from '../top-ranking-item'
import { shallowEqual } from 'react-redux'

interface IProps {
  children?: ReactNode
}

const TopRanking: FC<IProps> = () => {
  const { rankings } = UseAppSelect(
    (state) => ({
      rankings: state.recommend.rankings
    }),
    shallowEqual
  )
  return (
    <RankingWrapper>
      {/* 调用先前定义的头部 */}
      <AreaHeaderV1 title="榜单" moreLink="/discover/Ranking" />
      <div className="content">
        {rankings.map((item) => {
          return <TopRankingItem key={item.id} itemData={item}></TopRankingItem>
        })}
      </div>
    </RankingWrapper>
  )
}

export default memo(TopRanking)
