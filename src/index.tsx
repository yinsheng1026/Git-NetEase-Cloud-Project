import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import 'normalize.css'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { ConfigProvider } from 'antd'
import './assets/css/index.less'

import App from '@/App'
import store from './store'
import theme from './assets/theme'

const container = document.getElementById('root')!
const root = createRoot(container)

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
