//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Template: FC<IProps> = () => {
  return <div>Template</div>
}

// memo:只有当 props.children变化时，Template组件才会重新渲染
// 如果父组件渲染但传给 Template的 props相同，则跳过渲染
export default memo(Template)
