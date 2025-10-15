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

# 目录结构的划分

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

# 重置css标准化不同浏览器的默认样式

## 终端输入

```
npm install normalize.css
```

## 在index.tsx中引入

```
import 'normalize.css'
```

# 项目自定义，处理**业务层面**的样式统一

## 在assets/css/中创建reset.less

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

## 但是不会生效，还需要安装carco声明插件

```
npm install craco-less@2.1.0-alpha.0
```

## 回到之前便有的craco.confit.js中进行配置

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

## 在assets/css/中创建index.less

```less
@import './common.less';
@import './reset.less';
```

## 在assets/css/中创建common.less

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
