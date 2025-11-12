# 对网页进行设计

## 在components中创建app-header和app-footer文件夹和index.tsx

在他们之中写网页逻辑

# 使用styled-components来对页面写样式

现在终端安装：

```bash
npm install styled-component -D
```

在对应组件的文件夹中创建style.ts（如在app-header下创建）

在整个项目下面创建声明文件style.d.ts

```ts
// src/styled.d.ts
import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      primary: string
      secondary: string
    }
    size: Record<string, unknown> // ✅ 修复：使用 Record
    mixin: Record<string, never>
  }
}
```

## 因为是ts文件所以需要针对该依赖安装类型声明

```
npm install @types/styled-components -D
```

```tsx
export const HeaderWrapper = styled.div``
```

这行代码做了三件重要的事情：

### 1. ​**创建样式化组件**​

- `styled.div`表示你要创建一个 `<div>`元素的样式化版本
- 它返回一个**React 组件**，这个组件会自动应用你定义的 CSS 样式

### 2. ​**定义组件名称**​

- `HeaderWrapper`是你给这个样式化组件起的名字
- 这个名字应该**描述性**地表达这个组件的用途

### 3. ​**导出组件**​

- `export`关键字表示这个组件可以被其他文件导入使用

将heaferWrapper导出到index.tsx里面就可以使用了，在style.ts中继续编写组件

（注意！export const HeaderWrapper = styled.div``由两个点括起来）

# 在哪里编辑总体主题？

在assets中创建theme文件夹和index，在其中编辑theme主题

```ts
// theme.js
const theme = {
  color: {
    primary: '#C20C0C',
    secondary: ''
  },
  size: {},
  mixin: {
    wrapv1: `
      width: 1100px;
      margin: 0 auto;
    `
  }
}

export default theme
```

混入：mixin

格式为；

```tsx
mixin: {
    // 页面内容区域居中
    wrapv1: `
      width: 1100px;
      margin: 0 auto;
    `,

    // 文字超出显示省略号
    textEllipsis: `
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `,

    // 水平居中
    flexCenter: `
      display: flex;
      justify-content: center;
      align-items: center;
    `
```

使用改固定样式来编写高复用率的样式款式 `

```
mixin: {
    wrapv1: `
      width: 1100px;
      margin: 0 auto;
    `,
    flexCenter: `
      display: flex;
      justify-content: center;
      align-items: center;
    `
  }
```

在src下创建文件夹`src/styled.d.ts`文件

```tsx
// src/styled.d.ts
import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      primary: string
      secondary: string
    }
    size: Record<string, unknown> // 或者更具体的类型
    mixin: {
      wrapv1: string
    }
  }
}
```

然后去到整个文件的目录的index.ts，导入ThemeProvider，编辑好对应的属性

用ThemeProvider包裹好：

```tsx
<ThemeProvider theme={theme}>
  <HashRouter>
    <App />
  </HashRouter>
</ThemeProvider>
```

使用ThemeProvider包裹好后，theme中设置的混入就可以让全部人使用了

## 但是！我们不用定义混用而是使用直接定义类，然后给对应组件添加类名

# 后续导入先行项目材料（精灵图、css）

对顶部header继续设计

![](file://D:\markdowm\markdowmphoto\2025-10-28-09-39-39-image.png?msec=1762919291837)

## 对header部分数据进行填写，在data创建header-titles.json

将数据统一到json数据中管理

```json
[
  {
    "title": "发现音乐",
    "type": "path",
    "link": "/discover"
  },
  {
    "title": "我的音乐",
    "type": "path",
    "link": "/mine"
  },
  {
    "title": "关注",
    "type": "path",
    "link": "/focus"
  },
  {
    "title": "商城",
    "type": "link",
    "link": "https://music.163.com/store/product"
  },
  {
    "title": "音乐人",
    "type": "link",
    "link": "https://music.163.com/st/musician"
  },
  {
    "title": "下载客户端",
    "type": "path",
    "link": "/download"
  }
]
```

然后在index中调用：

```ts
import headerTitles from '@/assets/data/header_title.json'
```

```ts
<div className="title-list">
            {headerTitles.map((item) => {
              return (
                <div className="item" key={item.title}>
                  {showItem(item)}
                </div>
              )
            })}
          </div>
```

编辑showItem中的if等逻辑

```ts
function showItem(item: any) {
  if (item.type === 'path') {
    return <Link to={item.path}>{item.title}</Link>
  } else {
    return (
      <a href={item.link} target="_blank" rel="noopener noreferrer">
        {item.title}
      </a>
    )
  }
}
```

# 编辑选中状态

## NavLink 基础概念

### 1. 什么是 NavLink

NavLink 是 React Router 提供的一个特殊组件，用于在 React 应用中创建导航链接。它是 `<Link>`组件的增强版，专门为导航场景设计，能够根据当前 URL 自动添加样式类来表示活动状态。

### 2. 基本用法

```ts
import { NavLink } from 'react-router-dom';

<NavLink to="/home">首页</NavLink>
```

## 二、核心特性详解

### 1. 活动状态样式

NavLink 的核心功能是能够自动为当前匹配的链接添加活动状态类：

```ts
<NavLink
  to="/about"
  className={({ isActive }) => isActive ? 'active-link' : 'normal-link'}
>
  关于我们
</NavLink>
```

```ts
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
          {/* 下标 */}
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
```

注意：active类是需要自己去定义的

## 搜索输入框的设计（使用antd）

```
npm install antd
```

前往antd官网获取需要使用的组件

```
https://ant.design/components/button-cn/
```

根据指引npm下载

```
npm install @ant-design/icons@5.2.6 --save --legacy-peer-deps
```

获取需要使用的图标

```
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
```

然后看着官网的逻辑使用

## 然后再style.ts进行编写css逻辑

```ts
export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  color: #787878;
  font-size: 12px;

  > .search {
    width: 158px;
    height: 32px;
    border-radius: 16px;

    input {
      &::placeholder {
        font-size: 12px;
      }
    }
  }

  .center {
    width: 90px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #666;
    border-radius: 16px;
    color: #fff;
    margin: 0 16px;
    cursor: pointer;
  }
  :hover {
    color: #fff;
    border-color: #fff;
  }

  .login {
    cursor: pointer;
  }
  :hover {
    color: #fff;
    border-color: #fff;
  }
`
```

其中：

在 CSS/Less/Sass 中，`>`是 ​**子元素选择器**​（Child Combinator），表示：

```less
父元素 > 子元素 {
  /* 样式只作用于直接子元素 */
}
```

接下来编辑discover页面，加入view/discover/index.tsx

创建c-capns文件夹，然后创建nav-bar文件夹，在其下创建index.tsx和style.ts

style.ts:

```ts
import styled from 'styled-components'

export const NavWrapper = styled.div`
  height: 30px;
  background-color: #c20c0c;

  .nav {
    display: flex;
    padding-left: 180px;
    position: relative;
    top: -4px;

    .item {
      a {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        padding: 0 13px;
        margin: 7px 17px 0;
        color: #fff;
        font-size: 12px;

        &:hover,
        &.active {
          text-decoration: none;
          background-color: #9b0909;
          border-radius: 20px;
        }
      }
    }
  }
`
```

index.tsx

```tsx
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
      <div className="nav wrap-v1">
        {discoverMenu.map((item) => {
          return (
            <div className="item" key={item.link}>
              <NavLink to={item.link}>{item.title}</NavLink>
            </div>
          )
        })}
      </div>
    </NavWrapper>
  )
}

export default memo(NavBar)
```

将NavBar导出到discover的index中就可以实现了

# 轮播图制作（recommend页面）

## <mark> 按照业务划分文件夹</mark>：方便各个业务人员只对应自己的开发部分

当前架构：![](file://D:\markdowm\markdowmphoto\2025-10-29-11-03-34-image.png?msec=1762919291837)

后续架构：![](file://D:\markdowm\markdowmphoto\2025-10-29-11-13-29-image.png?msec=1762919291837)

编辑store/recommend.ts逻辑：

```tsx
import { createSlice } from '@reduxjs/toolkit'

//定义状态接口
interface IRecommendState {
  banners: any[]
}
//定义初始状态
const initialState: IRecommendState = {
  banners: []
}
//创建 recommendSlice
const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {}
})

export default recommendSlice.reducer
```

去到总的store中对这个recommendReducer进行注册

```ts
import recommendReducer from '@/views/discover/c-views/recommend/store/recommend'

const store = configureStore({
  reducer: {
    recommend: recommendReducer
  }
})
```

回到store/recommend中，编写getBannner的`createAsyncThunk`封装

```tsx
export const fetchBannerDataAction = createAsyncThunk('banners', async () => {
  const res = await getBanners()
  console.log(res)
  return res.data
})
```

## **`createAsyncThunk`是什么？​**​

### ​**简单理解：​**​

`createAsyncThunk`是 Redux Toolkit 提供的一个**异步action创建器**，专门用来处理"先请求数据，后更新状态"的这种常见场景。

### ​**类比生活例子：​**​

- ​**直接调用API**​ = 你亲自去餐厅点餐、等待、取餐
- ​使用`createAsyncThunk`​ = 你叫外卖小哥帮你完成整个流程，你只关心结果

### **第一个参数：`'banners'`（动作类型前缀）​**​

```
createAsyncThunk('banners', async () => { ... })
```

​**这个字符串的作用：​**​

1. ​**生成三个标准的action类型：​**​

- `banners/pending`- 请求开始（加载中）
- `banners/fulfilled`- 请求成功
- `banners/rejected`- 请求失败

2. ​**在Redux DevTools中清晰可见：​**​

```
Action Type: banners/pending
Action Type: banners/fulfilled
Action Type: banners/rejected
```

3. ​**为什么需要这个前缀？​**​

- 为了在大型应用中区分不同的异步操作
- 比如你还有用户信息请求：`'userInfo'`、商品列表请求：`'products'`等

### ​**第二个参数：异步回调函数**​

```
async () => {
  const res = await getBanners()  // 1. 调用API
  console.log(res)               // 2. 调试打印
  return res.data                // 3. 返回需要的数据
}
```

​**这个函数的工作流程：​**​

1. ​**执行API调用**​：`await getBanners()`

2. ​**处理响应数据**​：可以选择性处理或转换数据

3. ​**返回结果**​：返回的值会成为成功action的`payload`

配套的extraReducers（写在配置slice的reducers之后）：

```ts
extraReducers: (builder) => {
  builder
    .addCase(fetchBannerDataAction.pending, () => {
      console.log('pending')
    })
    .addCase(fetchBannerDataAction.fulfilled, (state, { payload }) => {
      state.banners = payload
    })
    .addCase(fetchBannerDataAction.rejected, () => {
      console.log('rejected')
    })
}
```

但是我们使用reducers的方法：

```ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getBanner } from '../service/recommend'

export const fetchBannerDataAction = createAsyncThunk(
  'banners',
  async (arg, { dispatch }) => {
    const res = await getBanner()
    dispatch(changeBannersAction(res.banners))
  }
)

//定义状态接口
interface IRecommendState {
  banners: any[]
}
//定义初始状态
const initialState: IRecommendState = {
  banners: []
}
//创建 recommendSlice
const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    }
  }
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchBannerDataAction.pending, () => {
  //       console.log('pending')
  //     })
  //     .addCase(fetchBannerDataAction.fulfilled, (state, { payload }) => {
  //       state.banners = payload
  //     })
  //     .addCase(fetchBannerDataAction.rejected, () => {
  //       console.log('rejected')
  //     })
  // }
})

export const { changeBannersAction } = recommendSlice.actions
export default recommendSlice.reducer
```

去到recommend创建c-cpns/top-banner文件夹。再创建index和style开始设计

获取state中的数据

```ts
//模板

import { UseAppSelect } from '@/store'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { shallowEqual } from 'react-redux'

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
  const { banners } = UseAppSelect(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqual
  )

  return (
    <div>
      {banners.map((item) => {
        return <div key={item.imageUrl}>{item.imageUrl}</div>
      })}
    </div>
  )
}

export default memo(TopBanner)
```

# 总结：数据获取流程

recommend中的index中的banners 来自useAppSelect中的state

```tsx
const TopBanner: FC<IProps> = () => {
  const { banners } = UseAppSelect(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqual
  )
```

useAppSelect 来自 store文件夹中 index自己定义的useSelect

```ts
export const UseAppSelect: TypedUseSelectorHook<IRootState> = useSelector
```

useAppSelect中的state来自根目录index下宣告全局的store

```tsx
import store from './store'

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConfigProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </ConfigProvider>
    </ThemeProvider>
  </Provider>
)
```

根目录的store来自store目录的index中用configureStore整理好的

```ts
const store = configureStore({
  reducer: {
    recommend: recommendReducer
  }
})

export default store
```

而一开始banners就是获取state中属于recommend那一部分，那么这一部分的recommendReducer来自对应recommend组件中的store（为了方便开发而模块化开发）

```tsx
import recommendReducer from '@/views/discover/c-views/recommend/store/recommend'
```

来到recommend中的store中的recommend.ts（网络请求获取对应banners数据封装进createSlice的部分）

```ts
const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    }
  }
})
```

其中changeBannersAction是赋值用到的函数

然后在同文件中fetchBannerDataAction中会被调用，fetchBannerDataAction可以实现网络请求

```ts
export const fetchBannerDataAction = createAsyncThunk(
  'banners',
  async (arg, { dispatch }) => {
    const res = await getBanner()
    console.log(res.data.banners)
    dispatch(changeBannersAction(res.data.banners))
  }
)
```

然后fetchBannerDataAction会在recommend文件下的index被调用：

```ts
const Recommend: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchBannerDataAction())
  }, [])
  return (
    <div>
      <TopBanner />
      Recommend
    </div>
  )
}
```

## 就ok了~~！

```
TopBanner组件需要banners数据
    ↓
useAppSelector((state) => state.recommend.banners)
    ↓
全局store (configureStore配置)
    ↓
recommendReducer (来自recommend/store/recommend.ts)
    ↓
recommendSlice中的initialState.banners
    ↓
fetchBannerDataAction异步获取数据
    ↓
调用getBanner() API
    ↓
dispatch(changeBannersAction(res.data.banners))
    ↓
更新state.recommend.banners
    ↓
useAppSelector检测变化，重新渲染TopBanner
```

# 获取好数据后制作轮播图

![](file://D:\markdowm\markdowmphoto\2025-10-29-21-54-58-image.png?msec=1762919291860)

# 轮播图：

去到antd官网获取样式复制

可以在下面看见对应组件的API

设置好组件：

```tsx
<BannerWrapper>
  <div className="banner wrap-v2">
    <BannerLeft>
      <Carousel autoplay={true} autoplaySpeed={1000} ref={bannerRef}>
        {banners.map((item, index) => {
          return (
            <div className="banner-item" key={index}>
              <img className="image" src={item.imageUrl} alt={item.typeTitle} />
            </div>
          )
        })}
      </Carousel>
    </BannerLeft>
    <BannerRight></BannerRight>
    <BannerControl>
      <button className="btn left" onClick={handlePrevClick}></button>
      <button className="btn right" onClick={handleNextClick}></button>
    </BannerControl>
  </div>
</BannerWrapper>
```

对按钮进行逻辑的编写

先导入对应的ref类型，定义useRel，然后找到官网的API写上就可以了

```tsx
import type { CarouselRef } from 'antd/es/carousel'
const bannerRef = useRef<CarouselRef>(null)
function handlePrevClick() {
  bannerRef.current?.prev()
}
function handleNextClick() {
  bannerRef.current?.next()
}
```

## 编写属于自己的指示器

根据antd官网API将自带指示器设置为空

```ts
dots={false}
```

在Carousel组件下面添加组件<ul>

```ts
<ul className="dots">
            {banners.map((item, index) => {
              return (
                <li key={item.index}>
                  <span className="item"></span>
                </li>
              )
            })}
          </ul>
```

添加classnames库，方便做类名判断

# classnames 库详解：让 CSS 类名管理变得简单

## 什么是 classnames？

`classnames`是一个小巧但极其有用的 JavaScript 库，专门用于**条件性地组合 CSS 类名**。

## 基础用法对比

### 不使用 classnames（传统方式）

```ts
// ❌ 繁琐的条件判断
let className = 'btn'
if (isPrimary) className += ' btn-primary'
if (isLarge) className += ' btn-large'
if (isDisabled) className += ' btn-disabled'
if (isLoading) className += ' loading'

return <button className={className}>点击我</button>
```

### 使用 classnames

```ts
import classnames from 'classnames'

// ✅ 简洁明了
const className = classnames('btn', {
  'btn-primary': isPrimary,
  'btn-large': isLarge,
  'btn-disabled': isDisabled,
  'loading': isLoading
})

return <button className={className}>点击我</button>
```

类名后面对应的是判断条件

# 编写轮播图下面的部分

```tsx
<RecommendWrapper>
  <div className="content wrap-v2">
    <div className="left">left</div>
    <div className="right">right</div>
  </div>
</RecommendWrapper>
```

| **JSX**​   | `<div className="RecommendWrapper">` | `<RecommendWrapper>` |
| ---------- | ------------------------------------ | -------------------- |
| ​**实质**​ | 普通的 HTML div 元素                 | React 样式组件       |
| ​**样式**​ | 需要额外的 CSS 文件                  | 样式内置在组件中     |

## style部分：

```ts
export const RecommendWrapper = styled.div`
  > .content {
    border: 1px solid #d3d3d3;
    background-image: url(${require('@/assets/img/wrap-bg.png')});
    display: flex;

    > .left {
      padding: 20px;
      width: 729px;
    }

    > .right {
      margin-left: 1px;
      width: 250px;
    }
  }
`
```

## 编写热门推荐部分

![](file://D:\markdowm\markdowmphoto\2025-11-02-23-12-41-image.png?msec=1762919291860)

## 因为HotRecommend部分的头部可以复用，所以对齐进行封装（在根目录的 components中）

![](file://D:\markdowm\markdowmphoto\2025-11-02-23-13-14-image.png?msec=1762919291837)

```tsx
//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HeaderV1Wrapper } from './style'
import { Link } from 'react-router-dom'

interface IProps {
  children?: ReactNode
  title?: string
  keywords?: string[]
  moreText?: string
  moreLink?: string
}

const AreaHeadeV1: FC<IProps> = (props) => {
  const {
    title = '默认标题',
    keywords = [],
    moreText = '更多',
    moreLink = '/'
  } = props
  return (
    <HeaderV1Wrapper className="sprite_02">
      <div className="left">
        <h2 className="title">{title}</h2>
        <div className="keywords">
          {keywords.map((item) => {
            return (
              <div className="item" key={item}>
                <span className="link">{item}</span>
                <span className="divider">|</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="right">
        <Link className="more" to={moreLink}>
          {moreText}
        </Link>
        <i className="icon sprite_02"></i>
      </div>
    </HeaderV1Wrapper>
  )
}

export default memo(AreaHeadeV1)
```

## 其中为了日后的可根据情景使用数据，对props进行解构：

```tsx
interface IProps {
  children?: ReactNode
  title?: string
  keywords?: string
  moreText?: string
  moreLink?: string
}

const AreaHeadeV1: FC<IProps> = (props) => {
  const {
    title = '默认标题',
    keywords = [],
    moreText = '更多',
    moreLink = '/'
  } = props
```

## . 这是**解构赋值 + 默认值**，不是重新赋值

```tsx
const {
  title = '默认标题',
  keyworks = [],
  moreText = '更多',
  morLink = '/'
} = props
```

这行代码的**实际作用**是：

```tsx
// 等价于：
const title = props.title !== undefined ? props.title : '默认标题'
const keyworks = props.keyworks !== undefined ? props.keyworks : []
const moreText = props.moreText !== undefined ? props.moreText : '更多'
const morLink = props.morLink !== undefined ? props.morLink : '/'
```

再在其他组件调用是时候；

```tsx
<AreaHeaderV1
  title="热门推荐"
  keywords={['华语', '流行', '摇滚', '民谣', '电子']}
  moreText="查看更多"
  moreLink="/discover/songs"
/>
```

## 获取热门推荐的数据（网络请求）

现在子组件下的servic中定义好自定义ysRequest方法的get路径：

```ts
export function getHotRecommend(limit = 30) {
  return ysRequest.get({
    url: '/personalized',
    params: {
      limit
    }
  })
}
```

### 1 . ​**函数参数**​ `limit = 30`

- `limit`是请求参数，表示要获取的数据条数
- `= 30`是默认参数，如果不传 limit，默认获取 30 条数据
- 调用示例：

  ```
  getHotRecommend()        // 获取30条数据（使用默认值）
  getHotRecommend(10)      // 获取10条数据
  getHotRecommend(50)      // 获取50条数据
  ```

### 2. ​**params 参数对象**​

- `params`是 GET 请求的查询参数（query parameters）
- 实际请求的 URL 会是：`/personalized?limit=30`
- 参数会自动编码并拼接到 URL 后面

### 3. ​**完整请求流程**​

```
// 调用函数
const result = await getHotRecommend(20)

// 实际发送的请求：
// GET http://localhost:4000/personalized?limit=20

// 后端接收到的参数：
// req.query.limit = 20
```

在子组件下的store中定义好createAsyncThunk方法

```ts
export const fetchHotRecommendAction = createAsyncThunk(
  'hotRecommend',
  async (arg, { dispatch }) => {
    const res = await getHotRecommend(8)
    console.log(res)
  }
)
```

在组件的index下调用

```
dispatch(fetchHotRecommendAction())
```

## 去到上一级的index中使用useAppDispatch调用fetchHotRecommendAction()即可

```ts
const dispatch = useAppDispatch()
useEffect(() => {
  dispatch(fetchBannerDataAction())
  //调用刚刚定义的fetchHotRecommendAction()
  dispatch(fetchHotRecommendAction())
}, [])
```

去到需要使用数据的组件中，再用UseAppSelect调用对应对象的数据即可

```ts
const HotRecommend: FC<IProps> = () => {
  const { hotRecommends } = UseAppSelect(
    (state) => ({
      hotRecommends: state.recommend.hotRecommends
    }),
    shallowEqual
  )
```

便获取到变量名为hotRecommend的来源于：'http://localhost:4000/personalized'的.data.result资源

# 接下来实现：

![](file://D:\markdowm\markdowmphoto\2025-11-03-14-52-13-image.png?msec=1762919291837)

因为多个页面都可能会使用到，所以在components中创建好方便后续调用

在components中创建好文件夹，index、style后：

```ts
//模板

//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { MenuItemWrapper } from './style'
import { formatCount, getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
  itemData: any
}

const SongMenuItem: FC<IProps> = (props) => {
  const { itemData } = props
  return (
    <MenuItemWrapper>
      <div className="top">
        <img src={getImageSize(itemData.picUrl, 140)} alt="" />
        <div className="cover sprite_cover">
          <div className="info sprite_cover">
            <span>
              <i className="sprite_icon headset"></i>
              <span className="count">{formatCount(itemData.playCount)}</span>
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="bottom">{itemData.name}</div>
    </MenuItemWrapper>
  )
}

export default memo(SongMenuItem)
```

因为要接收前面hotrecommend中传入的参数，所以加入props和定义好类型（  itemData: any）：

上一级可以传入item

```ts
      <div className="hot-recommend">
        {hotRecommends.map((item) => {
          return <SongMenuItem key={item.id} itemData={item} />
        })}
      </div>
```

## 对css部分进行编写就可以实现组件样式

如何使用精灵图：使用类名进行精灵图调入后，然后再为其定义一个类名。然后再在自己定义的类名中定义该组件的background-position属性获取到精灵图的对应位置

对数字或时间格式化的函数封装在utils中：

```ts
export function formatCount(count: number) {
  if (count > 100000) {
    return `${Math.floor(count / 10000)}万`
  } else return count
}

export function getImageSize(
  imgeUrl: string,
  wide: number,
  height: number = wide
) {
  return imgeUrl + `?param=${height}×${wide}`
}
```

## 接下来是新碟上架：

![](file://D:\markdowm\markdowmphoto\2025-11-03-16-14-37-image.png?msec=1762919291857)

在热门推荐同一位置创建文件夹编写new-album/index

![](file://D:\markdowm\markdowmphoto\2025-11-04-16-35-17-image.png?msec=1762919291838)

首先编写

```tsx
//模板

import React, { memo, useRef } from 'react'
import type { ComponentRef, FC, ReactNode } from 'react'
import { AlbumWrapper } from './style'
import { Carousel } from 'antd'
import AreaHeaderV1 from '@/components/area-header-v1'
import { UseAppSelect } from '@/store'
import NewAlbuItem from '@/components/new-albu-item'

interface IProps {
  children?: ReactNode
}

const NewAlbum: FC<IProps> = () => {
  //定义内部数据
  //创建bannerRef用来绑定Carousel组件的Dom，用于控制按钮的点击事件
  const bannerRef = useRef<ComponentRef<typeof Carousel>>(null)

  //使用之前自定义的UseSelect获取数据
  const { newAlbums } = UseAppSelect((state) => ({
    newAlbums: state.recommend.newAlbums
  }))
  function handlePreClick() {
    //锁定ref后，点击后操作上一页
    bannerRef.current?.prev()
  }
  function handleNextClick() {
    //锁定ref后，点击后操作下一页
    bannerRef.current?.next()
  }
  return (
    <AlbumWrapper>
      <AreaHeaderV1 title="新碟上架" moreLink="/discover/album" />
      <div className="content">
        <button
          className="sprite_02 arrow arrow-left"
          onClick={handlePreClick}
        ></button>
        <div className="banner">
          {/* 对Carousel进行ref绑定 */}
          <Carousel ref={bannerRef} dots={false} speed={2000}>
            {/* 分为两页轮播图，每一页有五个元素 */}
            {[0, 1].map((item) => {
              return (
                <div key={item}>
                  <div className="album-list">
                    {newAlbums.slice(item * 5, (item + 1) * 5).map((album) => {
                      // 此处的NewAlbumItem是因为很多地方会用到所以在components中进行封装
                      return <NewAlbuItem key={album.id} itemData={album} />
                    })}
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
        <button
          className="sprite_02 arrow arrow-right "
          onClick={handleNextClick}
        ></button>
      </div>
    </AlbumWrapper>
  )
}

export default memo(NewAlbum)
```

![](file://D:\markdowm\markdowmphoto\2025-11-04-16-35-57-image.png?msec=1762919291838)

来到components中创建new-albu-item文件夹后创建index和style

```tsx
//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { AlbunItemWeapper } from './style'
import { getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
  // 定义数据类型先为any
  itemData: any
}
// 添加参数props获取通过网络请求获取到的数据
const NewAlbumItem: FC<IProps> = (props) => {
  // 解构获取数据
  const { itemData } = props
  return (
    <AlbunItemWeapper>
      <div className="top">
        <img src={getImageSize(itemData.picUrl, 100)} />
        <a href="" className="cover sprite_cover"></a>
      </div>
      <div className="bottom">
        <div className="name">{itemData.name}</div>
        <div className="artist">{itemData.artist.name}</div>
      </div>
    </AlbunItemWeapper>
  )
}

export default memo(NewAlbumItem)
```

这里的getImageSize是前面在utils封装好的函数

## 对于网络请求部分：

在recommend的service模块定义好对应的get方法

```tsx
export function getNewAlbum(limit = 10) {
  return ysRequest.get({
    url: '/album/newest',
    params: {
      limit
    }
  })
}
```

在recommend的store模块就定义新的createAsyncThunk方法

```tsx
export const fetchNewAlbumAction = createAsyncThunk(
  'newAlbum',
  async (arg, { dispatch }) => {
    const res = await getNewAlbum(8)
    dispatch(changeNewAibumAction(res.data.albums))
  }
)
```

定义好在creatslice中创建对应的reducers

```ts
 const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    },
    //添加方法
    changeHotRecommendAction(state, { payload }) {
      state.hotRecommends = payload
    },
    changeNewAibumAction(state, { payload }) {
      state.newAlbums = payload
    }
  }
```

然后去到index中调用对应的createAsyncThunk方法就行了，在fetchNewAlbumAction()中获取到了数据后会通过`dispatch(changeNewAibumAction(res.data.albums))`将数据给到Slice并且后续又输出全局

# 将异步请求封装成一个函数：

因为代码重复率太高且减少性能消耗

从：

```ts
export const fetchBannerDataAction = createAsyncThunk(
  'banners',
  async (arg, { dispatch }) => {
    const res = await getBanner()
    dispatch(changeBannersAction(res.data.banners))
  }
)

export const fetchHotRecommendAction = createAsyncThunk(
  'hotRecommend',
  async (arg, { dispatch }) => {
    const res = await getHotRecommend(8)
    console.log(res.data.result)
    dispatch(changeHotRecommendAction(res.data.result))
  }
)

export const fetchNewAlbumAction = createAsyncThunk(
  'newAlbum',
  async (arg, { dispatch }) => {
    const res = await getNewAlbum(8)
    dispatch(changeNewAibumAction(res.data.albums))
  }
)
```

变成

```tsx
export const fetchRecommendDateAction = createAsyncThunk(
  'fetchdata',
  (_, { dispatch }) => {
    getBanner().then((res) => {
      dispatch(changeBannersAction(res.data.banners))
    })
    getHotRecommend(8).then((res) => {
      dispatch(changeHotRecommendAction(res.data.result))
    })
    getNewAlbum().then((res) => dispatch(changeNewAibumAction(res.data.albums)))
  }
)
```

## 榜单制作：

![](file://D:\markdowm\markdowmphoto\2025-11-04-17-18-55-image.png?msec=1762919291857)

在获取数据部分，因为飙升榜、新歌榜、原创榜是三组数据，为了集合他们的数据方便管理，所以使用同一个

`export const fetchRankingDataAction = createAsyncThunk`，而且将他们的数据用一个数组来装，但是每次dispatch的时候顺序一致，但是接收回来网络请求时间不一样一样，所以要通过promise来实现顺序也一致

```ts
import {
  getBanner,
  getHotRecommend,
  getNewAlbum,
  getPlaylistDetail
} from '../service/recommend' //做一个数组方便存放
const rankingIds = [19723756, 3779629, 2884035]
export const fetchRankingDataAction = createAsyncThunk(
  'rankingData',
  (_, { dispatch }) => {
    //   方法一：对三组数据单独处理
    // for (const id of rankingIds) {
    //   getPlaylistDetail(id).then((res) => {
    //     switch (id) {
    //       case rankingIds[0]:
    //         break
    //       case rankingIds[1]:
    //         break
    //       case rankingIds[2]:
    //         break
    //     }
    //   })
    // }
    //方法二:将三组数据放到一个数组里面管理
    //发出去的顺序是固定的，但是接收的顺序不一定是一样的，因为网络的原因
    const promises: Promise<any>[] = []
    for (const id of rankingIds) {
      promises.push(getPlaylistDetail(id))
    }
    Promise.all(promises).then((res) => {
      console.log(res)
    })
  }
)
```

### ​**关键机制图解**​

```
你的 promises 数组结构：
[
  PromiseA (id: 19723756),  // 索引 0
  PromiseB (id: 3779629),   // 索引 1
  PromiseC (id: 2884035)    // 索引 2
]

网络请求完成时间可能不同：
PromiseB 最先完成 → 但结果不会立即返回
PromiseA 第二个完成
PromiseC 最后完成

Promise.all 的处理逻辑：
1. 内部维护一个结果数组：results = [undefined, undefined, undefined]
2. 当 PromiseB 完成时：记录 results[1] = PromiseB的结果
3. 当 PromiseA 完成时：记录 results[0] = PromiseA的结果
4. 当 PromiseC 完成时：记录 results[2] = PromiseC的结果
5. 所有Promise完成后：返回 results = [A结果, B结果, C结果]
```

## 1. `const promises: Promise<any>[] = []`的含义

```ts
const promises: Promise<any>[] = []
```

这行代码的意思是：

- ​**`Promise<any>`**: 表示一个 Promise 对象，它最终解析的值是 `any`类型
- ​**`[]`**: 表示这是一个数组
- ​**合起来**: 创建一个数组，这个数组里的每个元素都必须是 `Promise<any>`类型

所以：

```ts
// 正确：数组里放的是 Promise 对象
const promises: Promise<any>[] = [
  getPlaylistDetail(1), // 返回 Promise
  getPlaylistDetail(2), // 返回 Promise
  getPlaylistDetail(3) // 返回 Promise
]

// 错误：不能放非 Promise 对象
const wrongPromises: Promise<any>[] = [
  '字符串', // 错误！不是 Promise
  123 // 错误！不是 Promise
]
```

## 2. `Promise.all`的含义

`Promise.all`是 Promise 构造函数的一个**静态方法**​（类方法）。

### 作用：

接收一个 Promise 数组，返回一个新的 Promise。这个新 Promise 的状态由数组中所有 Promise 的状态决定。

```ts
// 基本语法
Promise.all(iterable): Promise<Array<any>>
```

### 工作方式：

- ​**全部成功**​：当所有 Promise 都成功时，返回的 Promise 才成功，结果是一个数组，包含所有 Promise 的结果
- ​**有一个失败**​：如果任何一个 Promise 失败，整个 Promise.all 立即失败

```ts
const promise1 = Promise.resolve('结果1')
const promise2 = Promise.resolve('结果2')
const promise3 = Promise.resolve('结果3')

Promise.all([promise1, promise2, promise3]).then((results) => {
  console.log(results) // ['结果1', '结果2', '结果3']
})
```

## 3. Promise 构造函数 vs 实例对象

这是最核心的理解点！Promise 确实是一个构造函数，但它的使用方式有几种：

### Promise 作为构造函数：

```ts
// 创建一个新的 Promise 实例
const myPromise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    resolve('成功的结果')
  }, 1000)
})
```

### Promise 的静态方法：

```ts
// 这些是 Promise 构造函数的类方法，直接通过 Promise.xxx 调用
Promise.all() // 等待所有Promise完成
Promise.race() // 等待第一个Promise完成
Promise.resolve() // 创建立即成功的Promise
Promise.reject() // 创建立即失败的Promise
```

## 4. `getPlaylistDetail()`返回的是什么？

这是最关键的联系点！你的 `getPlaylistDetail`函数大概长这样：

```ts
export function getPlaylistDetail(id: number) {
  return ysRequest.get({
    url: '/playlist/detail',
    params: { id }
  })
}
```

​`ysRequest.get()`方法返回的是一个 Promise 对象\*\*​！

所以：

```ts
// getPlaylistDetail(123) 返回的是一个 Promise 实例对象
const promiseObject = getPlaylistDetail(123)

// 这个 promiseObject 就是 Promise 构造函数创建的实例
// 所以可以调用 .then()、.catch() 方法
promiseObject.then((result) => {
  console.log(result) // 请求成功的结果
})
```

## 🔄 完整流程串联

让我用你的代码来串联整个理解：

```ts
const rankingIds = [19723756, 3779629, 2884035]
const promises: Promise<any>[] = [] // 创建空数组，用来存放Promise实例

for (const id of rankingIds) {
  // getPlaylistDetail(id) 返回一个Promise实例对象
  const promiseInstance = getPlaylistDetail(id)

  // 把这个Promise实例对象加入到数组中
  promises.push(promiseInstance)
}

// 现在 promises 数组包含3个Promise实例对象
// Promise.all 接收这个数组，返回一个新的Promise
Promise.all(promises).then((results) => {
  // results 是按照 promises 数组顺序排列的结果数组
  console.log(results[0]) // 对应 rankingIds[0] 的结果
  console.log(results[1]) // 对应 rankingIds[1] 的结果
  console.log(results[2]) // 对应 rankingIds[2] 的结果
})
```

## 将每一个数组的同款样式封装成一个组件；

![](file://D:\markdowm\markdowmphoto\2025-11-05-13-35-38-image.png?msec=1762919291838)

## 由于该模块其他地方复用率低所以直接在同级文件下创建文件夹

![](file://D:\markdowm\markdowmphoto\2025-11-05-13-53-29-image.png?msec=1762919291838)

编写过程中的思考：

在父的代码：

```tsx
<div className="content">
  {rankings.map((item) => {
    return (
      <TopRankingItem key={item.id} itemData={item}>
        TopRaningItem
      </TopRankingItem>
    )
  })}
</div>
```

然后对`<TopRankingItem/>`：

```tsx
//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { RankingItemWrapper } from './style'

interface IProps {
  children?: ReactNode
  itemData: any
}

const TopRankingItem: FC<IProps> = (props) => {
  const { itemData } = props
  return <RankingItemWrapper>TopRankingItem</RankingItemWrapper>
}

export default memo(TopRankingItem)
```

然后对`<RankingItemWrapper>`样式：

```ts
import styled from 'styled-components'

export const RankingItemWrapper = styled.div`
  width: 230px;
  &:last-child {
    width: 228px;
  }
`
```

思考为什么`&:last-child`可以生效呢？不是每次map之后返回的都是一个新的`<RankingItemWrapper>`吗？它怎么知道自己是不是最后一个子元素。

其实在父的content中，每一个`TopRankingItem`都对应一个`<RankingItemWrapper>`所以说

- 三个 `RankingItemWrapper`都是 `.content`的**直接子元素**​
- 它们都在**同一个父容器**中
- CSS 的 `:last-child`选择器是基于**DOM结构**的，不是基于组件的

# 用HTML和CSS分离的方式来看会更清晰。重写一下：

## HTML结构（JSX编译后）：

```html
<div class="content">
  <!-- 第一个TopRankingItem组件渲染的结果 -->
  <div class="ranking-item">第一个榜单内容</div>

  <!-- 第二个TopRankingItem组件渲染的结果 -->
  <div class="ranking-item">第二个榜单内容</div>

  <!-- 第三个TopRankingItem组件渲染的结果 -->
  <div class="ranking-item">第三个榜单内容</div>
</div>
```

## CSS样式：

```css
/* 对应 styled-components 中的 RankingItemWrapper */
.ranking-item {
  width: 230px;
}

/* 这个选择器会选择父元素(.content)的最后一个.ranking-item子元素 */
.ranking-item:last-child {
  width: 228px;
}
```

编写

![](file://D:\markdowm\markdowmphoto\2025-11-05-15-13-20-image.png?msec=1762919291838)

创建top-ranking

```tsx
//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { RankingWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { UseAppSelect } from '@/store'
import TopRankingItem from '../top-ranking-item'
import { shallowEqual } from 'react-redux'

interface IProps {
  children?: ReactNode
}

const TopRanking: FC<IProps> = () => {
  const { rankings } = UseAppSelect(
    (state) => ({
      rankings: state.recommend.rankings
    }),
    shallowEqual
  )
  return (
    <RankingWrapper>
      {/* 调用先前定义的头部 */}
      <AreaHeaderV1 title="榜单" moreLink="/discover/Ranking" />
      <div className="content">
        {rankings.map((item) => {
          return (
            <TopRankingItem key={item.id} itemData={item}>
              TopRaningItem
            </TopRankingItem>
          )
        })}
      </div>
    </RankingWrapper>
  )
}

export default memo(TopRanking)
```

创建创建top-ranking-item

搭建子项目，首先分三个部分：index、name、operator

```tsx
//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { RankingItemWrapper } from './style'
import { getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
  itemData: any
}

const TopRankingItem: FC<IProps> = (props) => {
  const { itemData } = props
  const { tracks = [] } = itemData
  return (
    <RankingItemWrapper>
      <div className="header">
        <div className="image">
          <img src={getImageSize(itemData.coverImgUrl, 80)} alt="" />
          <a href="" className="sprire_cover"></a>
        </div>
        <div className="info">
          <div className="name">{itemData.name}</div>
          <div>
            <button className="sprite_02 btn play"></button>
            <button className="sprite_02 btn favor"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {/* 因为ts无法推导出tracks的类型，所以有时候需要自己下定义 */}
        {tracks.slice(0, 10).map((item: any, index: number) => {
          return (
            <div className="list-item" key={item.id}>
              <div className="index">{index + 1}</div>
              {/* 将歌曲名字和按钮们放在一个类，方便后续对名字过长部分进行隐藏 */}
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="operator">
                  {/* 三个操作按钮 */}
                  <button className="btn sprite_02 play"></button>
                  <button className="btn sprite_icon2 add"></button>
                  <button className="btn sprite_02 favor"></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="footer">
        <a href="#/discover/ranking">查看全部 ></a>
      </div>
    </RankingItemWrapper>
  )
}

export default memo(TopRankingItem)
```

# 样式中有趣的点：音乐榜单中**前3名**序号用红色突出显示，营造视觉层次感

## 💻 核心代码

```
.list {
  .list-item {
    position: relative;
    display: flex;
    align-items: center;
    height: 32px;

    // 关键选择器：前3名变红
    &:nth-child(-n + 3) .index {
      color: #c10d0c;
    }

    .index {
      width: 35px;
      text-align: center;
      margin-left: 10px;
      font-size: 16px;
    }
  }
}
```

## 🔍 选择器解析

### `&:nth-child(-n + 3) .index`含义：

- ​**`&`**​ = 当前选择器（`.list-item`）
- ​**`:nth-child(-n + 3)`**​ = 选择前3个子元素
- ​**`.index`**​ = 内部的序号元素

### 数学计算：

```
n=0 → -0+3=3 ✓
n=1 → -1+3=2 ✓
n=2 → -2+3=1 ✓
n=3 → -3+3=0 ✗
```

​**匹配结果**​：第1、2、3个元素

## ⚠️ 关键要点总结

### 1. ​**`&`符号的重要性**​

```
// ✅ 正确：&保持上下文
&:nth-child(-n + 3) .index

// ❌ 错误：丢失上下文，选择器含义完全改变
:nth-child(-n + 3) .index
```

### 2. ​**空格的关键作用**​

```
// ✅ 后代选择器（有空格）
&:nth-child(-n + 3) .index

// ❌ 并集选择器（无空格）
&:nth-child(-n + 3).index
```

### 3. ​**编译结果对比**​

```
/* 有&：正确匹配.list-item的前3个 */
.list-item:nth-child(-n+3) .index { color: red; }

/* 无&：错误匹配任意后代元素 */
.list-item :nth-child(-n+3) .index { color: red; }
```

# 对网页进行设计

## 在components中创建app-header和app-footer文件夹和index.tsx

在他们之中写网页逻辑

# 使用styled-components来对页面写样式

现在终端安装：

```bash
npm install styled-component -D
```

在对应组件的文件夹中创建style.ts（如在app-header下创建）

在整个项目下面创建声明文件style.d.ts

```ts
// src/styled.d.ts
import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      primary: string
      secondary: string
    }
    size: Record<string, unknown> // ✅ 修复：使用 Record
    mixin: Record<string, never>
  }
}
```

## 因为是ts文件所以需要针对该依赖安装类型声明

```
npm install @types/styled-components -D
```

```tsx
export const HeaderWrapper = styled.div``
```

这行代码做了三件重要的事情：

### 1. ​**创建样式化组件**​

- `styled.div`表示你要创建一个 `<div>`元素的样式化版本
- 它返回一个**React 组件**，这个组件会自动应用你定义的 CSS 样式

### 2. ​**定义组件名称**​

- `HeaderWrapper`是你给这个样式化组件起的名字
- 这个名字应该**描述性**地表达这个组件的用途

### 3. ​**导出组件**​

- `export`关键字表示这个组件可以被其他文件导入使用

将heaferWrapper导出到index.tsx里面就可以使用了，在style.ts中继续编写组件

（注意！export const HeaderWrapper = styled.div``由两个点括起来）

# 在哪里编辑总体主题？

在assets中创建theme文件夹和index，在其中编辑theme主题

```ts
// theme.js
const theme = {
  color: {
    primary: '#C20C0C',
    secondary: ''
  },
  size: {},
  mixin: {
    wrapv1: `
      width: 1100px;
      margin: 0 auto;
    `
  }
}

export default theme
```

混入：mixin

格式为；

```tsx
mixin: {
    // 页面内容区域居中
    wrapv1: `
      width: 1100px;
      margin: 0 auto;
    `,

    // 文字超出显示省略号
    textEllipsis: `
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `,

    // 水平居中
    flexCenter: `
      display: flex;
      justify-content: center;
      align-items: center;
    `
```

使用改固定样式来编写高复用率的样式款式 `

```
mixin: {
    wrapv1: `
      width: 1100px;
      margin: 0 auto;
    `,
    flexCenter: `
      display: flex;
      justify-content: center;
      align-items: center;
    `
  }
```

在src下创建文件夹`src/styled.d.ts`文件

```tsx
// src/styled.d.ts
import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      primary: string
      secondary: string
    }
    size: Record<string, unknown> // 或者更具体的类型
    mixin: {
      wrapv1: string
    }
  }
}
```

然后去到整个文件的目录的index.ts，导入ThemeProvider，编辑好对应的属性

用ThemeProvider包裹好：

```tsx
<ThemeProvider theme={theme}>
  <HashRouter>
    <App />
  </HashRouter>
</ThemeProvider>
```

使用ThemeProvider包裹好后，theme中设置的混入就可以让全部人使用了

## 但是！我们不用定义混用而是使用直接定义类，然后给对应组件添加类名

# 后续导入先行项目材料（精灵图、css）

对顶部header继续设计

![](file://D:\markdowm\markdowmphoto\2025-10-28-09-39-39-image.png?msec=1762919291837)

## 对header部分数据进行填写，在data创建header-titles.json

将数据统一到json数据中管理

```json
[
  {
    "title": "发现音乐",
    "type": "path",
    "link": "/discover"
  },
  {
    "title": "我的音乐",
    "type": "path",
    "link": "/mine"
  },
  {
    "title": "关注",
    "type": "path",
    "link": "/focus"
  },
  {
    "title": "商城",
    "type": "link",
    "link": "https://music.163.com/store/product"
  },
  {
    "title": "音乐人",
    "type": "link",
    "link": "https://music.163.com/st/musician"
  },
  {
    "title": "下载客户端",
    "type": "path",
    "link": "/download"
  }
]
```

然后在index中调用：

```ts
import headerTitles from '@/assets/data/header_title.json'
```

```ts
<div className="title-list">
            {headerTitles.map((item) => {
              return (
                <div className="item" key={item.title}>
                  {showItem(item)}
                </div>
              )
            })}
          </div>
```

编辑showItem中的if等逻辑

```ts
function showItem(item: any) {
  if (item.type === 'path') {
    return <Link to={item.path}>{item.title}</Link>
  } else {
    return (
      <a href={item.link} target="_blank" rel="noopener noreferrer">
        {item.title}
      </a>
    )
  }
}
```

# 编辑选中状态

## NavLink 基础概念

### 1. 什么是 NavLink

NavLink 是 React Router 提供的一个特殊组件，用于在 React 应用中创建导航链接。它是 `<Link>`组件的增强版，专门为导航场景设计，能够根据当前 URL 自动添加样式类来表示活动状态。

### 2. 基本用法

```ts
import { NavLink } from 'react-router-dom';

<NavLink to="/home">首页</NavLink>
```

## 二、核心特性详解

### 1. 活动状态样式

NavLink 的核心功能是能够自动为当前匹配的链接添加活动状态类：

```ts
<NavLink
  to="/about"
  className={({ isActive }) => isActive ? 'active-link' : 'normal-link'}
>
  关于我们
</NavLink>
```

```ts
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
          {/* 下标 */}
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
```

注意：active类是需要自己去定义的

## 搜索输入框的设计（使用antd）

```
npm install antd
```

前往antd官网获取需要使用的组件

```
https://ant.design/components/button-cn/
```

根据指引npm下载

```
npm install @ant-design/icons@5.2.6 --save --legacy-peer-deps
```

获取需要使用的图标

```
import { SearchOutlined } from '@ant-design/icons'
import { Input } from 'antd'
```

然后看着官网的逻辑使用

## 然后再style.ts进行编写css逻辑

```ts
export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  color: #787878;
  font-size: 12px;

  > .search {
    width: 158px;
    height: 32px;
    border-radius: 16px;

    input {
      &::placeholder {
        font-size: 12px;
      }
    }
  }

  .center {
    width: 90px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    border: 1px solid #666;
    border-radius: 16px;
    color: #fff;
    margin: 0 16px;
    cursor: pointer;
  }
  :hover {
    color: #fff;
    border-color: #fff;
  }

  .login {
    cursor: pointer;
  }
  :hover {
    color: #fff;
    border-color: #fff;
  }
`
```

其中：

在 CSS/Less/Sass 中，`>`是 ​**子元素选择器**​（Child Combinator），表示：

```less
父元素 > 子元素 {
  /* 样式只作用于直接子元素 */
}
```

接下来编辑discover页面，加入view/discover/index.tsx

创建c-capns文件夹，然后创建nav-bar文件夹，在其下创建index.tsx和style.ts

style.ts:

```ts
import styled from 'styled-components'

export const NavWrapper = styled.div`
  height: 30px;
  background-color: #c20c0c;

  .nav {
    display: flex;
    padding-left: 180px;
    position: relative;
    top: -4px;

    .item {
      a {
        display: inline-block;
        height: 20px;
        line-height: 20px;
        padding: 0 13px;
        margin: 7px 17px 0;
        color: #fff;
        font-size: 12px;

        &:hover,
        &.active {
          text-decoration: none;
          background-color: #9b0909;
          border-radius: 20px;
        }
      }
    }
  }
`
```

index.tsx

```tsx
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
      <div className="nav wrap-v1">
        {discoverMenu.map((item) => {
          return (
            <div className="item" key={item.link}>
              <NavLink to={item.link}>{item.title}</NavLink>
            </div>
          )
        })}
      </div>
    </NavWrapper>
  )
}

export default memo(NavBar)
```

将NavBar导出到discover的index中就可以实现了

# 轮播图制作（recommend页面）

## <mark> 按照业务划分文件夹</mark>：方便各个业务人员只对应自己的开发部分

当前架构：![](file://D:\markdowm\markdowmphoto\2025-10-29-11-03-34-image.png?msec=1762919291837)

后续架构：![](file://D:\markdowm\markdowmphoto\2025-10-29-11-13-29-image.png?msec=1762919291837)

编辑store/recommend.ts逻辑：

```tsx
import { createSlice } from '@reduxjs/toolkit'

//定义状态接口
interface IRecommendState {
  banners: any[]
}
//定义初始状态
const initialState: IRecommendState = {
  banners: []
}
//创建 recommendSlice
const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {}
})

export default recommendSlice.reducer
```

去到总的store中对这个recommendReducer进行注册

```ts
import recommendReducer from '@/views/discover/c-views/recommend/store/recommend'

const store = configureStore({
  reducer: {
    recommend: recommendReducer
  }
})
```

回到store/recommend中，编写getBannner的`createAsyncThunk`封装

```tsx
export const fetchBannerDataAction = createAsyncThunk('banners', async () => {
  const res = await getBanners()
  console.log(res)
  return res.data
})
```

## **`createAsyncThunk`是什么？​**​

### ​**简单理解：​**​

`createAsyncThunk`是 Redux Toolkit 提供的一个**异步action创建器**，专门用来处理"先请求数据，后更新状态"的这种常见场景。

### ​**类比生活例子：​**​

- ​**直接调用API**​ = 你亲自去餐厅点餐、等待、取餐
- ​使用`createAsyncThunk`​ = 你叫外卖小哥帮你完成整个流程，你只关心结果

### **第一个参数：`'banners'`（动作类型前缀）​**​

```
createAsyncThunk('banners', async () => { ... })
```

​**这个字符串的作用：​**​

1. ​**生成三个标准的action类型：​**​

- `banners/pending`- 请求开始（加载中）
- `banners/fulfilled`- 请求成功
- `banners/rejected`- 请求失败

2. ​**在Redux DevTools中清晰可见：​**​

```
Action Type: banners/pending
Action Type: banners/fulfilled
Action Type: banners/rejected
```

3. ​**为什么需要这个前缀？​**​

- 为了在大型应用中区分不同的异步操作
- 比如你还有用户信息请求：`'userInfo'`、商品列表请求：`'products'`等

### ​**第二个参数：异步回调函数**​

```
async () => {
  const res = await getBanners()  // 1. 调用API
  console.log(res)               // 2. 调试打印
  return res.data                // 3. 返回需要的数据
}
```

​**这个函数的工作流程：​**​

1. ​**执行API调用**​：`await getBanners()`

2. ​**处理响应数据**​：可以选择性处理或转换数据

3. ​**返回结果**​：返回的值会成为成功action的`payload`

配套的extraReducers（写在配置slice的reducers之后）：

```ts
extraReducers: (builder) => {
  builder
    .addCase(fetchBannerDataAction.pending, () => {
      console.log('pending')
    })
    .addCase(fetchBannerDataAction.fulfilled, (state, { payload }) => {
      state.banners = payload
    })
    .addCase(fetchBannerDataAction.rejected, () => {
      console.log('rejected')
    })
}
```

但是我们使用reducers的方法：

```ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getBanner } from '../service/recommend'

export const fetchBannerDataAction = createAsyncThunk(
  'banners',
  async (arg, { dispatch }) => {
    const res = await getBanner()
    dispatch(changeBannersAction(res.banners))
  }
)

//定义状态接口
interface IRecommendState {
  banners: any[]
}
//定义初始状态
const initialState: IRecommendState = {
  banners: []
}
//创建 recommendSlice
const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    }
  }
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchBannerDataAction.pending, () => {
  //       console.log('pending')
  //     })
  //     .addCase(fetchBannerDataAction.fulfilled, (state, { payload }) => {
  //       state.banners = payload
  //     })
  //     .addCase(fetchBannerDataAction.rejected, () => {
  //       console.log('rejected')
  //     })
  // }
})

export const { changeBannersAction } = recommendSlice.actions
export default recommendSlice.reducer
```

去到recommend创建c-cpns/top-banner文件夹。再创建index和style开始设计

获取state中的数据

```ts
//模板

import { UseAppSelect } from '@/store'
import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { shallowEqual } from 'react-redux'

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
  const { banners } = UseAppSelect(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqual
  )

  return (
    <div>
      {banners.map((item) => {
        return <div key={item.imageUrl}>{item.imageUrl}</div>
      })}
    </div>
  )
}

export default memo(TopBanner)
```

# 总结：数据获取流程

recommend中的index中的banners 来自useAppSelect中的state

```tsx
const TopBanner: FC<IProps> = () => {
  const { banners } = UseAppSelect(
    (state) => ({
      banners: state.recommend.banners
    }),
    shallowEqual
  )
```

useAppSelect 来自 store文件夹中 index自己定义的useSelect

```ts
export const UseAppSelect: TypedUseSelectorHook<IRootState> = useSelector
```

useAppSelect中的state来自根目录index下宣告全局的store

```tsx
import store from './store'

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConfigProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </ConfigProvider>
    </ThemeProvider>
  </Provider>
)
```

根目录的store来自store目录的index中用configureStore整理好的

```ts
const store = configureStore({
  reducer: {
    recommend: recommendReducer
  }
})

export default store
```

而一开始banners就是获取state中属于recommend那一部分，那么这一部分的recommendReducer来自对应recommend组件中的store（为了方便开发而模块化开发）

```tsx
import recommendReducer from '@/views/discover/c-views/recommend/store/recommend'
```

来到recommend中的store中的recommend.ts（网络请求获取对应banners数据封装进createSlice的部分）

```ts
const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    }
  }
})
```

其中changeBannersAction是赋值用到的函数

然后在同文件中fetchBannerDataAction中会被调用，fetchBannerDataAction可以实现网络请求

```ts
export const fetchBannerDataAction = createAsyncThunk(
  'banners',
  async (arg, { dispatch }) => {
    const res = await getBanner()
    console.log(res.data.banners)
    dispatch(changeBannersAction(res.data.banners))
  }
)
```

然后fetchBannerDataAction会在recommend文件下的index被调用：

```ts
const Recommend: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchBannerDataAction())
  }, [])
  return (
    <div>
      <TopBanner />
      Recommend
    </div>
  )
}
```

## 就ok了~~！

```
TopBanner组件需要banners数据
    ↓
useAppSelector((state) => state.recommend.banners)
    ↓
全局store (configureStore配置)
    ↓
recommendReducer (来自recommend/store/recommend.ts)
    ↓
recommendSlice中的initialState.banners
    ↓
fetchBannerDataAction异步获取数据
    ↓
调用getBanner() API
    ↓
dispatch(changeBannersAction(res.data.banners))
    ↓
更新state.recommend.banners
    ↓
useAppSelector检测变化，重新渲染TopBanner
```

# 获取好数据后制作轮播图

![](file://D:\markdowm\markdowmphoto\2025-10-29-21-54-58-image.png?msec=1762919291860)

# 轮播图：

去到antd官网获取样式复制

可以在下面看见对应组件的API

设置好组件：

```tsx
<BannerWrapper>
  <div className="banner wrap-v2">
    <BannerLeft>
      <Carousel autoplay={true} autoplaySpeed={1000} ref={bannerRef}>
        {banners.map((item, index) => {
          return (
            <div className="banner-item" key={index}>
              <img className="image" src={item.imageUrl} alt={item.typeTitle} />
            </div>
          )
        })}
      </Carousel>
    </BannerLeft>
    <BannerRight></BannerRight>
    <BannerControl>
      <button className="btn left" onClick={handlePrevClick}></button>
      <button className="btn right" onClick={handleNextClick}></button>
    </BannerControl>
  </div>
</BannerWrapper>
```

对按钮进行逻辑的编写

先导入对应的ref类型，定义useRel，然后找到官网的API写上就可以了

```tsx
import type { CarouselRef } from 'antd/es/carousel'
const bannerRef = useRef<CarouselRef>(null)
function handlePrevClick() {
  bannerRef.current?.prev()
}
function handleNextClick() {
  bannerRef.current?.next()
}
```

## 编写属于自己的指示器

根据antd官网API将自带指示器设置为空

```ts
dots={false}
```

在Carousel组件下面添加组件<ul>

```ts
<ul className="dots">
            {banners.map((item, index) => {
              return (
                <li key={item.index}>
                  <span className="item"></span>
                </li>
              )
            })}
          </ul>
```

添加classnames库，方便做类名判断

# classnames 库详解：让 CSS 类名管理变得简单

## 什么是 classnames？

`classnames`是一个小巧但极其有用的 JavaScript 库，专门用于**条件性地组合 CSS 类名**。

## 基础用法对比

### 不使用 classnames（传统方式）

```ts
// ❌ 繁琐的条件判断
let className = 'btn'
if (isPrimary) className += ' btn-primary'
if (isLarge) className += ' btn-large'
if (isDisabled) className += ' btn-disabled'
if (isLoading) className += ' loading'

return <button className={className}>点击我</button>
```

### 使用 classnames

```ts
import classnames from 'classnames'

// ✅ 简洁明了
const className = classnames('btn', {
  'btn-primary': isPrimary,
  'btn-large': isLarge,
  'btn-disabled': isDisabled,
  'loading': isLoading
})

return <button className={className}>点击我</button>
```

类名后面对应的是判断条件

# 编写轮播图下面的部分

```tsx
<RecommendWrapper>
  <div className="content wrap-v2">
    <div className="left">left</div>
    <div className="right">right</div>
  </div>
</RecommendWrapper>
```

| **JSX**​   | `<div className="RecommendWrapper">` | `<RecommendWrapper>` |
| ---------- | ------------------------------------ | -------------------- |
| ​**实质**​ | 普通的 HTML div 元素                 | React 样式组件       |
| ​**样式**​ | 需要额外的 CSS 文件                  | 样式内置在组件中     |

## style部分：

```ts
export const RecommendWrapper = styled.div`
  > .content {
    border: 1px solid #d3d3d3;
    background-image: url(${require('@/assets/img/wrap-bg.png')});
    display: flex;

    > .left {
      padding: 20px;
      width: 729px;
    }

    > .right {
      margin-left: 1px;
      width: 250px;
    }
  }
`
```

## 编写热门推荐部分

![](file://D:\markdowm\markdowmphoto\2025-11-02-23-12-41-image.png?msec=1762919291860)

## 因为HotRecommend部分的头部可以复用，所以对齐进行封装（在根目录的 components中）

![](file://D:\markdowm\markdowmphoto\2025-11-02-23-13-14-image.png?msec=1762919291837)

```tsx
//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HeaderV1Wrapper } from './style'
import { Link } from 'react-router-dom'

interface IProps {
  children?: ReactNode
  title?: string
  keywords?: string[]
  moreText?: string
  moreLink?: string
}

const AreaHeadeV1: FC<IProps> = (props) => {
  const {
    title = '默认标题',
    keywords = [],
    moreText = '更多',
    moreLink = '/'
  } = props
  return (
    <HeaderV1Wrapper className="sprite_02">
      <div className="left">
        <h2 className="title">{title}</h2>
        <div className="keywords">
          {keywords.map((item) => {
            return (
              <div className="item" key={item}>
                <span className="link">{item}</span>
                <span className="divider">|</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="right">
        <Link className="more" to={moreLink}>
          {moreText}
        </Link>
        <i className="icon sprite_02"></i>
      </div>
    </HeaderV1Wrapper>
  )
}

export default memo(AreaHeadeV1)
```

## 其中为了日后的可根据情景使用数据，对props进行解构：

```tsx
interface IProps {
  children?: ReactNode
  title?: string
  keywords?: string
  moreText?: string
  moreLink?: string
}

const AreaHeadeV1: FC<IProps> = (props) => {
  const {
    title = '默认标题',
    keywords = [],
    moreText = '更多',
    moreLink = '/'
  } = props
```

## . 这是**解构赋值 + 默认值**，不是重新赋值

```tsx
const {
  title = '默认标题',
  keyworks = [],
  moreText = '更多',
  morLink = '/'
} = props
```

这行代码的**实际作用**是：

```tsx
// 等价于：
const title = props.title !== undefined ? props.title : '默认标题'
const keyworks = props.keyworks !== undefined ? props.keyworks : []
const moreText = props.moreText !== undefined ? props.moreText : '更多'
const morLink = props.morLink !== undefined ? props.morLink : '/'
```

再在其他组件调用是时候；

```tsx
<AreaHeaderV1
  title="热门推荐"
  keywords={['华语', '流行', '摇滚', '民谣', '电子']}
  moreText="查看更多"
  moreLink="/discover/songs"
/>
```

## 获取热门推荐的数据（网络请求）

现在子组件下的servic中定义好自定义ysRequest方法的get路径：

```ts
export function getHotRecommend(limit = 30) {
  return ysRequest.get({
    url: '/personalized',
    params: {
      limit
    }
  })
}
```

### 1 . ​**函数参数**​ `limit = 30`

- `limit`是请求参数，表示要获取的数据条数
- `= 30`是默认参数，如果不传 limit，默认获取 30 条数据
- 调用示例：

  ```
  getHotRecommend()        // 获取30条数据（使用默认值）
  getHotRecommend(10)      // 获取10条数据
  getHotRecommend(50)      // 获取50条数据
  ```

### 2. ​**params 参数对象**​

- `params`是 GET 请求的查询参数（query parameters）
- 实际请求的 URL 会是：`/personalized?limit=30`
- 参数会自动编码并拼接到 URL 后面

### 3. ​**完整请求流程**​

```
// 调用函数
const result = await getHotRecommend(20)

// 实际发送的请求：
// GET http://localhost:4000/personalized?limit=20

// 后端接收到的参数：
// req.query.limit = 20
```

在子组件下的store中定义好createAsyncThunk方法

```ts
export const fetchHotRecommendAction = createAsyncThunk(
  'hotRecommend',
  async (arg, { dispatch }) => {
    const res = await getHotRecommend(8)
    console.log(res)
  }
)
```

在组件的index下调用

```
dispatch(fetchHotRecommendAction())
```

## 去到上一级的index中使用useAppDispatch调用fetchHotRecommendAction()即可

```ts
const dispatch = useAppDispatch()
useEffect(() => {
  dispatch(fetchBannerDataAction())
  //调用刚刚定义的fetchHotRecommendAction()
  dispatch(fetchHotRecommendAction())
}, [])
```

去到需要使用数据的组件中，再用UseAppSelect调用对应对象的数据即可

```ts
const HotRecommend: FC<IProps> = () => {
  const { hotRecommends } = UseAppSelect(
    (state) => ({
      hotRecommends: state.recommend.hotRecommends
    }),
    shallowEqual
  )
```

便获取到变量名为hotRecommend的来源于：'http://localhost:4000/personalized'的.data.result资源

# 接下来实现：

![](file://D:\markdowm\markdowmphoto\2025-11-03-14-52-13-image.png?msec=1762919291837)

因为多个页面都可能会使用到，所以在components中创建好方便后续调用

在components中创建好文件夹，index、style后：

```ts
//模板

//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { MenuItemWrapper } from './style'
import { formatCount, getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
  itemData: any
}

const SongMenuItem: FC<IProps> = (props) => {
  const { itemData } = props
  return (
    <MenuItemWrapper>
      <div className="top">
        <img src={getImageSize(itemData.picUrl, 140)} alt="" />
        <div className="cover sprite_cover">
          <div className="info sprite_cover">
            <span>
              <i className="sprite_icon headset"></i>
              <span className="count">{formatCount(itemData.playCount)}</span>
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="bottom">{itemData.name}</div>
    </MenuItemWrapper>
  )
}

export default memo(SongMenuItem)
```

因为要接收前面hotrecommend中传入的参数，所以加入props和定义好类型（  itemData: any）：

上一级可以传入item

```ts
      <div className="hot-recommend">
        {hotRecommends.map((item) => {
          return <SongMenuItem key={item.id} itemData={item} />
        })}
      </div>
```

## 对css部分进行编写就可以实现组件样式

如何使用精灵图：使用类名进行精灵图调入后，然后再为其定义一个类名。然后再在自己定义的类名中定义该组件的background-position属性获取到精灵图的对应位置

对数字或时间格式化的函数封装在utils中：

```ts
export function formatCount(count: number) {
  if (count > 100000) {
    return `${Math.floor(count / 10000)}万`
  } else return count
}

export function getImageSize(
  imgeUrl: string,
  wide: number,
  height: number = wide
) {
  return imgeUrl + `?param=${height}×${wide}`
}
```

## 接下来是新碟上架：

![](file://D:\markdowm\markdowmphoto\2025-11-03-16-14-37-image.png?msec=1762919291857)

在热门推荐同一位置创建文件夹编写new-album/index

![](file://D:\markdowm\markdowmphoto\2025-11-04-16-35-17-image.png?msec=1762919291838)

首先编写

```tsx
//模板

import React, { memo, useRef } from 'react'
import type { ComponentRef, FC, ReactNode } from 'react'
import { AlbumWrapper } from './style'
import { Carousel } from 'antd'
import AreaHeaderV1 from '@/components/area-header-v1'
import { UseAppSelect } from '@/store'
import NewAlbuItem from '@/components/new-albu-item'

interface IProps {
  children?: ReactNode
}

const NewAlbum: FC<IProps> = () => {
  //定义内部数据
  //创建bannerRef用来绑定Carousel组件的Dom，用于控制按钮的点击事件
  const bannerRef = useRef<ComponentRef<typeof Carousel>>(null)

  //使用之前自定义的UseSelect获取数据
  const { newAlbums } = UseAppSelect((state) => ({
    newAlbums: state.recommend.newAlbums
  }))
  function handlePreClick() {
    //锁定ref后，点击后操作上一页
    bannerRef.current?.prev()
  }
  function handleNextClick() {
    //锁定ref后，点击后操作下一页
    bannerRef.current?.next()
  }
  return (
    <AlbumWrapper>
      <AreaHeaderV1 title="新碟上架" moreLink="/discover/album" />
      <div className="content">
        <button
          className="sprite_02 arrow arrow-left"
          onClick={handlePreClick}
        ></button>
        <div className="banner">
          {/* 对Carousel进行ref绑定 */}
          <Carousel ref={bannerRef} dots={false} speed={2000}>
            {/* 分为两页轮播图，每一页有五个元素 */}
            {[0, 1].map((item) => {
              return (
                <div key={item}>
                  <div className="album-list">
                    {newAlbums.slice(item * 5, (item + 1) * 5).map((album) => {
                      // 此处的NewAlbumItem是因为很多地方会用到所以在components中进行封装
                      return <NewAlbuItem key={album.id} itemData={album} />
                    })}
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
        <button
          className="sprite_02 arrow arrow-right "
          onClick={handleNextClick}
        ></button>
      </div>
    </AlbumWrapper>
  )
}

export default memo(NewAlbum)
```

![](file://D:\markdowm\markdowmphoto\2025-11-04-16-35-57-image.png?msec=1762919291838)

来到components中创建new-albu-item文件夹后创建index和style

```tsx
//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { AlbunItemWeapper } from './style'
import { getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
  // 定义数据类型先为any
  itemData: any
}
// 添加参数props获取通过网络请求获取到的数据
const NewAlbumItem: FC<IProps> = (props) => {
  // 解构获取数据
  const { itemData } = props
  return (
    <AlbunItemWeapper>
      <div className="top">
        <img src={getImageSize(itemData.picUrl, 100)} />
        <a href="" className="cover sprite_cover"></a>
      </div>
      <div className="bottom">
        <div className="name">{itemData.name}</div>
        <div className="artist">{itemData.artist.name}</div>
      </div>
    </AlbunItemWeapper>
  )
}

export default memo(NewAlbumItem)
```

这里的getImageSize是前面在utils封装好的函数

## 对于网络请求部分：

在recommend的service模块定义好对应的get方法

```tsx
export function getNewAlbum(limit = 10) {
  return ysRequest.get({
    url: '/album/newest',
    params: {
      limit
    }
  })
}
```

在recommend的store模块就定义新的createAsyncThunk方法

```tsx
export const fetchNewAlbumAction = createAsyncThunk(
  'newAlbum',
  async (arg, { dispatch }) => {
    const res = await getNewAlbum(8)
    dispatch(changeNewAibumAction(res.data.albums))
  }
)
```

定义好在creatslice中创建对应的reducers

```ts
 const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    },
    //添加方法
    changeHotRecommendAction(state, { payload }) {
      state.hotRecommends = payload
    },
    changeNewAibumAction(state, { payload }) {
      state.newAlbums = payload
    }
  }
```

然后去到index中调用对应的createAsyncThunk方法就行了，在fetchNewAlbumAction()中获取到了数据后会通过`dispatch(changeNewAibumAction(res.data.albums))`将数据给到Slice并且后续又输出全局

# 将异步请求封装成一个函数：

因为代码重复率太高且减少性能消耗

从：

```ts
export const fetchBannerDataAction = createAsyncThunk(
  'banners',
  async (arg, { dispatch }) => {
    const res = await getBanner()
    dispatch(changeBannersAction(res.data.banners))
  }
)

export const fetchHotRecommendAction = createAsyncThunk(
  'hotRecommend',
  async (arg, { dispatch }) => {
    const res = await getHotRecommend(8)
    console.log(res.data.result)
    dispatch(changeHotRecommendAction(res.data.result))
  }
)

export const fetchNewAlbumAction = createAsyncThunk(
  'newAlbum',
  async (arg, { dispatch }) => {
    const res = await getNewAlbum(8)
    dispatch(changeNewAibumAction(res.data.albums))
  }
)
```

变成

```tsx
export const fetchRecommendDateAction = createAsyncThunk(
  'fetchdata',
  (_, { dispatch }) => {
    getBanner().then((res) => {
      dispatch(changeBannersAction(res.data.banners))
    })
    getHotRecommend(8).then((res) => {
      dispatch(changeHotRecommendAction(res.data.result))
    })
    getNewAlbum().then((res) => dispatch(changeNewAibumAction(res.data.albums)))
  }
)
```

## 榜单制作：

![](file://D:\markdowm\markdowmphoto\2025-11-04-17-18-55-image.png?msec=1762919291857)

在获取数据部分，因为飙升榜、新歌榜、原创榜是三组数据，为了集合他们的数据方便管理，所以使用同一个

`export const fetchRankingDataAction = createAsyncThunk`，而且将他们的数据用一个数组来装，但是每次dispatch的时候顺序一致，但是接收回来网络请求时间不一样一样，所以要通过promise来实现顺序也一致

```ts
import {
  getBanner,
  getHotRecommend,
  getNewAlbum,
  getPlaylistDetail
} from '../service/recommend' //做一个数组方便存放
const rankingIds = [19723756, 3779629, 2884035]
export const fetchRankingDataAction = createAsyncThunk(
  'rankingData',
  (_, { dispatch }) => {
    //   方法一：对三组数据单独处理
    // for (const id of rankingIds) {
    //   getPlaylistDetail(id).then((res) => {
    //     switch (id) {
    //       case rankingIds[0]:
    //         break
    //       case rankingIds[1]:
    //         break
    //       case rankingIds[2]:
    //         break
    //     }
    //   })
    // }
    //方法二:将三组数据放到一个数组里面管理
    //发出去的顺序是固定的，但是接收的顺序不一定是一样的，因为网络的原因
    const promises: Promise<any>[] = []
    for (const id of rankingIds) {
      promises.push(getPlaylistDetail(id))
    }
    Promise.all(promises).then((res) => {
      console.log(res)
    })
  }
)
```

### ​**关键机制图解**​

```
你的 promises 数组结构：
[
  PromiseA (id: 19723756),  // 索引 0
  PromiseB (id: 3779629),   // 索引 1
  PromiseC (id: 2884035)    // 索引 2
]

网络请求完成时间可能不同：
PromiseB 最先完成 → 但结果不会立即返回
PromiseA 第二个完成
PromiseC 最后完成

Promise.all 的处理逻辑：
1. 内部维护一个结果数组：results = [undefined, undefined, undefined]
2. 当 PromiseB 完成时：记录 results[1] = PromiseB的结果
3. 当 PromiseA 完成时：记录 results[0] = PromiseA的结果
4. 当 PromiseC 完成时：记录 results[2] = PromiseC的结果
5. 所有Promise完成后：返回 results = [A结果, B结果, C结果]
```

## 1. `const promises: Promise<any>[] = []`的含义

```ts
const promises: Promise<any>[] = []
```

这行代码的意思是：

- ​**`Promise<any>`**: 表示一个 Promise 对象，它最终解析的值是 `any`类型
- ​**`[]`**: 表示这是一个数组
- ​**合起来**: 创建一个数组，这个数组里的每个元素都必须是 `Promise<any>`类型

所以：

```ts
// 正确：数组里放的是 Promise 对象
const promises: Promise<any>[] = [
  getPlaylistDetail(1), // 返回 Promise
  getPlaylistDetail(2), // 返回 Promise
  getPlaylistDetail(3) // 返回 Promise
]

// 错误：不能放非 Promise 对象
const wrongPromises: Promise<any>[] = [
  '字符串', // 错误！不是 Promise
  123 // 错误！不是 Promise
]
```

## 2. `Promise.all`的含义

`Promise.all`是 Promise 构造函数的一个**静态方法**​（类方法）。

### 作用：

接收一个 Promise 数组，返回一个新的 Promise。这个新 Promise 的状态由数组中所有 Promise 的状态决定。

```ts
// 基本语法
Promise.all(iterable): Promise<Array<any>>
```

### 工作方式：

- ​**全部成功**​：当所有 Promise 都成功时，返回的 Promise 才成功，结果是一个数组，包含所有 Promise 的结果
- ​**有一个失败**​：如果任何一个 Promise 失败，整个 Promise.all 立即失败

```ts
const promise1 = Promise.resolve('结果1')
const promise2 = Promise.resolve('结果2')
const promise3 = Promise.resolve('结果3')

Promise.all([promise1, promise2, promise3]).then((results) => {
  console.log(results) // ['结果1', '结果2', '结果3']
})
```

## 3. Promise 构造函数 vs 实例对象

这是最核心的理解点！Promise 确实是一个构造函数，但它的使用方式有几种：

### Promise 作为构造函数：

```ts
// 创建一个新的 Promise 实例
const myPromise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    resolve('成功的结果')
  }, 1000)
})
```

### Promise 的静态方法：

```ts
// 这些是 Promise 构造函数的类方法，直接通过 Promise.xxx 调用
Promise.all() // 等待所有Promise完成
Promise.race() // 等待第一个Promise完成
Promise.resolve() // 创建立即成功的Promise
Promise.reject() // 创建立即失败的Promise
```

## 4. `getPlaylistDetail()`返回的是什么？

这是最关键的联系点！你的 `getPlaylistDetail`函数大概长这样：

```ts
export function getPlaylistDetail(id: number) {
  return ysRequest.get({
    url: '/playlist/detail',
    params: { id }
  })
}
```

​`ysRequest.get()`方法返回的是一个 Promise 对象\*\*​！

所以：

```ts
// getPlaylistDetail(123) 返回的是一个 Promise 实例对象
const promiseObject = getPlaylistDetail(123)

// 这个 promiseObject 就是 Promise 构造函数创建的实例
// 所以可以调用 .then()、.catch() 方法
promiseObject.then((result) => {
  console.log(result) // 请求成功的结果
})
```

## 🔄 完整流程串联

让我用你的代码来串联整个理解：

```ts
const rankingIds = [19723756, 3779629, 2884035]
const promises: Promise<any>[] = [] // 创建空数组，用来存放Promise实例

for (const id of rankingIds) {
  // getPlaylistDetail(id) 返回一个Promise实例对象
  const promiseInstance = getPlaylistDetail(id)

  // 把这个Promise实例对象加入到数组中
  promises.push(promiseInstance)
}

// 现在 promises 数组包含3个Promise实例对象
// Promise.all 接收这个数组，返回一个新的Promise
Promise.all(promises).then((results) => {
  // results 是按照 promises 数组顺序排列的结果数组
  console.log(results[0]) // 对应 rankingIds[0] 的结果
  console.log(results[1]) // 对应 rankingIds[1] 的结果
  console.log(results[2]) // 对应 rankingIds[2] 的结果
})
```

## 将每一个数组的同款样式封装成一个组件；

![](file://D:\markdowm\markdowmphoto\2025-11-05-13-35-38-image.png?msec=1762919291838)

## 由于该模块其他地方复用率低所以直接在同级文件下创建文件夹

![](file://D:\markdowm\markdowmphoto\2025-11-05-13-53-29-image.png?msec=1762919291838)

编写过程中的思考：

在父的代码：

```tsx
<div className="content">
  {rankings.map((item) => {
    return (
      <TopRankingItem key={item.id} itemData={item}>
        TopRaningItem
      </TopRankingItem>
    )
  })}
</div>
```

然后对`<TopRankingItem/>`：

```tsx
//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { RankingItemWrapper } from './style'

interface IProps {
  children?: ReactNode
  itemData: any
}

const TopRankingItem: FC<IProps> = (props) => {
  const { itemData } = props
  return <RankingItemWrapper>TopRankingItem</RankingItemWrapper>
}

export default memo(TopRankingItem)
```

然后对`<RankingItemWrapper>`样式：

```ts
import styled from 'styled-components'

export const RankingItemWrapper = styled.div`
  width: 230px;
  &:last-child {
    width: 228px;
  }
`
```

思考为什么`&:last-child`可以生效呢？不是每次map之后返回的都是一个新的`<RankingItemWrapper>`吗？它怎么知道自己是不是最后一个子元素。

其实在父的content中，每一个`TopRankingItem`都对应一个`<RankingItemWrapper>`所以说

- 三个 `RankingItemWrapper`都是 `.content`的**直接子元素**​
- 它们都在**同一个父容器**中
- CSS 的 `:last-child`选择器是基于**DOM结构**的，不是基于组件的

# 用HTML和CSS分离的方式来看会更清晰。重写一下：

## HTML结构（JSX编译后）：

```html
<div class="content">
  <!-- 第一个TopRankingItem组件渲染的结果 -->
  <div class="ranking-item">第一个榜单内容</div>

  <!-- 第二个TopRankingItem组件渲染的结果 -->
  <div class="ranking-item">第二个榜单内容</div>

  <!-- 第三个TopRankingItem组件渲染的结果 -->
  <div class="ranking-item">第三个榜单内容</div>
</div>
```

## CSS样式：

```css
/* 对应 styled-components 中的 RankingItemWrapper */
.ranking-item {
  width: 230px;
}

/* 这个选择器会选择父元素(.content)的最后一个.ranking-item子元素 */
.ranking-item:last-child {
  width: 228px;
}
```

编写

![](file://D:\markdowm\markdowmphoto\2025-11-05-15-13-20-image.png?msec=1762919291838)

创建top-ranking

```tsx
//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { RankingWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { UseAppSelect } from '@/store'
import TopRankingItem from '../top-ranking-item'
import { shallowEqual } from 'react-redux'

interface IProps {
  children?: ReactNode
}

const TopRanking: FC<IProps> = () => {
  const { rankings } = UseAppSelect(
    (state) => ({
      rankings: state.recommend.rankings
    }),
    shallowEqual
  )
  return (
    <RankingWrapper>
      {/* 调用先前定义的头部 */}
      <AreaHeaderV1 title="榜单" moreLink="/discover/Ranking" />
      <div className="content">
        {rankings.map((item) => {
          return (
            <TopRankingItem key={item.id} itemData={item}>
              TopRaningItem
            </TopRankingItem>
          )
        })}
      </div>
    </RankingWrapper>
  )
}

export default memo(TopRanking)
```

创建创建top-ranking-item

搭建子项目，首先分三个部分：index、name、operator

```tsx
//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { RankingItemWrapper } from './style'
import { getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
  itemData: any
}

const TopRankingItem: FC<IProps> = (props) => {
  const { itemData } = props
  const { tracks = [] } = itemData
  return (
    <RankingItemWrapper>
      <div className="header">
        <div className="image">
          <img src={getImageSize(itemData.coverImgUrl, 80)} alt="" />
          <a href="" className="sprire_cover"></a>
        </div>
        <div className="info">
          <div className="name">{itemData.name}</div>
          <div>
            <button className="sprite_02 btn play"></button>
            <button className="sprite_02 btn favor"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {/* 因为ts无法推导出tracks的类型，所以有时候需要自己下定义 */}
        {tracks.slice(0, 10).map((item: any, index: number) => {
          return (
            <div className="list-item" key={item.id}>
              <div className="index">{index + 1}</div>
              {/* 将歌曲名字和按钮们放在一个类，方便后续对名字过长部分进行隐藏 */}
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="operator">
                  {/* 三个操作按钮 */}
                  <button className="btn sprite_02 play"></button>
                  <button className="btn sprite_icon2 add"></button>
                  <button className="btn sprite_02 favor"></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="footer">
        <a href="#/discover/ranking">查看全部 ></a>
      </div>
    </RankingItemWrapper>
  )
}

export default memo(TopRankingItem)
```

# 样式中有趣的点：音乐榜单中**前3名**序号用红色突出显示，营造视觉层次感

## 💻 核心代码

```
.list {
  .list-item {
    position: relative;
    display: flex;
    align-items: center;
    height: 32px;

    // 关键选择器：前3名变红
    &:nth-child(-n + 3) .index {
      color: #c10d0c;
    }

    .index {
      width: 35px;
      text-align: center;
      margin-left: 10px;
      font-size: 16px;
    }
  }
}
```

## 🔍 选择器解析

### `&:nth-child(-n + 3) .index`含义：

- ​**`&`**​ = 当前选择器（`.list-item`）
- ​**`:nth-child(-n + 3)`**​ = 选择前3个子元素
- ​**`.index`**​ = 内部的序号元素

### 数学计算：

```
n=0 → -0+3=3 ✓
n=1 → -1+3=2 ✓
n=2 → -2+3=1 ✓
n=3 → -3+3=0 ✗
```

​**匹配结果**​：第1、2、3个元素

## ⚠️ 关键要点总结

### 1. ​**`&`符号的重要性**​

```
// ✅ 正确：&保持上下文
&:nth-child(-n + 3) .index

// ❌ 错误：丢失上下文，选择器含义完全改变
:nth-child(-n + 3) .index
```

### 2. ​**空格的关键作用**​

```
// ✅ 后代选择器（有空格）
&:nth-child(-n + 3) .index

// ❌ 并集选择器（无空格）
&:nth-child(-n + 3).index
```

### 3. ​**编译结果对比**​

```
/* 有&：正确匹配.list-item的前3个 */
.list-item:nth-child(-n+3) .index { color: red; }

/* 无&：错误匹配任意后代元素 */
.list-item :nth-child(-n+3) .index { color: red; }
```

# 音乐播放功能（！！！）

![](file://D:\markdowm\markdowmphoto\2025-11-07-17-09-04-image.png?msec=1762919334635)

# 第一步：封装组件，外形设计

## 存放：

选择封装到视图文件夹中（/views），而不是组件文件夹（/companies）中，避免过于冗长，而且方便进行多个内部组件的封装（跟播放相关、网络请求等等的内容都放在里面）

## 哪里调用：

底部因为播放条不会根据页面切换而消失，所以直接定义在<App>中

## css设计部分

整体位置和背景初定义

```ts
import styled from 'styled-components'

export const PlayerBarWrpper = styled.div`
  position: fixed; // 固定定位，元素脱离文档流，相对于浏览器窗口进行定位
  z-index: 99; // 设置堆叠层级为99，确保元素显示在最上层
  left: 0; // 左边缘与窗口左边缘对齐
  right: 0; // 右边缘与窗口右边缘对齐，与left:0结合实现宽度100%效果
  bottom: 0; // 下边缘与窗口底部对齐，实现底部固定效果
  height: 52px; // 设置元素高度为52像素
  background-position: 0 0; // 背景图片从左上角(0,0)位置开始显示
  background-repeat: repeat; // 背景图片在水平和垂直方向重复平铺
`
```

在创建三个style方便管理：

## BarControl

![](file://D:\markdowm\markdowmphoto\2025-11-07-18-01-30-image.png?msec=1762919334623)

## BarPlayInfo

![](file://D:\markdowm\markdowmphoto\2025-11-07-18-23-03-image.png?msec=1762919334622)

## BarOperator

![](file://D:\markdowm\markdowmphoto\2025-11-07-18-23-16-image.png?msec=1762919334622)

## BarControl：

```ts
interface IBarControl {
  isPlaying: boolean
}
export const BarControl = styled.div<IBarControl>`
  display: flex; // 启用弹性布局，子元素水平排列
  align-items: center; // 子元素在交叉轴（垂直方向）上居中对齐

  .prev,
  .next {
    width: 28px; // 设置宽度为28像素
    height: 28px; // 设置高度为28像素
    cursor: pointer; // 鼠标悬停时显示手型光标，表示可点击
  }

  .prev {
    background-position: 0 -130px; // 背景图片水平位置0，垂直位置-130px（雪碧图技术）
  }

  .play {
    width: 36px; // 播放按钮宽度36px，比前后按钮稍大
    height: 36px; // 播放按钮高度36px
    margin: 0 8px; // 左右外边距各8px，与前后按钮保持间距
    background-position: 0 ${(props) => (props.isPlaying ? '-165px' : '-204px')}; // 根据播放状态动态切换背景图位置
  }

  .next {
    background-position: -80px -130px; // 背景图片水平位置-80px，垂直位置-130px
  }
`
```

#### `styled.div<IBarControl>`的意思是：创建一个 div 组件，它接受 `IBarControl`类型的 props。

## BarPlayInfo：

```ts
// 定义接口IBarControl，用于类型约束
interface IBarControl {
  // 储存播放器是否正在播放的状态
  isPlaying: boolean // ESLint警告出现在这一行，因为使用了非空断言运算符(!)
}

// 使用styled-components创建样式化组件，接受IBarControl接口作为泛型参数
export const BarControl = styled.div<IBarControl>`
  // 设置容器为弹性布局
  display: flex;
  // 子元素在交叉轴（垂直方向）上居中对齐
  align-items: center;

  // 同时为.prev和.next类设置样式
  .prev,
  .next {
    // 设置宽度为28像素
    width: 28px;
    // 设置高度为28像素
    height: 28px;
    // 鼠标悬停时显示手型光标，表示可点击
    cursor: pointer;
  }

  // 上一首按钮的特殊样式
  .prev {
    // 设置背景图片位置：水平0，垂直-130px（使用雪碧图技术）
    background-position: 0 -130px;
  }

  // 普通按钮样式
  .btn {
    // 鼠标悬停时显示手型光标
    cursor: pointer;
  }

  // 播放/暂停按钮样式
  .play {
    // 播放按钮宽度36px，比前后按钮稍大以突出重要性
    width: 36px;
    // 播放按钮高度36px
    height: 36px;
    // 左右外边距各8px，与前后按钮保持间距
    margin: 0 8px;
    // 根据播放状态动态切换背景图位置：播放状态为-165px，暂停状态为-204px
    background-position: 0 ${(props) => (props.isPlaying ? '-165px' : '-204px')};
  }

  // 下一首按钮样式
  .next {
    // 设置背景图片位置：水平-80px，垂直-130px（雪碧图技术）
    background-position: -80px -130px;
  }
`
```

## BarOperator：

```ts
export const BarOperator = styled.div<IBarOperator>`
  display: flex;
  align-items: center;
  position: relative;
  top: 3px;

  .btn {
    width: 25px;
    height: 25px;
  }

  .left {
    display: flex;
    align-items: center;
  }

  .pip {
    background: url(${require('@/assets/img/pip_icon.png')});
  }

  .favor {
    background-position: -88px -163px;
  }

  .share {
    background-position: -114px -163px;
  }

  .right {
    display: flex;
    align-items: center;
    width: 126px;
    padding-left: 13px;
    background-position: -147px -248px;

    .volume {
      background-position: -2px -248px;
    }

    .loop {
      background-position: ${(props) => {
        switch (props.playMode) {
          case 1:
            return '-66px -248px'
          case 2:
            return '-66px -344px'
          default:
            return '-3px -344px'
        }
      }};
    }

    .playlist {
      padding-left: 18px;
      text-align: center;
      color: #ccc;
      width: 59px;
      background-position: -42px -68px;
    }
  }
`
```

## 接下来进行功能逻辑

使用redux来管理正在播放的音乐（initialState中的：currentSong：store），组件通过useselect来获取store，然后在各个有播放音乐功能的组件都给“播放”绑定一个dispatch，用来改变这个currentSong，同时组件就可以获取最新的当前播放的音乐。

播放逻辑：

```
歌曲数据 → Audio元素 → 播放控制 → UI反馈
```

## 第一步：创建遥控器

```ts
const audioRef = useRef<HTMLAudioElement>(null)
```

- 创建一个空的遥控器，准备控制audio元素
- 此时`audioRef.current`是`null`（还没配对）
- `HTMLAudioElement`是 **TypeScript 中对于将要绑定Audio组件的类型说明**

## 第二步：创建管理播放状态（默认为无播放）

```ts
const [isPlaying, setIsPlaying] = useState(false)
```

##

## 第三步：创建播放器组件（audio）并将遥控器绑定到真实播放器

这里没有定义播放的歌曲src，在useEffect中定义

```ts
<audio
  ref={audioRef}  // 关键！把遥控器和真实audio配对
/>
```

## 第四步：在utils文件中## 生成音乐播放地址的方法，utils/handle-player.ts后传到组件中

```ts
export function getPlayerUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}
```

## 第四步：编写useEffect的逻辑，挂载currentSong，意思是每当currentSong变化的时候才执行useEffect函数体。（目的是：切歌的时候进行）

```ts
useEffect(() => {
  if (!audioRef.current) return //安全检查
  audioRef.current.src = getPlayerUrl(currentSong.id)
  audioRef.current
    .play()
    .then(() => {
      console.log('播放成功')
      setIsPlaying(true)
    })
    .catch((err) => {
      console.log('播放失败:', err)
      setIsPlaying(false)
    })
  setDuration(currentSong.dt)
}, [currentSong])
```

1. `if (!audioRef.current) return`：如果`audioRef.current`不存在（是null或undefined），就立即停止执行这个函数，直接返回，不执行下面的函数。意思就是安全检查，真实的audio DOM元素

2. `audioRef.current.src = getPlayerUrl(currentSong.id) `设置播放当前选择的currentSong歌曲的地址

3. `setIsPlaying(true)`更新状态为：正在播放

4. `setIsPlaying(false)  `更新状态：播放失败

## 第四步：为按钮绑定事件：通过遥控器控制播放

```ts
 <button
            className="btn sprite_playbar play"
            onClick={handlePlayBtnClick}
          ></button>};
```

## 第五步：编辑点击事情逻辑（目的：处理点击暂停和播放的逻辑）

```ts
function handlePlayBtnClick() {
  const isPaused = audioRef.current!.paused
  isPaused
    ? audioRef.current?.play().catch(() => setIsPlaying(false))
    : audioRef.current?.pause()
  setIsPlaying(isPaused)
}
```

1. `const isPaused = audioRef.current!.paused`检查音频当前是播放还是暂停状态，`audioRef.current.paused`是浏览器audio元素的原生属性，返回 `true`：音频当前处于**暂停**状态，返回 `false`：音频正在**播放**（paused是暂停的意思）

2. 根据状态执行相应操作（三元表达式）：<mark>情况1</mark>：当前是暂停状态（需要播放）：`audioRef.current?.play().catch(() => setIsPlaying(false))`。`audioRef.current?.play()`：尝试播放音乐，`.catch()`：如果播放失败（比如浏览器策略限制），`() => setIsPlaying(false)`：播放失败时，将状态重置为暂停；；；；；<mark>情况2</mark>：当前是播放状态（需要暂停）`audioRef.current?.pause()`，直接暂停音乐（暂停操作不会失败，所以不需要catch）

3. `setIsPlaying(isPaused)`，如果播放（isPaused为false），刚好将store：isPlaying变为false。反之亦然

## 第六步：把正确的参数传递给组件

`<BarControl isPlaying={isPlaying}>`：将store传递给css部分

useEffect和handlePlayBtnClick逻辑类似，意思是前者是处理切歌的时候（也就是currentSong变化，因为挂载了[currentSong]，只有它改变或者初次渲染页面才会触发，因为触发浏览器的保护机制，所以初次渲染也不会播放音乐），然后handlePlayBtnClick就是单纯地处理点击暂停和播放的逻辑

## 设计进度条逻辑

## 使用store来储存当前播放歌曲的总时长

`  const [duration, setDuration] = useState(0)`

## 每当当前播放音乐currentSong播放的时候就赋新值给它（在useEffect中）

`    setDuration(currentSong.dt)`获取到的时长的单位为毫秒

```ts
useEffect(() => {
  if (!audioRef.current) return
  audioRef.current.src = getPlayerUrl(currentSong.id)
  // audioRef.current
  //   .play()
  //   .then(() => {
  //     console.log('播放成功')
  //     setIsPlaying(true)
  //   })
  //   .catch((err) => {
  //     console.log('播放失败:', err)
  //     setIsPlaying(false)
  //   })
  setDuration(currentSong.dt)
}, [currentSong])
```

### 使用store来储存进度的值（默认在0的）

  `const [progress, setProgress] = useState(0)`

### 将值赋给组件

`<Slider value={progress} />`中的value是用来控制**slider进度条的位置**

### 为播放的时候设置监听器

#### `audio.onTimeUpdate`播放进度实时监听器

- 播放时：**每秒触发4-10次其中的函数体**（取决于播放进度）
- 暂停时：**不触发**
- 停止时：**不触发**

`      <audio ref={audioRef} onTimeUpdate={handleTimeUpdata} />`

### 获取当前播放时间的方法

audio获取当前播放时间：`audioRef.current!.currentTime`

```ts
function handleTimeUpdata(): void {
  //获取当前播放时间
  const currentTime = audioRef.current!.currentTime
  const progress = ((currentTime * 1000) / duration) * 100
  setProgress(progress)
}
```

## 为Slider设置步长为0.3更加丝滑

 ` <Slider value={progress} step={0.3} />`

## 对总时长毫秒设计格式化函数

```ts
export function formatTime(time: number) {
  // 转成秒钟
  const timeSecondes = time / 1000
  // 获取分钟和秒钟
  const minue = Math.floor(timeSecondes / 60)
  const Secondes = Math.floor(timeSecondes) % 60
  // 格式化时间
  const formatMinute = String(minue).padStart(2, '0')
  const formatSecondes = String(Secondes).padStart(2, '0')

  return formatMinute + ':' + formatSecondes
}
```

### 格式化补零

```ts
// 格式化时间
const formatMinute = String(minue).padStart(2, '0')
const formatSecondes = String(Secondes).padStart(2, '0')
```

#### `String(minue).padStart(2, '0')`解析：

- **`String(minue)`**：将数字转换为字符串
- **`.padStart(2, '0')`**：在字符串开头补零，确保长度为2位
- **示例**：
  - `4分钟 → "4" → "04"`
  - `12分钟 → "12" → "12"`（已经是2位，不补零）

##

## 对当前时间格式化

使用store存储：`audioRef.current!.currentTime``

## 歌曲播放时候进度条点击和拖拽效果

![](file://D:\markdowm\markdowmphoto\2025-11-08-13-10-38-image.png?msec=1762919334622)

| 方法                   | 触发时机                              | 使用场景                 |
| ---------------------- | ------------------------------------- | ------------------------ |
| **`onChange`**         | **实时触发**- 值一改变就触发          | 拖动过程中实时更新UI显示 |
| **`onChangeComplete`** | **操作完成后触发**- 鼠标松开/键盘释放 | 确认最终值后执行操作     |

新建状态控制是否在操作：

 ` const [isChanging, setIsChanging] = useState(false) // 新增：控制状态更新`

当为false是正常播放，当true是拖拽状态

（因为onChangeComplete出现了问题，所以使用onChange来实现两个效果吧）

```ts
<Slider
                value={progress}
                step={0.3}
                tooltip={{ formatter: null }}
                onChange={handleSliderChange}
              />
```

```ts
function handleSliderChange(value: number): void {
  //时间更改
  setIsChanging(true)
  const currentTime = (value / 100) * duration
  audioRef.current!.currentTime = currentTime / 1000
  setCurrenttime(currentTime)
  setProgress(value)
  console.log(value)
}
```

## 歌词匹配：

获取歌词

### 创建service进行封装

```ts
import ysRequest from '@/service'

export function getSongDetail(ids: number) {
  return ysRequest.get({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

export function getSongLyric(id: number) {
  return ysRequest.get({
    url: '/lyric',
    params: {
      id
    }
  })
}
```

### 调用封装好的get根据id获取歌曲和其歌词：

```ts
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { getSongDetail, getSongLyric } from '../app-player-bar/service/player'
import { ILyricInfo, parseLyric } from '@/utils/parse-lyric'

export const fetchCurrentSongAction = createAsyncThunk(
  'currentSong',
  (id: number, { dispatch }) => {
    //获取歌曲信息
    getSongDetail(id).then((res) => {
      const song = res.data.songs[0]
      dispatch(changeCurrentSongAction(song))
    })

    getSongLyric(id).then((res) => {
      const lyricString = res.data.lrc.lyric
      // 此时获取到的为用换行符分割的长字符串
      const lyrics = parseLyric(lyricString)
      dispatch(changeLyricsAction(lyrics))
    })
  }
)

interface IPlayerState {
  currentSong: any
  lyrics: ILyricInfo[]
}

const initialState: IPlayerState = {
  currentSong: {},
  lyrics: []
}

const playSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload
    },
    changeLyricsAction(state, { payload }) {
      state.lyrics = payload
    }
  }
})

export default playSlice.reducer
export const { changeCurrentSongAction, changeLyricsAction } = playSlice.actions
```

### 获取到的歌词内容为一个长字符串，类似：

<mark>"[00:09.09]粤语词：张健晖\n[00:12.21]原唱：蔡依林\n[00:17.91]好怎会跟她再好\n[00:22.05]数欺骗一数再数\n[00:24.12]终于数到\n[00:26.94]难辩蒙混就推心置腹\n[00:31.89]牵我手为何被她说服\n[00:36.72]她和我剧情总多插曲\n"</mark>

## 其中用到了格式化歌词的工具parseLyric对字符串进行拆解，其逻辑为：

```ts
// 定义正则表达式来匹配LRC歌词的时间戳格式 [分:秒.毫秒]
// 使用捕获分组来分别提取分钟、秒钟和毫秒部分
// 正则说明：\[ 匹配左括号，(\d{2})匹配2位数字（分钟），:匹配冒号，(\d{2})匹配2位数字（秒钟）
// \.匹配点号，(\d{2,3})匹配2-3位数字（毫秒），\]匹配右括号
const parseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

// 定义歌词信息的接口类型
// 这个接口规定了每个歌词对象应该包含的属性：
// time: 时间点（单位毫秒），表示歌词应该显示的时间
// content: 歌词文本内容
export interface ILyricInfo {
  time: number
  content: string
}

// 主要的歌词解析函数
// 参数lyricString: 包含时间戳和歌词内容的完整字符串
// 返回值: 解析后的歌词对象数组，按时间顺序排列
export function parseLyric(lyricString: string) {
  // 将输入的歌词字符串按换行符分割成数组
  // 这样每一行就是一个独立的歌词条目（包含时间戳和内容）
  const lineStrings = lyricString.split('\n')

  // 初始化一个空数组，用于存储解析后的歌词对象
  // 这个数组将包含所有有效歌词行的时间和信息
  const lyrics: ILyricInfo[] = []

  // 使用for...of循环遍历每一行歌词字符串
  // 这种循环方式适合遍历数组，每次迭代获取一个歌词行
  for (const line of lineStrings) {
    // 检查当前行是否非空（避免处理空行）
    // 如果行为空字符串，则跳过后续处理
    if (line) {
      // 使用正则表达式匹配当前行中的时间戳
      // exec方法返回匹配结果数组，如果匹配失败返回null
      const result = parseExp.exec(line)

      // 如果匹配失败（result为null），说明这一行不包含有效的时间戳格式
      // 使用continue跳过当前循环的剩余代码，继续处理下一行
      if (!result) continue

      // 将分钟部分转换为毫秒：分钟 × 60 × 1000
      // result[1]对应正则的第一个捕获组（分钟）
      const time1 = Number(result[1]) * 60 * 1000

      // 将秒钟部分转换为毫秒：秒钟 × 1000
      // result[2]对应正则的第二个捕获组（秒钟）
      const time2 = Number(result[2]) * 1000

      // 处理毫秒部分：判断毫秒位数是2位还是3位
      // 如果毫秒是3位数（如090），直接转换为数字
      // 如果毫秒是2位数（如09），需要乘以10（变成90毫秒）
      // 这是因为LRC格式中毫秒可能是2位或3位表示
      const time3 =
        result[3].length === 3 ? Number(result[3]) : Number(result[3]) * 10

      // 计算总时间：分钟毫秒 + 秒钟毫秒 + 毫秒
      // 得到歌词应该显示的时间点（从歌曲开始计算的毫秒数）
      const time = time1 + time2 + time3

      // 提取纯歌词内容：移除行中的时间戳部分
      // 使用replace方法将匹配到的时间戳替换为空字符串
      // 使用trim()去除内容两端的空白字符
      const content = line.replace(parseExp, '').trim()

      // 创建歌词对象，包含时间点和内容
      // 这个对象符合ILyricInfo接口的定义
      const lineObj = { time, content }

      // 将创建的歌词对象添加到歌词数组中
      // 这样我们就成功解析了一行歌词
      lyrics.push(lineObj)
    }
  }

  // 返回解析完成的所有歌词对象数组
  // 这个数组可以用于歌词的滚动显示和同步功能
  return lyrics
}
```

### 代码中的正则：

```
const parseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
```

**逐部分解析：**

- `/`和 `/`→ 正则表达式的开始和结束标记
- `\[`→ 匹配左方括号`[`（`[`是特殊字符，需要转义）
- `(\d{2})`→ **第1个捕获组**：匹配2位数字（`\d`表示数字，`{2}`表示2个）
- `:`→ 匹配冒号
- `(\d{2})`→ **第2个捕获组**：匹配2位数字（秒钟）
- `\.`→ 匹配点号（`.`是特殊字符，需要转义）
- `(\d{2,3})`→ **第3个捕获组**：匹配2-3位数字（毫秒）
- `\]`→ 匹配右方括号`]`

## 第三部分：`.exec()`方法详解

### `.exec()`是什么？

- 是正则表达式对象的一个方法
- 作用：在字符串中**执行搜索**，返回匹配结果的详细信息

### 返回值结构：

```ts
const result = parseExp.exec("[00:09.09]歌词内容")

// result数组包含：
[
  0: "[00:09.09]",     // 完整匹配的文本
  1: "00",            // 第1个捕获组（分钟）
  2: "09",           // 第2个捕获组（秒钟）
  3: "09",           // 第3个捕获组（毫秒）
  index: 0,          // 匹配开始的字符位置
  input: "[00:09.09]歌词内容"  // 原始输入字符串
]
```

### 注意：exec返回的不是一个普通的数组，而是可以支持自定义index的类对象数组

### 1. 它既是数组又是对象

```ts
const str = '[00:09.09]歌词内容'
const result = parseExp.exec(str)

console.log(typeof result) // "object"
console.log(Array.isArray(result)) // true - 它确实是数组！
console.log(result instanceof Array) // true
```

### 2. 但它有额外的属性

虽然它是数组，但JavaScript允许给数组添加自定义属性：

```ts
// 实际上是这样的结构：
const result = [
  '[00:09.09]', // index 0
  '00', // index 1
  '09', // index 2
  '09' // index 3
]

// 但同时还有这些属性：
result.index = 0
result.input = '[00:09.09]歌词内容'
result.groups = undefined // 如果有命名捕获组的话
```

### 3. 验证一下实际结构

让我们实际运行代码看看：

```ts
const parseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
const line = '[00:09.09]好怎会跟她再好'
const result = parseExp.exec(line)

console.log('=== 数组部分 ===')
console.log('result[0]:', result[0]) // "[00:09.09]"
console.log('result[1]:', result[1]) // "00"
console.log('result[2]:', result[2]) // "09"
console.log('result[3]:', result[3]) // "09"
console.log('数组长度:', result.length) // 4

console.log('=== 额外属性 ===')
console.log('result.index:', result.index) // 0 - 匹配开始位置
console.log('result.input:', result.input) // 完整输入字符串
console.log('result.groups:', result.groups) // 命名捕获组（如果有）

console.log('=== 遍历所有属性 ===')
for (let key in result) {
  console.log(key + ':', result[key])
}
```

**输出结果是：**

```
=== 遍历所有属性 ===
0: [00:09.09]
1: 00
2: 09
3: 09
index: 0
input: [00:09.09]好怎会跟她再好
```

### 字符串的`.replace()`方法

JavaScript中字符串的`.replace()`方法设计得很灵活，它支持两种参数：

**方式1：替换固定字符串**

```
const str = "hello world"
str.replace("world", "JavaScript") // "hello JavaScript"
```

**方式2：替换正则表达式匹配的内容**

```
const str = "价格：100元，折扣：50元"
str.replace(/\d+/g, "XXX") // "价格：XXX元，折扣：XXX元"
```

## 对获取的原数据数组进行封装

```ts
import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import { getSongDetail, getSongLyric } from '../app-player-bar/service/player'
import { ILyricInfo, parseLyric } from '@/utils/parse-lyric'

export const fetchCurrentSongAction = createAsyncThunk(
  'currentSong',
  (id: number, { dispatch }) => {
    //获取歌曲信息
    getSongDetail(id).then((res) => {
      const song = res.data.songs[0]
      dispatch(changeCurrentSongAction(song))
    })

    getSongLyric(id).then((res) => {
      const lyricString = res.data.lrc.lyric
      // 此时获取到的为用换行符分割的长字符串
      const lyrics = parseLyric(lyricString)
      dispatch(changeLyricsAction(lyrics))
    })
  }
)

interface IPlayerState {
  currentSong: any
  lyrics: ILyricInfo[]
}

const initialState: IPlayerState = {
  currentSong: {},
  lyrics: []
}

const playSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload
    },
    changeLyricsAction(state, { payload }) {
      state.lyrics = payload
    }
  }
})

export default playSlice.reducer
export const { changeCurrentSongAction, changeLyricsAction } = playSlice.actions
```

# 根据时长获取当前歌词 ` lyricIndex: number`

为slider创建新的对象属性，并且初始这设置为-1，创建写入Action

```ts
interface IPlayerState {
  currentSong: any
  lyrics: ILyricInfo[]
  lyricIndex: number
}

const initialState: IPlayerState = {
  currentSong: {},
  lyrics: [],
  lyricIndex: -1
}

const playSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload
    },
    changeLyricsAction(state, { payload }) {
      state.lyrics = payload
    },
    //保存歌词索引
    changeLyricIndexAction(state, { payload }) {
      state.lyricIndex = payload
    }
  }
})
```

## 回到index中在audio的热调用中编写逻辑匹配

```ts
function handleTimeUpdata(): void {
  //当不是交互状态才开始
  if (!isChanging) {
    //获取当前播放时间
    const currentTime = audioRef.current!.currentTime * 1000
    const progress = (currentTime / duration) * 100
    setProgress(progress)
    setCurrenttime(currentTime)
  }
  //歌词追踪逻辑
  let index = lyrics.length - 1 //默认最后一句，避免加载不出来
  for (let i = 0; i < lyrics.length; i++) {
    const lyric = lyrics[i]
    if (lyric.time > currentTime) {
      index = i - 1
      break
    }
  }
  //避免多次赋值：
  if (lyricIndex === index || index === -1) return
  //当匹配上歌词索引后匹配起来（保存在slice中）
  dispatch(changeLyricIndexAction(index))
  console.log(lyricIndex)
}
```

避免最后一句歌词无法匹配故把默认设置为了`lyrics.length - 1`

### 并且当歌曲在播放的时候，对应歌词变化时候才dispatch更新

# 歌曲的切换

为slider对象创建储存播放歌曲的数组，和当前播放歌曲在数组中的索引

```ts
interface IPlayerState {
  currentSong: any
  lyrics: ILyricInfo[]
  lyricIndex: number
  //存储准备播放歌曲的数组
  playSongList: any[]
  //当前播放歌曲的索引
  plauSongIndex: number
}

const initialState: IPlayerState = {
  currentSong: {},
  lyrics: [],
  lyricIndex: -1,
  //存储准备播放歌曲的数组
  playSongList: [],
  //当前播放歌曲的索引
  plauSongIndex: -1
}
```

### 模拟当前播放列表中有多首歌曲，手动将数据存入playSongList中

（手动将两首歌曲存入了playSongList中）

# 逻辑：

<mark>1、当播放某一种歌曲的时候，它没有在播放列表中，必须将他加进去播放列表中</mark>

<mark>2、播放着首歌已在播放列表中了，取出歌曲直接播放</mark>

### 所以需要重构现有代码

原先：在根组件App中就把currentSong歌曲进行uesEffect渲染出来通过id获取数据

```ts
export const fetchCurrentSongAction = createAsyncThunk<
  void,
  number,
  { state: IRootState }
>('currentSong', (id: number, { dispatch, getState }) => {
  //获取歌曲信息
  //1、查看当前播放歌曲在播放列表中是否存在
  //获取playSongList
  const playSongList = getState().player.playSongList
  const findIndex = playSongList.findIndex((item) => item.id === id)
  if (findIndex === -1) {
    //没有找到相同的
    getSongDetail(id).then((res) => {
      const song = res.data.songs[0]
      dispatch(changeCurrentSongAction(song))
      //将song放到currentSong中
      const newPlaySongList = [...playSongList]
      newPlaySongList.push(song)
      dispatch(changeCurrentSongAction(song))
      dispatch(changePlaySongListAction(newPlaySongList))
      dispatch(changePlaySongIndexAction(newPlaySongList.length - 1))
    })
  } else {
    //找到相同的item
    const song = playSongList[findIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndexAction(findIndex))
  }

  getSongDetail(id).then((res) => {
    const song = res.data.songs[0]
    dispatch(changeCurrentSongAction(song))
  })

  getSongLyric(id).then((res) => {
    const lyricString = res.data.lrc.lyric
    // 此时获取到的为用换行符分割的长字符串
    //对其进行格式化后获取到的是元素为对象的数组
    const lyrics = parseLyric(lyricString)
    dispatch(changeLyricsAction(lyrics))
  })
})
```

添加Action：

```ts
    changePlaySongIndexAction(state, { payload }) {
      state.playSongIndex = payload
    },
    changePlaySongListAction(state, { payload }) {
      state.playSongList = payload
    }
```

# 讲解：

```ts
export const fetchCurrentSongAction = createAsyncThunk<
  void,           // 第一个泛型参数：async thunk的返回值类型（这里是void，无返回值）
  number,         // 第二个泛型参数：传入的参数类型（这里是number，歌曲ID）
  { state: IRootState }  // 第三个泛型参数：thunkAPI的配置，指定state类型为IRootState
>('currentSong', (id: number, { dispatch, getState }) => {
```

**关联说明**：

- `IRootState`是在store中定义的根状态类型
- `createAsyncThunk`是Redux Toolkit用于创建异步action的工具

```ts
const playSongList = getState().player.playSongList
```

**逻辑**：从Redux store中获取当前的播放列表

- `getState()`返回整个store的状态
- `.player.playSongList`获取player模块下的playSongList数组

```ts
const findIndex = playSongList.findIndex((item) => item.id === id)
```

**逻辑**：在播放列表中查找是否存在相同ID的歌曲

- `findIndex`方法返回匹配元素的索引，找不到返回-1

```ts
if (findeIndex === -1) {
  //没有找到相同的
  getSongDetail(id).then((res) => {
    const song = res.data.songs[0]
    dispatch(changeCurrentSongAction(song))
```

**逻辑**：如果歌曲不在播放列表中

- 调用API获取歌曲详情 `getSongDetail(id)`
- 从响应中提取歌曲信息 `res.data.songs[0]`
- 分发action更新当前歌曲 `changeCurrentSongAction(song)`

```ts
//将song放到currentSong中
const newPlaySongList = [...playSongList]
newPlaySongList.push(song)
dispatch(changeCurrentSongAction(song))
dispatch(changePlaySongListAction(newPlaySongList))
dispatch(changePlaySongIndexAction(newPlaySongList.length - 1))
```

**逻辑**：将新歌曲添加到播放列表并更新状态

- `[...playSongList]`创建播放列表的浅拷贝
- `newPlaySongList.push(song)`将新歌曲添加到列表末尾
- 再次更新当前歌曲（重复操作，可以删除）
- 更新播放列表状态
- 设置播放索引为最后一首（新添加的歌曲）

```ts
} else {
  //找到相同的item
  const song = playSongList[findeIndex]
  dispatch(changeCurrentSongAction(song))
  dispatch(changePlaySongIndexAction(findeIndex))
}
```

**逻辑**：如果歌曲已在播放列表中

- 直接从列表中获取歌曲信息
- 更新当前播放的歌曲
- 设置播放索引为找到的索引位置

# 设置播放模式

在slice中创建属性playMode，类型为数字，不同数字代表不同播放模式

```ts
interface IPlayerState {
  currentSong: any
  lyrics: ILyricInfo[]
  lyricIndex: number
  //存储准备播放歌曲的数组
  playSongList: any[]
  //当前播放歌曲的索引
  playSongIndex: number
  //记录播放模式
  playMode: number
}
```

```ts
changePlayModeAction(state, { payload }) {
      state.playMode = payload
```

在index中导入并且写好点击逻辑（使用dispatch调用Action即可）

# 切换模式和播放模式的匹配

为播放模式按钮绑定点击事件`onClick={handleChangePlayMode}`

在实践中调用dispatch

```ts
function handleChangePlayMode(): void {
  let newPlayMode = playMode + 1
  if (newPlayMode > 2) newPlayMode = 0
  dispatch(changePlayModeAction(newPlayMode))
}
```

```ts
export const changeMusicAction = createAsyncThunk<
  void,
  boolean,
  { state: IRootState }
>('changeMusic', (isNext, { dispatch, getState }) => {
  //1、判断是上一首还是下一首
  const player = getState().player
  const playMode = player.playMode
  const songIndex = player.playSongIndex
  const songList = player.playSongList
  //2、根据不同模式计算下一首的索引
  let newIndex = songIndex
  if (playMode === 1) {
    //随机播放
    newIndex = Math.floor(Math.random() * songList.length)
  } else {
    //单曲循环或顺序播放（但是就算是单曲循环，主动点击下一首都会切换）
    newIndex = isNext ? songIndex + 1 : songIndex - 1
    if (newIndex > songList.length - 1) newIndex = 0
    if (newIndex < 0) newIndex = songList.length - 1
  }
  const song = songList[newIndex]
  dispatch(changeCurrentSongAction(song))
  dispatch(changePlaySongIndexAction(newIndex))
  //切换音乐时候，歌词自动更新
  getSongLyric(song.id).then((res) => {
    const lyricString = res.data.lrc.lyric
    // 此时获取到的为用换行符分割的长字符串
    //对其进行格式化后获取到的是元素为对象的数组
    const lyrics = parseLyric(lyricString)
    dispatch(changeLyricsAction(lyrics))
  })
})
```

# 当音乐播放完毕，自动切换下一首

### 为audio组件添加onEnded

```ts
<audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdata}
        onEnded={handleTimeEnded}
      />
```

```ts
function handleTimeEnded(): void {
  //单曲循环时候
  if (playMode === 2) {
    audioRef.current!.currentTime = 0
    audioRef.current?.play()
  }
  //当不是单曲循环的时候
  else {
    handleChangeBtnClick(true)
  }
}
```
