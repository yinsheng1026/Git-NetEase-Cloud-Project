import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import 'normalize.css'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { ConfigProvider } from 'antd'
import './assets/css/index.less'
import '@arco-design/web-react/dist/css/arco.css' // 引入 Arco 样式
import App from '@/App'
import store from './store'
import theme from './assets/theme'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ConfigProvider
        theme={{
          components: {
            Slider: {
              // 手柄颜色 - 设置为白色
              handleColor: '#ffffff',

              // 激活状态手柄颜色 - 也设置为白色
              handleActiveColor: '#8a0b0b',

              // 边框颜色 - 设置为红色
              handleLineWidth: 2, // 边框宽度2px
              handleLineWidthHover: 3 // 悬停时边框宽度2.5px

              // 如果需要设置边框颜色，可能需要结合其他属性
              // 或者通过CSS覆盖（见下方补充方案）
            }
          }
        }}
      >
        <HashRouter>
          <App />
        </HashRouter>
      </ConfigProvider>
    </ThemeProvider>
  </Provider>
)
