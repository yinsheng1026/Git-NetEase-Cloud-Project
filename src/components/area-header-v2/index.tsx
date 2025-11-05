//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HeaderV2Wrapper } from './style'

interface IProps {
  children?: ReactNode
  title: string
  moreTest?: string
  moreLink?: string
}

const AreaHeaderV2: FC<IProps> = (props) => {
  const { title = ' 默认标题', moreTest, moreLink } = props
  return (
    <HeaderV2Wrapper>
      <h3 className="title">{title}</h3>
      {moreLink && moreTest && <a href={moreLink}>{moreTest}</a>}
    </HeaderV2Wrapper>
  )
}

export default memo(AreaHeaderV2)
