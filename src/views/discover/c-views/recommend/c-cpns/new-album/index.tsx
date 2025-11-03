//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { AlbumWrapper } from './style'
import { Carousel } from 'antd'
import AreaHeaderV1 from '@/components/area-header-v1'

interface IProps {
  children?: ReactNode
}

const NewAlbum: FC<IProps> = () => {
  return (
    <AlbumWrapper>
      <AreaHeaderV1 title="新碟上架" moreLink="/discover/album" />
      <div className="content">
        <button className="arrow sprite_02 arrow-left "></button>
        <div className="banner">
          <Carousel autoplay>
            {[1, 2].map((item) => {
              return (
                <h1
                  key={item}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                  }}
                >
                  {item}
                </h1>
              )
            })}
          </Carousel>
        </div>
        <button className="arrow sprite_02 arrow-right "></button>
      </div>
    </AlbumWrapper>
  )
}

export default memo(NewAlbum)
