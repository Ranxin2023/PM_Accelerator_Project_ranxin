import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext.jsx' 

import HomePage from "./pages/HomePage";
import Welcome from './pages/Welcome.jsx'
import Signup from './pages/Signup.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import SelectInputMethod from './pages/SelectInputMethod.jsx'
import Preferences from "./pages/Preferences";
import ResumeForm from './pages/ResumeForm.jsx';
import ManuallyFill from './pages/ResumeManual.jsx';
import Dashboard from './pages/Dashboard.jsx';
import GenerateAnswers from './pages/GenerateAnswers.jsx';
import ResumeScore from './pages/ResumeScore.jsx';
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
        <Route path="/preferences" element={<Preferences />} />    
        <Route path="/resume/form" element={<ResumeForm />} />
        <Route path="/manually-fill" element={<ManuallyFill />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auto-answer" element={<GenerateAnswers />} />
        <Route path="/resume-score" element={<ResumeScore />} />
      </Routes>
    </UserProvider>


    </BrowserRouter>
  </React.StrictMode>,
)