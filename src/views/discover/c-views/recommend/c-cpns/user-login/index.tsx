//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { LoginWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const UserLogin: FC<IProps> = () => {
  return (
    <LoginWrapper className="sprite_02">
      <p>登录网易云音乐，可以享受无线收藏的乐趣，标签无线同步到手机</p>
      <a href="#login" className="sprite_02">
        用户登录
      </a>
    </LoginWrapper>
  )
}

export default memo(UserLogin)
