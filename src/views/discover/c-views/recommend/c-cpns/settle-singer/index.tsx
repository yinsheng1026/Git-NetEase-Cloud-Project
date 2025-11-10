//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { SingerWarpper } from './style'
import AreaHeaderV2 from '@/components/area-header-v2'
import { UseAppSelect } from '@/store'
import { getImageSize_right } from '@/utils/format'
import { shallowEqual } from 'react-redux'

interface IProps {
  children?: ReactNode
}

const SettleSinger: FC<IProps> = () => {
  const { settleSinger } = UseAppSelect(
    (state) => ({
      settleSinger: state.recommend.settleSingers
    }),
    shallowEqual
  )
  return (
    <SingerWarpper>
      <AreaHeaderV2
        title="入驻歌手"
        moreTest="查看全部 >"
        moreLink="#/discover/artist"
      />
      <div className="artists">
        {settleSinger.map((item) => {
          return (
            <a href="#/discover/artist" key={item.name} className="item">
              <img src={getImageSize_right(item.picUrl, 62)} alt="" />
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="alia">{item.alias.join('')}</div>
              </div>
            </a>
          )
        })}
      </div>
      <div className="apply-for">
        <a href="#/">申请网易云音乐人</a>
      </div>
    </SingerWarpper>
  )
}
export default memo(SettleSinger)
