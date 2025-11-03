# 网易云前端项目开发（react+Ts）

# 创建项目阶段

使用先创建react项目再配置Ts的方法比较多弊端不推荐，所以采用直接配置Ts

（通过react脚手架后同时配置TypeScript的支撑）

```
create-react-app yingsheng_ts_react_music --template  typescript
```

——template typescript——：在使用脚手架配置react的时候提供配置Ts服务

# 项目目录结构

## node_modules

<mark>存放依赖</mark>

1. **为什么需要它？​**​

- JavaScript 本身没有内置的模块管理系统（比如像 Python 的 `pip`或 Java 的 `Maven`），所以需要 `node_modules`来集中管理第三方代码。

2. ​**文件夹结构**​

- 早期版本是**嵌套结构**​（依赖的依赖会层层嵌套），现在默认是**扁平化结构**​（尽量把重复的依赖提到顶层）。

3. ​**与 `package.json`的关系**​

- `package.json`是**购物清单**​（记录你要装哪些库），`node_modules`是**仓库**​（实际存放这些库）。

4. ​**为什么这么大？​**​

- 一个库可能依赖几十个其他库（比如 `webpack`依赖了 100+ 个库），所以 `node_modules`经常几百MB甚至几GB。

# public

<mark>存放资源</mark>

1. **放什么？​**​

- ​**固定不变的资源**​：`favicon.ico`（网站小图标）、`robots.txt`（搜索引擎爬虫规则）。
- ​**直接引用的文件**​：比如 `data.json`（绕过后端API，前端直接加载的静态数据）。
- ​**不被编译的代码**​：某些第三方库的 `.js`文件（如老版本的 jQuery）。

2. ​**特殊文件**​

- `index.html`：项目的“大门”，Webpack 会把打包后的代码自动注入到这里。
- `manifest.json`：PWA（渐进式网页应用）的配置文件，定义应用图标、主题色等。

3. ​**如何引用？​**​

- 在代码中可以直接用绝对路径（但更推荐用 `process.env.PUBLIC_URL`）：

  ```
  <img src="/logo.png" />  // 直接从 public 文件夹找
  ```

# src

<mark>存放需要webpack加工的代码与资源</mark>

1. **为什么需要 `src`？​**​

- 现代前端项目代码复杂，需要**模块化、编译、优化**，不能像 `public`那样直接扔给浏览器。

2. ​**Webpack 如何处理 `src`？​**​

- ​**入口**​：从 `index.tsx`开始，分析所有依赖。
- ​**加载器（Loader）​**​：用 `ts-loader`处理 TS，用 `file-loader`处理图片。
- ​**插件（Plugin）​**​：压缩代码、生成 HTML、优化性能。

# package-lock.json和package.json

#### 存放项目的版本详细信息

**为什么需要两个文件？​**​

| 场景               | 只有 package.json            | 有 package-lock.json  |
| ------------------ | ---------------------------- | --------------------- |
| ​**你开发**​       | ✅ 正常                      | ✅ 正常               |
| ​**同事下载代码**​ | ❌ 可能装到更新版本，导致bug | ✅ 装到完全相同的版本 |
| ​**服务器部署**​   | ❌ 可能因版本差异部署失败    | ✅ 保证环境一致       |

​**版本号符号的含义**​

```
{
  "dependencies": {
    "react": "18.2.0",           // 严格锁定18.2.0版本
    "typescript": "~5.0.0",      // 允许5.0.x（只更新最后一位）
    "webpack": "^4.46.0",        // 允许4.x.x（不更新大版本）
    "vue": "*"                   // 任意版本（危险！）
  }
}
```

# 项目配置

## 项目的icon

将图标文件放置在public中

## 项目的标题

在public/index.html中修改 <title>值

## 项目的别名（通常@）

方便后续对深层目录的调用

### 方法一：使用eject暴露

### 方法二（推荐）：craco（creat-react-app config）

在终端上输入：npm install @craco/craco@alpha -D（支持react版本到5.多）

后续操作：

1、创建craco.config.js，并且进行配置

```javascript
const path = require('path')

const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src')
    }
  }
}
```

2、在`tsconfig.json`配置：

```json
"baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
```

3 、在package.json的"scripts"配置成

```json
"scripts": {
    "start": "carco start",
    "build": "carco build",
    "test": "carco test",
    "eject": "react-scripts eject"
  },
```

# 配置代码规范

## .editorconfig（用于统一代码风格的配置文件，它可以确保不同的开发者和编辑器在同一个项目中保持一致的代码格式）

在根目录创建 .editorconfig文件（会有对应图标）

```
# http://editorconfig.org

root = true

[*] # 表示所有⽂件适⽤
charset = utf-8  # 设置⽂件字符集为 utf-8
indent_style = space # 缩进⻛格（tab | space）
indent_size = 2 # 缩进⼤⼩
end_of_line = lf # 控制换⾏类型(lf | cr | crlf)
 trim_trailing_whitespace = true # 去除⾏尾的任意空⽩字符
insert_final_newline = true # 始终在⽂件末尾插⼊⼀个新⾏

[*.md] # 表示仅 md ⽂件适⽤以下规则
max_line_length = off
trim_trailing_whitespace = false
```

#

# 集成prettier对代码格式化

1、安装prettier

```
npm install prettier -D
```

2、在根目录创建.prettierrc文件（配置好后对想要格式化的文件点击保存便可以格式化）

进行规范配置：

```
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
```

含义：

useTabs：使⽤tab缩进还是空格缩进，选择false；
tabWidth：tab是空格的情况下，是⼏个空格，选择2个；
printWidth：当⾏字符的⻓度，推荐80，也有⼈喜欢100或者120；
singleQuote：使⽤单引号还是双引号，选择true，使⽤单引号；
trailingComma：在多⾏输⼊的尾逗号是否添加，
none ，⽐如对象类型的最后⼀个属性后
⾯是否加⼀个，；
semi：语句末尾是否要加分号，默认值true，选择false表示不加

3、在package .json的”scripts“中写入命令（方便格式化全部文件）

```
prettier": "prettier --write ."
```

4、创建格式化的忽略文件（避免对node \_\_modules众多文件进行格式化浪费资源）

```
/build/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

5、执行（可以格式化除了忽略文件指定之外的全部文件了）：

```
npm run prettier
```

## 配置ESLint检测

- ​**统一代码风格**​：确保团队成员的代码风格一致（如缩进、引号、分号等）。
- ​**避免低级错误**​：检测未使用的变量、未定义的变量、拼写错误等。
- ​**React 特定规则**​：检查 `React`特有的问题，比如：
  - 缺少 `key`属性（`react/jsx-key`）
  - 不安全的 `props`传递（`react/no-unsafe`）
  - 错误的 `Hooks`使用（`react-hooks/rules-of-hooks`）

1、安装插件：（vue在创建项⽬时，如果选择prettier，那么这两个插件会⾃动安装）

```
npm install eslint -D
```

2、使用eslint中的自带的工具进行初始化

```
npx eslint --init
```

2、或者自己手动配置（我使用的就是这种，因为最新的eslint自带创建工具生成的为mjs文件。为了跟随教程进度。所以在根目录新建.eslintrc.js，输入以下指令）

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'，
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // 你的规则配置
  },
  overrides: [
    // 覆盖规则配置
  ]
}
```

3、添加规则在eslintrc.js中的rules中（解决craco.config.js的报错）

```
rules: {
    '@typescript-eslint/no-var-requires': 'off' // 你的规则配置
  },
```

4、将eslint与pretter进行一个绑定，解决他们的冲突问题，每次格式与pretter不一致都报错

安装插件：（vue在创建项⽬时，如果选择prettier，那么这两个插件会⾃动安装）

```
npm install eslint-plugin-prettier eslint-config-prettier -D
```

在.eslintrc.js中的extends中添加

```
'pluin:prettier/recommended'
```

# 目录结构的划分

## **src/ - 源代码根目录**​

### ​**1. assets/ - 静态资源文件夹**​

```
assets/
├── css/     # 样式文件
├── data/    # 静态数据文件
└── img/     # 图片资源
```

​**存放内容**​：

- ​**css/​**: 全局样式、主题变量、重置样式表
- ​**data/​**: 模拟数据、配置JSON、常量定义
- ​**img/​**: 图标、背景图、Logo等图像资源

### ​**2. base-ui/ - 基础UI组件库**​

​**业务作用**​：

- 存放最基础的、可复用的UI组件
- 如：Button、Input、Modal、Loading等原子组件
- 这些组件不应该包含业务逻辑

### ​**3. components/ - 业务通用组件**​

​**业务作用**​：

- 由基础UI组件组合而成的业务组件
- 如：UserCard、ProductList、SearchBar等
- 包含一定的业务逻辑但可在多个页面复用

### ​**4. hooks/ - 自定义React Hooks**​

​**业务作用**​：

- 封装可复用的逻辑代码
- 如：useAuth（认证）、useApi（接口调用）、useLocalStorage等
- 遵循"关注点分离"原则

### ​**5. router/ - 路由配置**​

​**业务作用**​：

- 定义页面路由和导航逻辑
- 配置路由守卫、懒加载、权限控制
- 管理整个应用的路由结构

### ​**6. service/ - 业务服务层**​

​**业务作用**​：

- 封装所有API接口调用
- 处理数据格式转换、错误处理
- 如：userService、productService、orderService等

### ​**7. store/ - 状态管理**​

​**业务作用**​：

- 使用Redux/Zustand等状态管理库
- 存放全局状态和业务逻辑
- 如：用户信息、主题设置、购物车状态等

### ​**8. utils/ - 工具函数库**​

​**业务作用**​：

- 存放纯函数工具类
- 如：日期格式化、数据验证、加密解密等
- 不依赖React，可在任何地方使用

### ​**9. views/ - 页面视图层**​

​**业务作用**​：

- 存放完整的页面组件
- 如：HomePage、UserProfile、ProductDetail等
- 组合多个components，形成完整页面

# 重置css标准化不同浏览器的默认样式

## 终端输入

```
npm install normalize.css
```

## 在index.tsx中引入

```
import 'normalize.css'
```

# 项目自定义，处理**业务层面**的样式统一

## 在assets/css/中创建reset.less

配置：

```less
body,
html,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
li,
dl,
dt,
dd,
header,
menu,
section,
p,
input,
td,
th,
ins {
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
  color: #333;
}

img {
  vertical-align: top;
}

ul,
li {
  list-style: none;
}

button {
  outline: none;
}
```

## 但是不会生效，还需要安装carco声明插件

```
npm install craco-less@2.1.0-alpha.0
```

## 回到之前便有的craco.confit.js中进行配置

```
const path = require('path')
const CracolessPlugin = require('craco-less')//新增

const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = {
  plugins: [{ plugin: CracolessPlugin }],//新增
  webpack: {
    alias: {
      '@': resolve('src')
    }
  }
}
```

```
reset.less → common.less → index.less → 项目组件
    ↓           ↓              ↓
  基础样式    通用工具       统一出口    业务使用
```

## 在assets/css/中创建index.less

```less
@import './common.less';
@import './reset.less';
```

## 在assets/css/中创建common.less

```less
body {
  font-size: 14px;
}
```

| 文件          | 职责               | 修改频率               |
| ------------- | ------------------ | ---------------------- |
| `reset.less`  | ​**浏览器兼容**​   | 很低（项目初期设定）   |
| `common.less` | ​**项目通用样式**​ | 中等（随项目发展调整） |
| `index.less`  | ​**文件组织**​     | 频繁（添加新组件时）   |

```
CSS/
├── common.less     # 项目通用样式（真正的项目设置）
├── index.less      # 样式入口文件（项目配置）
└── reset.less      # 浏览器重置层（基础标准化）
```

#

# 路由配置

## 下载配置路由

```
npm install react-router-dom
```

## 在router文件夹内操作

新建idnex.ts方便导出routers

在App中import routers和uesRouters这个方法

```ts
import React from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'

function App() {
  return <div className="App">{useRoutes(routes)}</div>
}

export default App
```

创建并在router的index.tsx中

```ts
//用于类型声明
import { RouteObject } from 'react-router-dom'

const routes: RouteObject[] = [
  {
    path: '/discover',
    element: ''
  }
]

export default routes
```

接着就可以在views文件夹中创建对应组件的视图了

如先创建discover后创建index.tsx导出Discover，然后再在router的index.ts 中导入Discover

```tsx
//引入用于tsx中用到的jsx
import React from 'react'

const Discover = () => {
  return <div>discover</div>
}

export default Discover
```

回到router的index.tsx中

```tsx
//导入react声明jsx
import React from 'react'
//用于类型声明
import { RouteObject } from 'react-router-dom'
import Discover from '@/views/discover'
const routes: RouteObject[] = [
  {
    path: '/discover',
    element: <Discover />
  }
]

export default routes
```

## 创建代码片段：

写一段复用率高的代码：

```tsx
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
```

去到片段生成器的：https://snippet-generator.app/
并且将需要改动的地方换名字如：Template可以换成${1:home}

```tsx
//模板

import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const ${1:home}: FC<IProps> = () => {
  return <div>${1:home}</div>
}

export default memo(${1:home})
```

设置名字和速写（tsreact）

然后等待生成后copy

```
"react typescript": {
  "prefix": "tsreact",
  "body": [
    "//模板",
    "",
    "import React, { memo } from 'react'",
    "import type { FC, ReactNode } from 'react'",
    "",
    "interface IProps {",
    "  children?: ReactNode",
    "}",
    "",
    "const ${1:home}: FC<IProps> = () => {",
    "  return <div>${1:home}</div>",
    "}",
    "",
    "export default memo(${1:home})",
    ""
  ],
  "description": "react typescript"
}
```

去到首选项> 配置代码片段>tsx中复制即可

然后只要在代码区打入tsreact就可以快速生成模板代码

## 使用该方法对view

![](file://D:\markdowm\markdowmphoto\2025-10-19-16-43-02-image.png?msec=1762179590540)

在router的index中配置

```ts
//导入react声明jsx
import React from 'react'
//用于类型声明
import { RouteObject } from 'react-router-dom'
import Discover from '@/views/discover'
import Mine from '@/views/mine'
import Focus from '@/views/focus'
import Download from '@/views/download'

const routes: RouteObject[] = [
  {
    path: '/discover',
    element: <Discover />
  },
  {
    path: '/mine',
    element: <Mine />
  },
  {
    path: '/focus',
    element: <Focus />
  },
  {
    path: '/download',
    element: <Download />
  }
]

export default routes
```

在App的index.ts中设置导航栏

```ts
import React from 'react'
import { Link, useRoutes } from 'react-router-dom'
import routes from './router'

function App() {
  return (
    <div className="App">
      <div className="nav">
        <Link to="/discover">发现音乐</Link>
        <Link to="/mine">我的音乐</Link>
        <Link to="/focus">我的关注</Link>
        <Link to="/download">下载客户端</Link>
      </div>
      <div className="main">{useRoutes(routes)}</div>
    </div>
  )
}

export default App
```

# 分包：

是 React 应用性能优化的核心技术，它能将代码拆分成多个按需加载的包（chunks），显著提升应用加载速度和运行时性能。

## 懒加载

导入{lazy} from react

```tsx
// import Discover from '@/views/discover'
// import Mine from '@/views/mine'
// import Focus from '@/views/focus'
// import Download from '@/views/download'

const Discover = lazy(() => import('@/views/discover'))
const Mine = lazy(() => import('@/views/mine'))
const Focus = lazy(() => import('@/views/focus'))
const Download = lazy(() => import('@/views/download'))
```

在懒加载未能加载出来的时候加上<Suspense> 包裹。Suspense 是 React 提供的**异步加载边界处理机制**，它让组件可以"等待"某些操作完成后再渲染。

在App.js中导入{ Suspense },在对应位置配置号内容（fallback）

```tsx
import React, { Suspense } from 'react'
import { Link, useRoutes } from 'react-router-dom'
import routes from './router'

function App() {
  return (
    <div className="App">
      <div className="nav">
        <Link to="/discover">发现音乐</Link>
        <Link to="/mine">我的音乐</Link>
        <Link to="/focus">我的关注</Link>
        <Link to="/download">下载客户端</Link>
      </div>
      <Suspense fallback="loading......">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
    </div>
  )
}

export default App
```

# 为”发现“配置二级路由

在discover文件夹内创建c-views文件夹存放子组件

为每一个配置好index

在routes的index中的discover添加上子组件，必要时做好懒加载

```tsx
 children: [
      {
        path: '/discover',
        element: <Navigate to="/discover/recommend"/>
      },
      {
        path: '/discover/recommend',
        element: <Recommend />
      },
      {
        path: '/discover/ranking',
        element: <Ranking />
      },
      {
        path: '/discover/songs',
        element: <Songs />
      },
      {
        path: '/discover/djradio',
        element: <Djradio />
      },
      {
        path: '/discover/artist',
        element: <Artist />
      },
      {
        path: '/discover/album',
        element: <Album />
      }
    ]<Album />
      }
    ]
```

回到discover的index中添加Outlay

```tsx
const Discover: FC<IProps> = () => {
  return (
    <div>
      <div>导航栏</div>
      <Outlet />
    </div>
  )
}
```

# 集成redux

```
npm install @reduxjs/toolkit react-redux
```

在store之下创建index，编辑模板

```tsx
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {}
})

export default store
```

在总index中使用Provide通告全局store

```tsx
import { Provider } from 'react-redux'
import store from './store'

root.render(
  //StrictMode:严格模式，但是该模式下有些组件会默认调用两次
  //所以不用<React.StrictMode>
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
)
```

要处理什么模块的内容就在store里面创建文件夹modules，存放模块的内容

为了方便在其他组件需要调用store情况下，调入useselector方法，这里要注意对应使用tsx编程的时候对state的类型说明的定义。

建议直接在store导出的时候一起将IRootstate导出

```tsx
// 写法 1（分两步）
type GetStateFnType = typeof store.getState;
export type IRootState = ReturnType<GetStateFnType>;

// 写法 2（合并一步）
export type IRootState = ReturnType<typeof store.getState>;>
```

#### **步骤 1：获取 `getState`的类型签名**​

通过 `typeof`获取 `store.getState`​**方法的类型**​（不是调用它！）：

```
type GetStateFnType = typeof store.getState;
```

- ​**此时 `GetStateFnType`的类型类似是**​：

  `() => { counter: number; user: { name: string } }`

  （这是一个函数类型签名，描述“无参数，返回特定 state 对象”）

---

#### ​**步骤 3：提取返回值类型**​

用 `ReturnType`从函数类型签名中提取返回值类型：

```
type IRootState = ReturnType<GetStateFnType>;
```

- ​**此时 `IRootState`的类型是**​：

  `{ counter: number; user: { name: string } }`

  （这就是整个 Redux store 的 state 结构！）

## 更加方便：使用重TypedUseSelectorHook新定义useSelector（包括名字和类型）然后导出

```tsx
import { configureStore } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook } from 'react-redux'

const store = configureStore({
  reducer: {}
})

type GetStateFnType = typeof store.getState
type IRootState = ReturnType<GetStateFnType>
export const UseAppSelect: TypedUseSelectorHook<IRootState> = useSelector
export default store
```

- _`TypedUseSelectorHook<IRootState>`_：

  这是 `react-redux`提供的泛型类型，用于定义**绑定到特定 state 类型的 `useSelector`Hook**。

- ​`UseAppSelect`：

  导出一个自定义 Hook，它是原生 `useSelector`的类型安全版本，自动关联了 `IRootState`类型。

后续就可以直接使用uesAppSelect

# 也将usedisppatch进行封装做成自己的（可选）

```tsx
type DispatchType = typeof store.dispatch

export const useAppDispatch: () => DispatchType = useDispatch
```

1. 定义 `DispatchType`为你的 store 的 dispatch 方法的类型

2. 创建一个名为 `useAppDispatch`的 Hook，它实际上是 `useDispatch`的别名，但带有正确的类型信息

# 网络请求封装axios

## 安装axios

```
npm install axios
```

## 二次封装

在根目录service文件夹

# 创建：config文件夹、request文件夹、index.ts

## 在config文件夹下创建index.ts

```ts
// /service/config/index.ts

// 1. 定义基础请求地址
export const BASE_URL = 'http://condercba.com:9002'

// 2. 定义请求超时时间
export const TIME_OUT = 10000
```

1. `BASE_URL = 'http://condercba.com:9002'`\*

- ​**作用：​**​ 这是你项目中所有 API 请求的**根地址**或**基础路径**。
- ​**为什么重要：​**​
  - ​**统一管理：​**​ 项目中所有请求都会自动拼接这个地址。如果服务器地址变了（比如从测试环境切到生产环境），你**只需要修改这一个地方**，所有请求都会自动更新到新地址。
  - ​**避免重复：​**​ 写具体 API 请求时，你只需要写相对路径（比如 `/api/user/login`），不用每次都写完整的 `http://condercba.com:9002/api/user/login`。

- ​**类比：​**​ 想象你要给一个朋友寄信。`BASE_URL`就是你朋友家的**街道地址**​（比如 "北京市海淀区中关村大街1号"）。所有寄给这个朋友的信，都要先送到这个地址。

2. ​`TIME_OUT = 10000`

- ​**作用：​**​ 设置网络请求的**最长等待时间**，单位是**毫秒（ms）​**。这里设置的是 10 秒（10000 ms）。
- ​**为什么重要：​**​
  - ​**用户体验：​**​ 如果网络状况不好或者服务器没有响应，请求不会一直卡住。等待超过 10 秒后，请求会被自动取消，并抛出超时错误。这样前端可以给用户一个提示（比如“网络连接超时，请重试”），而不是让用户干等。
  - ​**资源管理：​**​ 防止长时间挂起的请求占用浏览器资源。

- ​**类比：​**​ 继续寄信的比喻。`TIME_OUT`就像你设定的**等待回信的最长时间**。比如你寄出信后说：“如果一个月内没收到回信，我就认为信丢了，会再寄一封或者打电话问问”。10 秒就是这个“等待期限”。

### 这个文件在整个结构中的位置

- ​**地基角色：​**​ 这个文件 (`/service/config/index.ts`) 就像盖房子的**地基**。它提供了最基础、最关键的配置信息。
- ​**被引用：​**​ 你接下来会看到的**核心请求文件**​ (`/service/request/index.ts`) 会**导入 (`import`)​**​ 这里定义的 `BASE_URL`和 `TIME_OUT`。核心请求文件会用它们来配置 `axios`实例。

## 在request文件夹下创建index.ts文件

其作用为用 TypeScript 定义了**请求配置和拦截器的“类型规则”​**。这就像给网络请求模块制定了“法律条文”，确保代码的规范性。我们逐行拆解：

```ts
import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 针对AxiosRequestConfig配置进行扩展
export interface YSInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

export interface YSRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YSInterceptors<T>
}
```

**作用：​**​ 引入 axios 库自带的类型定义。

- `AxiosRequestConfig`：axios ​**请求配置**对象的类型（比如 `url`, `method`, `headers`等属性）。
- `AxiosResponse`：<mark>axios ​**响应对象**的类型</mark>（包含 `data`, `status`, `headers`等属性）。

**`import type`？​**​告诉 TypeScript 编译器：“我只导入类型信息，不要导入实际的 JavaScript 代码”。这有助于优化最终打包体积。

定义一个叫 `YSInterceptors`的接口，用来描述**拦截器**的结构。

**泛型 `<T = AxiosResponse>`：​**​ 这是 TypeScript 的**泛型**。`T`是一个占位符类型，默认值是 `AxiosResponse`（标准的 axios 响应类型）。这意味着：

- 默认情况下，`responseSuccessFn`接收和返回的都是标准的<mark> axios 响应对象 (`AxiosResponse`)。</mark>
- 但你可以指定 `T`为其他类型（比如你项目中定义的统一响应结构 `{ code: number, data: any, message: string }`），让 `responseSuccessFn`处理你自定义的响应结构。

**四个拦截器函数 (都是可选的 `?`):​**​

- `requestSuccessFn(config: AxiosRequestConfig) => AxiosRequestConfig`
  - ​**作用：​**​ 在请求**真正发送出去之前**，对请求配置 (`config`) 进行**修改或增强**​（比如添加 token 到 header）。
  - ​**参数：​**​ 当前的请求配置对象。
  - ​**返回值：​**​ 必须返回修改后的（或原始的）请求配置对象。
  - 具体解释：

    ```
    requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
    ```

    这里的结构是 TypeScript 的函数类型定义语法，表示：
    1. `(config: AxiosRequestConfig)`- 函数的参数部分，接受一个类型为 `AxiosRequestConfig`的参数 `config`
    2. `=> AxiosRequestConfig`- 表示这个函数应该返回一个 `AxiosRequestConfig`类型的值

    这整个表达式定义了一个可选的可调用属性 `requestSuccessFn`，它是一个函数类型，接受 `AxiosRequestConfig`并返回 `AxiosRequestConfig`。

- `requestFailureFn(err: any) => any`
  - ​**作用：​**​ 当请求**发送失败时**​（比如网络错误、配置错误）被调用，处理错误。
  - ​**参数：​**​ 捕获到的错误对象。
  - ​**返回值：​**​ 通常返回一个被拒绝的 Promise (`Promise.reject(error)`) 将错误传递下去，或者进行特定处理。

- `responseSuccessFn(res: T) => T`
  - ​**作用：​**​ 在接收到**成功的服务器响应后**，但在你的业务代码拿到响应数据**之前**，对响应数据 (`res`) 进行**统一处理**​（比如只提取你关心的 `res.data`字段，或者根据状态码做全局提示）。
  - ​**参数：​**​ 服务器返回的响应对象（类型是泛型 `T`，默认是 `AxiosResponse`）。
  - ​**返回值：​**​ 处理后的响应对象（类型也是 `T`）。这个返回值最终会传递给你的业务代码中的 `.then()`。

- `responseFailureFn(err: any) => any`
  - ​**作用：​**​ 当响应**失败时**​（比如 HTTP 状态码不是 2xx，或者 `responseSuccessFn`里抛错）被调用，进行**统一的错误处理**​（比如根据状态码弹出不同的错误提示）。
  - ​**参数：​**​ 捕获到的错误对象。
  - ​**返回值：​**​ 通常返回一个被拒绝的 Promise (`Promise.reject(error)`) 将错误传递给你的业务代码中的 `.catch()`。

对于：

```ts
// 3. 扩展 axios 的请求配置接口 (YSRequestConfig)
export interface YSRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: YSInterceptors<T>
}
```

- **作用：​**​ 创建一个新的接口 `YSRequestConfig`，它**继承（`extends`）​**​ 了 axios 原生的 `AxiosRequestConfig`接口的所有属性。
- ​**新增属性：​**​
  - `interceptors?: YSInterceptors<T>`：添加了一个**可选**的属性 `interceptors`。它的类型就是我们上面定义的 `YSInterceptors<T>`。

- ​**意义：​**​
  - 现在，当你使用 `axios.create()`或 `axios.request()`等方法时，传入的配置对象可以是 `YSRequestConfig`类型。
  - 这意味着你可以在**每个单独的请求配置**里，​**自定义**该请求专属的拦截器！这是对 axios 原生功能的强大扩展。
  - 同样使用了泛型 `<T = AxiosResponse>`，与 `YSInterceptors`保持一致，确保传递给拦截器的响应类型一致。

### 🧩 这个文件在整个结构中的位置

### 核心问题：为什么需要 `YSRequestConfig`，而不直接用 `YSInterceptors`？

1. ​`YSInterceptors`是“零件”说明书：​

- `YSInterceptors`只定义了**拦截器相关**的功能（四个可选函数）。它就像一个**单独的零件包说明书**，告诉你如何安装和使用“拦截器”这个零件。
- 它**不包含**其他任何与网络请求配置相关的内容（比如 `url`, `method`, `headers`, `params`, `data`等等）。

2. ​`AxiosRequestConfig`是“基础设备”说明书：​​

- `AxiosRequestConfig`是 axios 库**自带**的类型，它定义了**所有 axios 原生支持的配置项**​（`baseURL`, `timeout`, `url`, `method`, `headers`, `params`, `data`, `responseType`等等）。它就像**基础网络请求设备的完整说明书**。

3. ​`YSRequestConfig`是“升级版设备”说明书：​​

- 我们的目标不是**替换**基础设备，而是在**基础设备上增加一个新功能（拦截器零件）​**。
- `export interface YSRequestConfig<T = AxiosResponse> extends AxiosRequestConfig { ... }`的作用就是：
  - ​**`extends AxiosRequestConfig`：​**​ ​**继承**所有基础设备说明书 (`AxiosRequestConfig`) 里的内容。这意味着 `YSRequestConfig`​\*\*自动拥有 `url`, `method`, `headers`等所有原生配置项的定义。
  - ​**`{ interceptors?: YSInterceptors<T> }`：​**​ 在继承的基础上，​**新增**一个可选的 `interceptors`属性。这个属性的类型就是我们定义的“零件包说明书” `YSInterceptors<T>`。

- 结果：`YSRequestConfig`变成了一个**升级版的说明书**，它包含了**所有原生配置项 + 我们新增的 `interceptors`配置项**。

# 在request创建index.ts文件（重点）

完整代码：

```ts
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { YSRequestConfig } from './type'

class YSRequest {
  instance: AxiosInstance
  constructor(config: YSRequestConfig) {
    this.instance = axios.create(config)

    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res
      },
      (err) => {
        return err
      }
    )
    // 针对特定的hyRequest实例添加拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )

    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }
  request<T = any>(config: YSRequestConfig<T>) {
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }

    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次响应的成功拦截处理
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get<T = any>(config: YSRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: YSRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T = any>(config: YSRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: YSRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default YSRequest
```

### 第一部分：创建类与构造函数 (`constructor`)

```ts
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { YSRequestConfig } from './type' // 导入我们定义的“大一统”配置类型

class YSRequest {
  // 1. 核心：存储 axios 实例
  instance: AxiosInstance

  // 2. 构造函数：接收一个“大一统”配置对象 (YSRequestConfig)
  constructor(config: YSRequestConfig) {
    // 3. 使用传入的配置创建 AXIOS 实例 (最核心的一步！)
    this.instance = axios.create(config)
```

- ​`instance: AxiosInstance`：​​
  - 这是类的核心属性，用来存储我们创建的 ​**axios 实例**。
  - 所有请求最终都会通过这个 `instance`发出去。

- ​`constructor(config: YSRequestConfig)`：​​该类的构造函数
  - 构造函数，在创建 `new YSRequest(...)`时自动调用。
  - 它接收一个参数 `config`，类型是我们精心设计的 `YSRequestConfig`（包含原生配置 + 自定义拦截器）。

- ​`this.instance = axios.create(config)`：​​
  - ​`axios.create(config)`是 axios 库的关键方法！​​
  - ​**作用：​**​ 根据传入的 `config`（基础 URL、超时时间等）​**创建一个独立的、全新的 axios 实例**。
  - ​**为什么重要？​**​ 这样创建出来的实例拥有独立的配置和拦截器，不会影响全局的 `axios`对象。非常适合封装成项目专属的请求库。

### 第二部分：设置拦截器（核心逻辑！）

构造函数里接下来的代码是设置拦截器，这是最精妙的部分：

```ts
// 4. 为这个实例添加 GLOBAL 请求拦截器 (所有请求都经过这里)
    this.instance.interceptors.request.use(
      (config) => {
        // 👉 全局请求成功拦截器
        // 这里可以写所有请求共享的逻辑，比如添加 token
        // console.log('全局请求拦截器 - 成功')
        return config // 必须返回 config
      },
      (err) => {
        // 👉 全局请求失败拦截器
        // console.log('全局请求拦截器 - 失败', err)
        return Promise.reject(err) // 通常返回拒绝的 Promise
      }
    )

    // 5. 为这个实例添加 GLOBAL 响应拦截器 (所有响应都经过这里)
    this.instance.interceptors.response.use(
      (res) => {
        // 👉 全局响应成功拦截器
        // console.log('全局响应拦截器 - 成功')
        // 这里可以处理全局响应格式，比如只返回 res.data
        return res // 或者 return res.data
      },
      (err) => {
        // 👉 全局响应失败拦截器
        // console.log('全局响应拦截器 - 失败', err)
        // 这里可以统一处理错误，比如根据状态码跳转登录页
        return Promise.reject(err) // 通常返回拒绝的 Promise
      }
    )

    // 6. 🔥 关键：针对这个 SPECIFIC 实例添加请求级拦截器 (来自 config.interceptors)
    // 注意：这里是添加到实例的拦截器链上，不是覆盖！
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn, // 使用传入的请求成功拦截器
      config.interceptors?.requestFailureFn  // 使用传入的请求失败拦截器
    )

    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn, // 使用传入的响应成功拦截器
      config.interceptors?.responseFailureFn   // 使用传入的响应失败拦截器
    )
  }
```

- ​**第 4 & 5 步：全局拦截器 (`this.instance.interceptors.request/response.use`)​**​
  - 这是为**整个 `YSRequest`实例**设置的拦截器。
  - 所有通过 `this.instance`发出的请求都会经过这些拦截器。
  - 这里通常放置**项目通用的逻辑**，比如：
    - ​**请求前：​**​ 自动添加 JWT Token 到 Header。
    - ​**响应后：​**​ 统一处理业务错误码、只返回 `res.data`字段。
    - ​**错误处理：​**​ 统一弹窗提示、处理 401 跳转登录等。

- ​**第 6 步：请求级拦截器 (`config.interceptors?.xxx`)​**​
  - ​**这是最精妙的设计！​**​ 它利用了 axios 拦截器可以**多次调用 `.use`添加多个拦截器**的特性。
  - 在前面类的构造器就为实例对象准备好了一套拦截器了，但是当实例在创建的时候还自定义了属于自己规则的拦截器的话，这里提到的 `config.interceptors?.requestSuccessFn`中的 `?.`是 TypeScript/JavaScript 的 ​**可选链操作符**，它**安全地访问可能为 `undefined`或 `null`的嵌套属性**。就会进行操作。
  - 它把创建 `YSRequest`实例时传入的 `config.interceptors`里的函数（如果提供了的话），​**添加到这个实例的拦截器链中**。
  - ​**执行顺序：​**​
    - ​**请求拦截器：​**​ `全局请求拦截器`→ `请求级请求拦截器 (config.interceptors.requestSuccessFn)`
    - ​**响应拦截器：​**​ `请求级响应拦截器 (config.interceptors.responseSuccessFn)`→ `全局响应拦截器`

- ​**意义：​**​ 这允许在**创建请求实例时**，就为**这个实例发出的所有请求**添加一些**特定的拦截逻辑**​（区别于全局的，也区别于单个请求的）。不过，在更常见的封装中，单个请求的拦截器通常在 `request`方法里处理（下一步会看到）。

### 第三部分：核心 `request`方法 (支持请求级拦截器)

这个 `request`方法是 `YSRequest`类的 ​**核心底层方法**，其他快捷方法（如 `get/post`）都是基于它封装的。它的核心价值是：

​**为每个网络请求提供「精细化控制」的能力**，尤其是在需要 ​**动态调整单个请求行为**​ 时。

```ts
// 7. 核心请求方法 (支持泛型 T 指定响应数据类型)
  request<T = any>(config: YSRequestConfig<T>): Promise<T> {
    // 8. 🔥 关键：执行请求级 REQUEST 拦截器 (在请求真正发出前)
    if (config.interceptors?.requestSuccessFn) {
      // 调用传入的请求成功拦截器，并更新 config
      config = config.interceptors.requestSuccessFn(config)
    }

    // 9. 返回一个 Promise，便于调用者使用 async/await 或 .then/.catch
    return new Promise<T>((resolve, reject) => {
      // 10. 使用之前创建的 axios 实例 (this.instance) 发起请求
      this.instance
        .request<any, T>(config) // 注意泛型：请求配置是 any，期望响应类型是 T
        .then((res: T) => { // 响应类型是 T
          // 11. 🔥 关键：执行请求级 RESPONSE 拦截器 (在拿到响应后)
          if (config.interceptors?.responseSuccessFn) {
            // 调用传入的响应成功拦截器处理响应
            res = config.interceptors.responseSuccessFn(res)
          }
          // 12. 将最终处理后的响应数据 (类型 T) 传递给 Promise 的 resolve
          resolve(res)
        })
        .catch((err: any) => {
          // 13. 如果请求失败，将错误传递给 Promise 的 reject
          reject(err)
        })
    })
  }
```

- ​`request<T = any>(config: YSRequestConfig<T>): Promise<T>`
  - 这是类的最核心方法！​**所有具体的 GET/POST 请求最终都调用它。​**​
  - ​**泛型 `<T>`：​**​ 允许调用者指定**期望的响应数据类型**。默认是 `any`。
  - ​**参数 `config: YSRequestConfig<T>`：​**​ 接收一个“大一统”配置对象，特别注意这里的泛型 `T`和方法的 `T`一致，保证了类型连贯性。
  - ​**返回值 `Promise<T>`：​**​ 返回一个 Promise，其 `resolve`的值类型就是 `T`。这样调用者可以 `const data = await request<MyDataType>(config)`获得强类型数据。

- ​**步骤 8：执行请求级请求拦截器 (`requestSuccessFn`)​**​
  - 在请求**即将发出前**，检查本次请求的 `config`是否提供了 `interceptors.requestSuccessFn`。
  - 如果提供了，​**立即执行它**，并将执行后的结果（修改后的 `config`）赋值回 `config`。这样后续请求使用的就是修改后的配置。
  - ​**时机：​**​ 这个执行发生在 ​**axios 实例的拦截器链执行之后**​（包括全局和实例级）。所以它是最“靠近”请求发出的拦截点。

- ​**步骤 9-13：Promise 封装与响应处理**​
  - 使用 `new Promise`封装是为了更精细地控制流程，特别是为了支持**请求级响应拦截器**。
  - ​`this.instance.request<any, T>(config)`：​
    - 调用底层 axios 实例的 `request`方法发起请求。
    - ​**泛型 `<any, T>`：​**​ 第一个 `any`表示请求配置的类型（通常是 `AxiosRequestConfig`，这里用 `any`简化），第二个 `T`表示**期望的响应数据类型**。这告诉 TypeScript，`.then(res)`里的 `res`应该是 `T`类型。

- ​**步骤 11：执行请求级响应拦截器 (`responseSuccessFn`)​**​
  - 在请求**成功返回后**​（进入 `.then`），检查本次请求的 `config`是否提供了 `interceptors.responseSuccessFn`。
  - 如果提供了，​**立即执行它**，将原始的 `res`（类型 `T`）传给它处理，并将处理后的结果赋值回 `res`。
  - ​**时机：​**​ 这个执行发生在 ​**axios 实例的响应拦截器链执行之后**​（包括实例级和全局）。所以它是最“靠近”业务代码拿到数据的处理点。

- ​步骤 12：`resolve(res)`
  - 将最终处理后的响应数据 `res`（类型 `T`）传递给 Promise 的 `resolve`。业务代码在 `await`或 `.then`中就会收到这个值。

- ​步骤 13：`reject(err)`
  - 如果请求失败（进入 `.catch`），直接将错误 `err`传递给 Promise 的 `reject`。业务代码在 `catch`或 `try/catch`中会捕获到这个错误。

### 第四部分：便捷方法 (GET, POST, DELETE, PATCH)

```ts
// 14. 封装便捷的 GET 方法
  get<T = any>(config: YSRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }

  // 15. 封装便捷的 POST 方法
  post<T = any>(config: YSRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }

  // 16. 封装便捷的 DELETE 方法
  delete<T = any>(config: YSRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }

  // 17. 封装便捷的 PATCH 方法
  patch<T = any>(config: YSRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

// 18. 导出 YSRequest 类
export default YSRequest
```

- 这些方法 (`get`, `post`, `delete`, `patch`) 是语法糖，让调用更简洁。
- 它们都接收一个 `YSRequestConfig<T>`配置对象。
- 内部调用核心的 `this.request`方法，并**将传入的 `config`和对应的 `method`合并**成一个新的配置对象。
- 同样支持泛型 `<T>`指定响应数据类型。

# 在service的文件下面创建index.ts文件

网络请求模块的**统一出口文件**，也是我们封装成果的最终体现。这个文件虽然简洁，但非常重要，因为它把前面所有模块整合起来，创建了一个可以直接在项目中使用的请求实例

```ts
// /service/index.ts

// 1. 导入基础配置
import { BASE_URL, TIME_OUT } from './config'

// 2. 导入封装好的请求类
import YSRequest from './request'

// 3. 创建 YSRequest 实例
const ysRequest = new YSRequest({
  baseURL: BASE_URL, // 使用基础 URL
  timeout: TIME_OUT, // 使用超时时间
  // 4. (可选) 添加实例级拦截器
  interceptors: {
    requestSuccessFn: (config) => {
      // 可以在这里写该实例所有请求共享的逻辑
      // 比如：统一添加 token
      // const token = localStorage.getItem('token')
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`
      // }
      return config
    }
    // 还可以添加 requestFailureFn, responseSuccessFn, responseFailureFn
  }
})

// 5. 导出实例
export default ysRequest
```

1. **导入基础配置**​：

```
import { BASE_URL, TIME_OUT } from './config'
```

- 从我们第一个文件 (`./config/index.ts`) 导入基础配置
- `BASE_URL`：所有请求的基础路径
- `TIME_OUT`：请求超时时间（毫秒）

2. ​**导入封装好的请求类**​：

```
import YSRequest from './request'
```

- 导入我们精心封装的 `YSRequest`类（来自 `./request/index.ts`）
- 这个类包含了所有请求逻辑和拦截器处理

3. ​**创建请求实例**​：

```
const ysRequest = new YSRequest({ ... })
```

- 使用 `new`关键字创建 `YSRequest`的实例
- 这个实例将会是我们项目中所有网络请求的入口

4. ​**配置实例参数**​：

```
{
 baseURL: BASE_URL,    // 所有请求的基础路径
 timeout: TIME_OUT,    // 请求超时时间
 interceptors: { ... }  // (可选) 实例级拦截器
}
```

- `baseURL`：设置请求的基础路径（来自 `config`）
- `timeout`：设置请求超时时间（来自 `config`）
- `interceptors`：添加**实例级拦截器**​（该实例的所有请求共享）

5. ​**实例级拦截器**​：

```
interceptors: {
 requestSuccessFn: (config) => {
   return config
 }
}
```

- `interceptors`对象作为 `config`参数传递给 `YSRequest`的构造函数
- 这里添加了一个 `requestSuccessFn`拦截器
- 这个拦截器会应用到**通过这个实例发起的所有请求**​
- 示例中是一个空实现，实际可以添加通用逻辑，比如：

  ```ts
  requestSuccessFn: (config) => {
    // 统一添加 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }
  ```

6. ​**导出实例**​：

```
export default ysRequest
```

- 将创建好的请求实例导出
- 这样项目中任何地方都可以导入并使用这个实例

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

![](file://D:\markdowm\markdowmphoto\2025-10-28-09-39-39-image.png?msec=1762179680270)

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

当前架构：![](file://D:\markdowm\markdowmphoto\2025-10-29-11-03-34-image.png?msec=1762179680270)

后续架构：![](file://D:\markdowm\markdowmphoto\2025-10-29-11-13-29-image.png?msec=1762179680270)

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

![](file://D:\markdowm\markdowmphoto\2025-10-29-21-54-58-image.png?msec=1762179680276)

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

![](file://D:\markdowm\markdowmphoto\2025-11-02-23-12-41-image.png?msec=1762179680276)

## 因为HotRecommend部分的头部可以复用，所以对齐进行封装（在根目录的 components中）

![](file://D:\markdowm\markdowmphoto\2025-11-02-23-13-14-image.png?msec=1762179680270)

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

![](file://D:\markdowm\markdowmphoto\2025-11-03-14-52-13-image.png?msec=1762179680270)

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

![](file://D:\markdowm\markdowmphoto\2025-11-03-16-14-37-image.png?msec=1762179680271)

在热门推荐同一位置创建文件夹编写逻辑
