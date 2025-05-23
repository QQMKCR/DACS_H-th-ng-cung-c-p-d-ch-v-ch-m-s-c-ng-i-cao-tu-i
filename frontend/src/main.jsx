import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom";
import AdminContextProvider, { AdminContext } from './context/AdminContext.jsx';
import AppContextProvider from './context/AppContext.jsx';
import Caregiver from './Caregiver.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </AdminContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
