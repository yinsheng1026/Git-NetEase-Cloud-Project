//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { NavWrapper } from './style'
import { discoverMenu } from '@/assets/data/local_data'

interface IProps {
  children?: ReactNode
}

const NavBar: FC<IProps> = () => {
  return (
    <NavWrapper>
      {discoverMenu.map((item) => {
        return (
          <div className="item" key={item.link}>
            <NavLink to={item.link}>{item.link}</NavLink>
          </div>
        )
      })}
    </NavWrapper>
  )
}

export default memo(NavBar)
