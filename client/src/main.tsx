import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './index.css'

import MainPage from "./pages/main/mainPage.tsx"

// Importing contexts
import {AppContextProvider} from './contextProvider.tsx'
import { GameContextProvider } from './pages/gameContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <Routes>

            <Route path='/' element={<GameContextProvider><MainPage/></GameContextProvider>}></Route>

        </Routes>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
