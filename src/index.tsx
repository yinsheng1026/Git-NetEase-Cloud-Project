import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import 'normalize.css'
import { Provider } from 'react-redux'

import './assets/css/index.less'

import App from '@/App'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  //StrictMode:严格模式，但是该模式下有些组件会默认调用两次
  //所以不用<React.StrictMode>
  // <Provider store={store}>
  <HashRouter>
    <App />
  </HashRouter>
  // </Provider>
)
