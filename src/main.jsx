import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Welcome from './pages/Welcome.jsx'
import Signup from './pages/Signup.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import SelectInputMethod from './pages/SelectInputMethod.jsx'
import HomePage from "./pages/HomePage";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />                    
        <Route path="/home" element={<HomePage />} />             
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/select-input-method" element={<SelectInputMethod />} />
      </Routes>


    </BrowserRouter>
  </React.StrictMode>,
)