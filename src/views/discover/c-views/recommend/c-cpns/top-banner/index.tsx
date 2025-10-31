//模板
import { Carousel } from 'antd'
import { UseAppSelect } from '@/store'
import React, { memo, useEffect, useRef, useState } from 'react'
import type { CarouselRef } from 'antd/es/carousel'
import type { FC } from 'react'
import { shallowEqual } from 'react-redux'
import { BannerControl, BannerLeft, BannerRight, BannerWrapper } from './style'
import classNames from 'classnames'

interface IProps {
  targetId?: number
  bigImageUrl?: string
  imageUrl?: string
  targetType?: number
  typeTitle?: string
  s_ctrp?: string
  url?: string
}

const TopBanner: FC<IProps> = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [bgImageUrl, setBgImageUrl] = useState('')
  const bannerRef = useRef<CarouselRef>(null)

  const { banners } = UseAppSelect(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqual
  )
  // 事件处理函数
  function handleDot(index: number) {
    bannerRef.current?.goTo(index, false)
  }
  function handleAfterChange(current: number) {
    setCurrentIndex(current)
    if (banners[current]?.imageUrl) {
      const newBgUrl = banners[current].imageUrl + '?imageView&blur=40x20'
      setBgImageUrl(newBgUrl)
    }
  }
  function handlePrevClick() {
    bannerRef.current?.prev()
  }
  function handleNextClick() {
    bannerRef.current?.next()
  }

  //获取背景图片
  useEffect(() => {
    if (banners.length > 0 && !bgImageUrl) {
      const initialBgUrl = banners[0].imageUrl + '?imageView&blur=40x20'
      setBgImageUrl(initialBgUrl)
    }
  }, [banners])
  return (
    <BannerWrapper
      style={{
        background: `url(${bgImageUrl}) center center/6000px`,
        transition: 'background-image 1s ease-in-out'
      }}
    >
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel
            autoplay={true}
            autoplaySpeed={5000}
            ref={bannerRef}
            effect="fade"
            afterChange={handleAfterChange}
            dots={false}
          >
            {banners.map((item, index) => {
              return (
                <div className="banner-item" key={index}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              )
            })}
          </Carousel>
          <ul className="dots">
            {banners.map((item, index) => {
              return (
                <li key={index}>
                  <span
                    className={classNames('item', {
                      active: index === currentIndex
                    })}
                    onClick={() => handleDot(index)}
                  ></span>
                </li>
              )
            })}
          </ul>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className="btn left" onClick={handlePrevClick}></button>
          <button className="btn right" onClick={handleNextClick}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
}

export default memo(TopBanner)
