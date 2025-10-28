//模板
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import { NavLink } from 'react-router-dom'
import { HeaderLeft, HeaderRight, HeaderWrapper } from './style'
import headerTitles from '@/assets/data/header_title.json'
interface IProps {
  children?: ReactNode
}

const AppHeader: FC<IProps> = () => {
  function showItem(item: any) {
    if (item.type === 'path') {
      return (
        <NavLink
          to={item.link}
          className={({ isActive }) => {
            return isActive ? 'active' : undefined
          }}
        >
          {item.title}
          <i className="icon sprite_01"></i>
        </NavLink>
      )
    } else {
      return (
        <a href={item.link} target="_blank" rel="noopener noreferrer">
          {item.title}
        </a>
      )
    }
  }
  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          <a className="logo sprite_01" href="/">
            网易云音乐
          </a>
          <div className="title-list">
            {headerTitles.map((item: any) => {
              return (
                <div className="item active" key={item.title}>
                  {showItem(item)}
                </div>
              )
            })}
          </div>
          {/* <Link to="/discover">发现音乐</Link>
          <Link to="/mine">我的音乐</Link>
          <Link to="/focus">我的关注</Link>
          <Link to="/download">下载客户端</Link> */}
        </HeaderLeft>
        <HeaderRight>
          <span className="input">
            <Input placeholder="default size" prefix={<SearchOutlined />} />
          </span>
          <span className="center">创作者中心</span>
          <span className="login">登录</span>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  )
}

export default memo(AppHeader)
