//模板
import ysRequest from '@/service'
import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

export interface IBanner {
  imageUrl: string
  targetId: number
  targetType: number
  titleColor: string
  typeTitle: string
  url: string
  exclusive: boolean
  scm: string
  bannerBizType: string
}

const Recommend: FC<IProps> = () => {
  const [banners, setBanners] = useState<IBanner[]>([])
  useEffect(() => {
    ysRequest
      .get({
        url: '/banner'
      })
      .then((res) => setBanners(res.data.banners))
  }, [])
  return (
    <div>
      {banners.map((item, index) => {
        return <div key={index}>{item.imageUrl}</div>
      })}
    </div>
  )
}

// const Recommend: FC<IProps> = () => {
//   const [banners, setBanners] = useState<IBanner[]>([])
//   useEffect(() => {
//     ysRequest
//       .get({
//         url: '/banner'
//       })
//       .then((res) => console.log(res))
//   }, [])
//   return <div>Recommend</div>
// }

export default memo(Recommend)
