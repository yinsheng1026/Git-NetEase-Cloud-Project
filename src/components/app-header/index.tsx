//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { HeaderLeft, HeaderRight, HeaderWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const AppHeader: FC<IProps> = () => {
  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          <Link to="/discover">发现音乐</Link>
          <Link to="/mine">我的音乐</Link>
          <Link to="/focus">我的关注</Link>
          <Link to="/download">下载客户端</Link>
        </HeaderLeft>
        <HeaderRight></HeaderRight>
      </div>
    </HeaderWrapper>
  )
}

export default memo(AppHeader)
