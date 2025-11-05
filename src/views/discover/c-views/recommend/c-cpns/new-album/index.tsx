//模板

import React, { memo, useRef } from 'react'
import type { ComponentRef, FC, ReactNode } from 'react'
import { AlbumWrapper } from './style'
import { Carousel } from 'antd'
import AreaHeaderV1 from '@/components/area-header-v1'
import { UseAppSelect } from '@/store'
import NewAlbuItem from '@/components/new-albu-item'
import { shallowEqual } from 'react-redux'

interface IProps {
  children?: ReactNode
}

const NewAlbum: FC<IProps> = () => {
  //定义内部数据
  //创建bannerRef用来绑定Carousel组件的Dom，用于控制按钮的点击事件
  const bannerRef = useRef<ComponentRef<typeof Carousel>>(null)

  //使用之前自定义的UseSelect获取数据
  const { newAlbums } = UseAppSelect(
    (state) => ({
      newAlbums: state.recommend.newAlbums
    }),
    shallowEqual
  )
  function handlePreClick() {
    //锁定ref后，点击后操作上一页
    bannerRef.current?.prev()
  }
  function handleNextClick() {
    //锁定ref后，点击后操作下一页
    bannerRef.current?.next()
  }
  return (
    <AlbumWrapper>
      <AreaHeaderV1 title="新碟上架" moreLink="/discover/album" />
      <div className="content">
        <button
          className="sprite_02 arrow arrow-left"
          onClick={handlePreClick}
        ></button>
        <div className="banner">
          {/* 对Carousel进行ref绑定 */}
          <Carousel ref={bannerRef} dots={false} speed={2000}>
            {/* 分为两页轮播图，每一页有五个元素 */}
            {[0, 1].map((item) => {
              return (
                <div key={item}>
                  <div className="album-list">
                    {newAlbums.slice(item * 5, (item + 1) * 5).map((album) => {
                      // 此处的NewAlbumItem是因为很多地方会用到所以在components中进行封装
                      return <NewAlbuItem key={album.id} itemData={album} />
                    })}
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
        <button
          className="sprite_02 arrow arrow-right "
          onClick={handleNextClick}
        ></button>
      </div>
    </AlbumWrapper>
  )
}

export default memo(NewAlbum)
