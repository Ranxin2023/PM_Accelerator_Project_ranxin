import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext.jsx' 

import HomePage from "./pages/HomePage";
import Welcome from './pages/Welcome.jsx'
import Signup from './pages/Signup.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import SelectInputMethod from './pages/SelectInputMethod.jsx'
import ManuallyStep1 from './pages/ManuallyFill/step1.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <UserProvider>

      <Routes>
        <Route path="/" element={<Welcome />} />                    
        <Route path="/home" element={<HomePage />} />             
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/select-input-method" element={<SelectInputMethod />} />
        <Route path="/manually-fill-step1" element={<ManuallyStep1 />} />
      </Routes>
    </UserProvider>


    </BrowserRouter>
  </React.StrictMode>,
)