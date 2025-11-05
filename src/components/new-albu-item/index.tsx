//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { AlbunItemWeapper } from './style'
import { getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
  // 定义数据类型先为any
  itemData: any
}
// 添加参数props获取通过网络请求获取到的数据
const NewAlbumItem: FC<IProps> = (props) => {
  // 解构获取数据
  const { itemData } = props
  return (
    <AlbunItemWeapper>
      <div className="top">
        <img src={getImageSize(itemData.picUrl, 100)} />
        <a href="" className="cover sprite_cover"></a>
      </div>
      <div className="bottom">
        <div className="name">{itemData.name}</div>
        <div className="artist">{itemData.artist.name}</div>
      </div>
    </AlbunItemWeapper>
  )
}

export default memo(NewAlbumItem)
