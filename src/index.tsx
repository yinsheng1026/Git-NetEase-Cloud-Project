import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import 'normalize.css'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import './assets/css/index.less'

import App from '@/App'
import store from './store'
import theme from './assets/theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  //StrictMode:严格模式，但是该模式下有些组件会默认调用两次
  //所以不用<React.StrictMode>
  // <Provider store={store}>
  <ThemeProvider theme={theme}>
    <HashRouter>
      <App />
    </HashRouter>
  </ThemeProvider>
  // </Provider>
)
