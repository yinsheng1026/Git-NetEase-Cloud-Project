import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'
import AppPlayerBar from './views/player/app-player-bar'

function App() {
  const element = useRoutes(routes)

  return (
    <div className="App">
      <AppHeader />
      <Suspense fallback="loading......">
        <div className="main">{element}</div>
      </Suspense>
      <AppFooter />

      <AppPlayerBar />
    </div>
  )
}

export default App
