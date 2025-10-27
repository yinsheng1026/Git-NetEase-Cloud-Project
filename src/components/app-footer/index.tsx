//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Appfooter: FC<IProps> = () => {
  return <div>Appfooter</div>
}

export default memo(Appfooter)
