//模板

import NavBar from '@/components/nav-bar'
import React, { memo, Suspense } from 'react'
import type { FC, ReactNode } from 'react'
import { Outlet, Link } from 'react-router-dom'

interface IProps {
  children?: ReactNode
}

const Discover: FC<IProps> = () => {
  return (
    <div>
      <NavBar />
      <Suspense fallback="loading......">
        <Outlet />
      </Suspense>
    </div>
  )
}

export default memo(Discover)
